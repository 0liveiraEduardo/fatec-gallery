"use client";

import { Heart } from "@/components/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import { FullHeart } from "@/components/icons/full-heart";
import { SearchResult } from "@/app/gallery/page";
import { setAsFavoriteAction } from "@/app/gallery/actions";
import { ImageMenu } from "./image-menu";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();

  const { imageData, onUnheart } = props;

  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );

  console.log(`CloudinaryImage - Renderizando imagem: ${imageData.public_id}`);
  console.log(`CloudinaryImage - Favorito: ${isFavorited}`);

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} data-imagedata={imageData} /> {/* Passa imagedata para data-imagedata */}
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            console.log(
              `CloudinaryImage - Removendo imagem dos favoritos: ${imageData.public_id}`
            );
            onUnheart?.(imageData);
            setIsFavorited(false);
            console.log(`CloudinaryImage - Favorito: ${isFavorited}`); // Verifique o estado depois de remover
            startTransition(() => {
              console.log(
                `CloudinaryImage - Atualizando estado do Cloudinary: ${imageData.public_id}`
              );
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            console.log(
              `CloudinaryImage - Adicionando imagem aos favoritos: ${imageData.public_id}`
            );
            setIsFavorited(true);
            console.log(`CloudinaryImage - Favorito: ${isFavorited}`); // Verifique o estado depois de adicionar
            startTransition(() => {
              console.log(
                `CloudinaryImage - Atualizando estado do Cloudinary: ${imageData.public_id}`
              );
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}