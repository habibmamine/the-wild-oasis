import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload avatar
  const imageName = `avatar-${data.user.id}`;
  const { error: storageError } = await supabase.storage.from("avatars").upload(imageName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Get avatar URL+key (a key to access image)
  const { data: imageUrl, error: imageUrlError } = await supabase.storage
    .from("avatars")
    .createSignedUrl(imageName, 60 * 9999999999);

  if (imageUrlError) throw new Error(imageUrlError.message);

  // 4. Delete old avatar
  const oldImageName = data.user.user_metadata.avatar;

  const avatarName = oldImageName.split("?token=").at(0).split("/avatars/").at(1);
  const { error: deleteImageError } = await supabase.storage.from("avatars").remove([avatarName]);

  if (deleteImageError) throw new Error(deleteImageError);

  // 5. Update avatar in the user
  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: { avatar: imageUrl.signedUrl },
  });

  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
