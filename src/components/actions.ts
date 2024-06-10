"use server";

import { SearchResult } from "@/app/gallery/page";
import cloudinary from "cloudinary";

// ... outras funções

export async function addImageToAlbum(image: SearchResult, album: string) {
  await cloudinary.v2.api.create_folder(encodeURIComponent(album)); // Codificar o nome do álbum 

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(
    image.public_id,
    `${encodeURIComponent(album)}/${publicId}` // Codificar o nome do álbum
  );
}

export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error);
    throw new Error("Falha ao deletar a imagem.");
  }
}

export async function deleteFolder(folderName: string) {
  try {
    // Decodificar o nome da pasta para usar em delete_resources_by_prefix
    const decodedFolderName = decodeURIComponent(folderName);

    // Deletar os recursos dentro da pasta
    const deleteResourcesResponse = await cloudinary.v2.api.delete_resources_by_prefix(
      decodedFolderName + "/",
      { resource_type: "image" }
    );

    // Verificar se a resposta contém informações sobre recursos deletados
    if (deleteResourcesResponse.deleted_counts) {
      let remaining = deleteResourcesResponse.deleted_counts;
      while (remaining && Object.keys(remaining).length > 0) {
        // Deletar os recursos restantes, caso a primeira tentativa não tenha deletado todos
        const response = await cloudinary.v2.api.delete_resources_by_prefix(
          decodedFolderName + "/",
          { resource_type: "image" }
        );
        remaining = response.deleted_counts;
      }
    }

    // Deletar a pasta usando o nome codificado (com %20)
    await cloudinary.v2.api.delete_folder(folderName); // Sem decodeURIComponent
  } catch (error) {
    throw new Error("Falha ao deletar o álbum.");
  }
}

export async function addTag(image: SearchResult, tagName: string) {
  await cloudinary.v2.uploader.add_tag(tagName, [image.public_id]);
}

export async function removeTag(image: SearchResult, tagName: string) {
  await cloudinary.v2.uploader.remove_tag(tagName, [image.public_id]);
}