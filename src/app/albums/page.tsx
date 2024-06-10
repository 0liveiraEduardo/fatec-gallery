import cloudinary from "cloudinary";
import { AlbumCard } from "./album-card";
import { ForceRefresh } from "@/components/force-refresh";

export type Folder = { name: string; path: string };

export default async function AlbumsPage({
  searchParams: { albumName },
}: {
  searchParams: {
    albumName: string;
  };
}) {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  // Decodifica o nome do álbum da URL
  const decodedAlbumName = albumName ? decodeURI(albumName) : null;

  // Filtra os álbuns se um nome de álbum for fornecido
  const filteredFolders = decodedAlbumName
    ? folders.filter((folder) => folder.name.toLowerCase() === decodedAlbumName.toLowerCase())
    : folders;

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">
            {decodedAlbumName ? `Album ${decodedAlbumName}` : 'Álbums'}
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredFolders.map((folder) => (
            // Decodifica o nome do álbum antes de passar para o AlbumCard
            <AlbumCard key={folder.path} folder={{ ...folder, name: decodeURI(folder.name) }} /> 
          ))}
        </div>
      </div>
      <ForceRefresh /> 
    </section>
  );
}