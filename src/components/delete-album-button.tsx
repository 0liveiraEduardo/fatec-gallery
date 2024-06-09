"use client";

import { Button } from "@/components/ui/button"; 
import { Trash } from "lucide-react";
import { deleteFolder } from "@/components/actions";
import { useState } from 'react';

export function DeleteButton({ folderName }: { folderName: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAlbum = async () => {
    setIsLoading(true);
    try {
      await deleteFolder(folderName);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover o álbum:", error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Button disabled={isLoading} onClick={handleDeleteAlbum}>
      <Trash size={24} />
    </Button>
  );
}
