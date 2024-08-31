import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const imageHasUrl = newCabin.image.startsWith?.(supabaseUrl);
  let uploadedImageUrl = null;

  // 1. Upload photo if there is no URL in image name
  if (!imageHasUrl) {
    const imageName = `${Math.random()}-${newCabin.name}`.replaceAll("/", "");

    const { error: uploadingError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (uploadingError) {
      console.error(uploadingError);
      throw new Error("Cabin image could not be uploaded");
    }

    // A.2) Get Image URL+key (a key to access image)
    const { data, error: imageUrlError } = await supabase.storage
      .from("cabin-images")
      .createSignedUrl(imageName, 60 * 9999999999);

    if (imageUrlError) {
      console.error(imageUrlError);
      throw new Error("Error while creating URL to share photo");
    }
    uploadedImageUrl = data.signedUrl;
  }

  // 2) Create cabin row if there is no ID
  if (!id) {
    const { data: createdCabin, error: creatingError } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: uploadedImageUrl }])
      .select();

    if (creatingError) {
      console.error(creatingError);
      throw new Error("Cabin could not be created");
    }

    return createdCabin;
  }

  // 3) Update cabin if there is an ID
  if (id) {
    // 3.1) If there is a new image, delete old cabin image
    if (uploadedImageUrl) {
      // 3.1.1) Get old cabin's image name
      const {
        data: { image: oldImageName },
        error: oldImageNameError,
      } = await supabase.from("cabins").select("image").eq("id", id).single();

      if (oldImageNameError) {
        console.log("Old cabin image name could not be loaded");
        throw new Error("Old cabin image name could not be loaded");
      }

      // 3.1.2) Delete old cabin's image
      const imageName = oldImageName.split("?token=").at(0).split("/cabin-images/").at(1);
      const { error: deleteImageError } = await supabase.storage
        .from("cabin-images")
        .remove([imageName]);

      if (deleteImageError) {
        console.error(deleteImageError);
        throw new Error("Old cabin's image could not be deleted");
      }
    }

    // 3.2) Delete old cabin row
    const { data: updatedCabin, error: updatingError } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: uploadedImageUrl ? uploadedImageUrl : newCabin.image })
      .eq("id", id)
      .select()
      .single();

    if (updatingError) {
      console.error(updatingError);
      throw new Error("Cabin could not be edited");
    }

    return updatedCabin;
  }
}

export async function deleteCabin(id) {
  // 1. Delete cabin row
  const { data: deletedCabin, error: deletingCabinError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (deletingCabinError) {
    console.error(deletingCabinError);
    throw new Error("Cabin could not be deleted");
  }

  // 2. Delete cabin image
  const imageName = deletedCabin.image.split("?token=").at(0).split("/cabin-images/").at(1);
  console.log(imageName);
  const { error: deleteImageError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (deleteImageError) {
    console.error(deleteImageError);
    throw new Error("Cabin's image could not be deleted");
  }
}
