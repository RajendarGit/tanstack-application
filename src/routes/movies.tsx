import MovieCard from "#/components/MovieCard";
import { fetMovies } from "#/queries/fetMovies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: fetMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // If API returns empty array, stop
        return lastPage.length === 0 ? undefined : allPages.length + 1;
      },
    });
  return (
    <div>
      {data?.pages.map((page, index) => (
        <div
          className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-4"
          key={index}
        >
          {page.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-4">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        ) : (
          <p>No more movies to load.</p>
        )}
      </div>
    </div>
  );
}
