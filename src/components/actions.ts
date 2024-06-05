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

  console.log(`deleteFolder - Iniciando exclusão do álbum: ${folderName}`);
  try {
    console.log(`deleteFolder - Excluindo recursos do álbum: ${folderName}`);
    const deleteResourcesResponse = await cloudinary.v2.api.delete_resources_by_prefix(folderName + "/", { resource_type: "image" });
    console.log(
      `deleteFolder - Recursos excluídos do álbum: ${folderName}`,
      deleteResourcesResponse.deleted_counts
    );
    // Verifique se há recursos restantes e, se houver, continue tentando excluí-los
    if (deleteResourcesResponse.deleted_counts) {
      let remaining = deleteResourcesResponse.deleted_counts;
      while (remaining && Object.keys(remaining).length > 0) {
        console.log(
          `deleteFolder - Excluindo recursos restantes do álbum: ${folderName}`,
          remaining
        );
        const response = await cloudinary.v2.api.delete_resources_by_prefix(folderName + "/", { resource_type: "image" });
        remaining = response.deleted_counts;
      }
    }

    console.log(`deleteFolder - Excluindo o álbum: ${folderName}`);
    await cloudinary.v2.api.delete_folder(folderName);
    console.log(`deleteFolder - Álbum excluído com sucesso: ${folderName}`);

  } catch (error) {
    console.error(`deleteFolder - Erro ao deletar o álbum: ${folderName}`, error);
    throw new Error('Falha ao deletar o álbum.');
  }
}