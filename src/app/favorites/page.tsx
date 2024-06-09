import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import FavoritesList from "./favorites-list";
import { ForceRefresh } from "@/components/force-refresh";

export default async function FavoritesPage(){
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };
    
  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favoritos</h1>
        </div>

        <FavoritesList initialResources={results.resources} />
      </div>
      <ForceRefresh /> 
    </section>
  );
}