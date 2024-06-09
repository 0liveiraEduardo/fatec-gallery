"use server";
import cloudinary from "cloudinary";
import { ForceRefresh } from "@/components/force-refresh";

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean
) {
  if (isFavorite) {
    console.log(`setAsFavoriteAction - Adicionando tag "favorite" à imagem: ${publicId}`);
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    console.log(`setAsFavoriteAction - Removendo tag "favorite" da imagem: ${publicId}`);
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
  <ForceRefresh />; {/* Renderiza ForceRefresh */}
}