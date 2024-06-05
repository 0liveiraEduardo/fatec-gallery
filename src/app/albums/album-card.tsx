import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Folder } from "./page";
import Link from "next/link";
import { Trash } from "lucide-react"; // Assumindo que você está usando Heroicons
import { DeleteButton } from "@/components/delete-album-button";

export function AlbumCard({ folder }: { folder: Folder }) {
  
  console.log(`AlbumCard - Renderizando álbum: ${folder.name}`);

  return (
    <Card>
      <CardHeader>     
        <CardTitle>{folder.name}</CardTitle>
        <CardDescription>Todas as imagens de {folder.name}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/albums/${folder.name}`}>Ver Álbum</Link>
        </Button>
        <DeleteButton folderName={folder.name} /> {/* Usando o componente DeleteButton */}
      </CardFooter>
    </Card>
  );
}