import { SearchResult } from "@/app/gallery/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addTag } from "@/components/actions";

export function AddTagsDialog({
  image,
  onClose,
}: {
  image: SearchResult;
  onClose: () => void;
}) {
  const [tagName, setTagName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogTrigger>
        <Button variant="ghost">
          <span>Adicionar Tag</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Tag</DialogTitle>
          <DialogDescription>
            Digite a tag que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tag
            </Label>
            <Input
              onChange={(e) => setTagName(e.currentTarget.value)}
              id="tag-name"
              value={tagName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              onClose();
              setOpen(false);
              const tag = tagName.trim();

              if (tag) {
                await addTag(image, tag);
              }
            }}
            type="submit"
          >
            Adicionar Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}