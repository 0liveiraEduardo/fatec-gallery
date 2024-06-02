"use server";

import { SearchResult } from "@/app/gallery/page";
import cloudinary from "cloudinary";

export async function addImageToAlbum(image: SearchResult, album: string) {
  await cloudinary.v2.api.create_folder(album);

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}

// Função para deletar a imagem
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, { invalidate: true });
    return result;
  } catch (error) {
    console.error('Erro ao deletar a imagem:', error);
    throw new Error('Falha ao deletar a imagem.');
  }
}

// Função para deletar um álbum
export async function deleteFolder(folderName: string) {
  try {
    // Exclua todos os recursos dentro da pasta
    const deleteResourcesResponse = await cloudinary.v2.api.delete_resources_by_prefix(folderName + "/", { resource_type: "image" });
    
    // Verifique se há recursos restantes e, se houver, continue tentando excluí-los
    if (deleteResourcesResponse.deleted_counts) {
      let remaining = deleteResourcesResponse.deleted_counts;
      while (remaining && Object.keys(remaining).length > 0) {
        const response = await cloudinary.v2.api.delete_resources_by_prefix(folderName + "/", { resource_type: "image" });
        remaining = response.deleted_counts;
      }
    }

    // Exclua a pasta em si
    await cloudinary.v2.api.delete_folder(folderName);
    
  } catch (error) {
    console.error('Erro ao deletar o álbum:', error);
    throw new Error('Falha ao deletar o álbum.');
  }
}