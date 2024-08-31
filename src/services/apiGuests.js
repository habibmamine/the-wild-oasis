import supabase from "./supabase";

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]).select().single();

  if (error) {
    console.log(error);
    throw new Error("New guest could not be created");
  }

  return data;
}
