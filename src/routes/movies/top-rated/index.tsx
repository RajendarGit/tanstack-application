import ContainerLayout from "#/components/ContainerLayout";
import Hero from "#/components/Hero";
import MovieCard from "#/components/MovieCard";
import { Button } from "#/components/ui/button";
import { queryClient } from "#/helper/queryClient";
import { fetchMovies } from "#/queries/fetMovies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Movie } from "type";

export const Route = createFileRoute("/movies/top-rated/")({
  loader: async () => {
    // Prefetch the first page into React Query cache
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["top-rated-movies"],
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, type: "top_rated" }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: Movie[], allPages: Movie[][]) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });
    return {}; // loader must return something, even empty
  },
  component: PopularMovieComponent,
});

function PopularMovieComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["top-rated-movies"],
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, type: "top_rated" }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });
  return (
    <>
      <div className="relative">
        <div className="hidden md:block">
          <Hero height="md:h-45" />
        </div>
        <p className="hidden md:block title text-white text-4xl lg:text-6xl md:absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Top Rated Movies
        </p>
      </div>
      <ContainerLayout>
        <div className="mt-20 md:mt-0">
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
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                variant={"secondary"}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            ) : (
              <p>No more movies to load.</p>
            )}
          </div>
        </div>
      </ContainerLayout>
    </>
  );
}
