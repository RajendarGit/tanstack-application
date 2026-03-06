import { getImageUrl } from "#/helper/getImageUrl";
import type { CastMember } from "type";
import { Button } from "./ui/button";

export default function MovieCreditCard({
  castPages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  castPages: CastMember[][];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) {
  const cast = castPages.flat();

  return (
    <div className="container py-20">
      <h2 className="text-2xl font-bold mb-4">Cast &amp; Crew</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((c) => (
          <div key={c.id} className="flex flex-col items-center">
            {c.profile_path ? (
              <img
                src={getImageUrl(c.profile_path)}
                alt={c.name}
                className="w-24 h-24 rounded-full object-cover mb-2 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-gray-700">
                  {c.name.charAt(0)}
                </span>
              </div>
            )}
            <p className="text-sm">{c.name}</p>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center my-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant={"secondary"}
          >
            {isFetchingNextPage
              ? "Loading more cast members..."
              : "Load More Cast Members"}
          </Button>
        </div>
      )}
    </div>
  );
}
