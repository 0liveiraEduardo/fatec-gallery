import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "./icons/menu";
import { AddToAlbumDialog } from "./add-to-album-dialog";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import { Trash } from "lucide-react";
import { deleteImage } from "./actions";
import { AddTagsDialog } from "./add-tag";
import { RemoveTagsDialog } from "./remove-tag";

export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteImage(image.public_id);
      console.log(result);
      if (result.result === 'ok') {
        deleteImage(image.public_id); // Chame a função de callback para atualizar o estado no componente pai
        window.location.reload();
      } else {
        alert('Falha ao deletar a imagem.');
      }
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error);
      alert('Erro ao deletar a imagem. Verifique o console para mais detalhes.');
    }
  };
  
  
  return (
    <div className="absolute top-2 right-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="w-8 h-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem asChild>
            <AddToAlbumDialog image={image} onClose={() => setOpen(false)} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AddTagsDialog image={image} onClose={() => setOpen(false)} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <RemoveTagsDialog image={image} onClose={() => setOpen(false)} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant="ghost"
                onClick={handleDelete}
                className="cursor-pointer flex justify-start pl-4"
                
              >
                <Trash className="mr-2 w-4 h-4" />
                Remover
              </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}