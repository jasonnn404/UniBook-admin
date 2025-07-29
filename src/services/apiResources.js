import supabase, { supabaseUrl } from "./supabase";

export async function getResources() {
  const { data, error } = await supabase.from("resources").select("*");

  if (error) {
    console.error(error);
    throw new Error("Resources could not be loaded");
  }

  return data;
}

export async function createEditResource(newResource, id) {
  const hasImagePath = newResource.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newResource.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newResource.image
    : `${supabaseUrl}/storage/v1/object/public/resource-images/${imageName}`;

  // 1. Create/edit resource
  let query = supabase.from("resources");

  // A) CREATE
  if (!id) query = query.insert([{ ...newResource, image: imagePath }]);

  // B) EDIT
  if (id)
    query = query.update({ ...newResource, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Resource could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("resource-images")
    .upload(imageName, newResource.image);

  // 3. Delete the resource IF there was an error uploading image
  if (storageError) {
    await supabase.from("resources").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Resource image could not be uploaded and the resource was not created"
    );
  }

  return data;
}

export async function deleteResource(id) {
  const { data, error } = await supabase
    .from("resources")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Resource could not be deleted");
  }

  return data;
}
