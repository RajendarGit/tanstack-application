// routes/movies/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "#/components/MovieCard";
import { fetchMovies } from "#/queries/fetMovies";
import type { Movie } from "type";
import { queryClient } from "#/helper/queryClient";
import ContainerLayout from "#/components/ContainerLayout";

export const Route = createFileRoute("/movies/")({
  loader: async () => {
    // Prefetch the first page into React Query cache
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage: Movie[], allPages: Movie[][]) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });
    return {}; // loader must return something, even empty
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });

  return (
    <ContainerLayout>
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
    </ContainerLayout>
  );
}
