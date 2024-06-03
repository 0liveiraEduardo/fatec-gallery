"use client";

import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

export type UploadResult = CloudinaryUploadWidgetResults;

export default function Home() {
  const [imageId, setImageId] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldUploadButton
        onUpload={(result: UploadResult) => {
          // Verifique se 'info' existe e se é um objeto
          if (result.info && typeof result.info === 'object' && 'public_id' in result.info) {
            setImageId(result.info.public_id);
          }
        }}
        uploadPreset="px86yfzn"
      />

      {imageId && (
        <CldImage
          width="500"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}