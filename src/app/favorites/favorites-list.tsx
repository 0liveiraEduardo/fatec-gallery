"use client";

import { useEffect, useState } from "react";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/image-grid";
import { CloudinaryImage } from "@/components/cloudinary-image";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    console.log("FavoritesList - Atualizando lista de favoritos...");
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        console.log(
          "FavoritesList - Renderizando imagem favorita: ${imageData.public_id}"
        );
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onUnheart={(unheartedResource) => {
              console.log(
                `FavoritesList - Removendo imagem favorita: ${unheartedResource.public_id}`
              );
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id
                )
              );
            }}
          />
        );
      }}
    />
  );
}