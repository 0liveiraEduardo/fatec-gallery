"use server";
import cloudinary from "cloudinary";
import { useRouter } from "next/navigation";

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean
) {
  const router = useRouter();
  console.log(`setAsFavoriteAction - Ação: ${isFavorite ? "adicionar" : "remover"} favorito`);
  console.log(`setAsFavoriteAction - ID da imagem: ${publicId}`);
  
  if (isFavorite) {
    console.log(`setAsFavoriteAction - Adicionando tag "favorite" à imagem: ${publicId}`);
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    console.log(`setAsFavoriteAction - Removendo tag "favorite" da imagem: ${publicId}`);
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
  router.push(`/favorites`);
}