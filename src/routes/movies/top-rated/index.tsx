// routes/movies/popular.tsx
import { queryClient } from "#/helper/queryClient";
import { fetchMovies } from "#/queries/fetMovies";
import { createFileRoute } from "@tanstack/react-router";
import MovieContent from "#/components/MovieContent";
import type { Movie } from "type";
import Hero from "#/components/Hero";

export const Route = createFileRoute("/movies/top-rated/")({
  loader: async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["top-rated-movies"],
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, type: "top_rated" }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: Movie[], allPages: Movie[][]) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });
    return {};
  },
  component: MovieContentWrapper,
});

function MovieContentWrapper() {
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
      <MovieContent type="top_rated" queryKey={["top-rated-movies"]} />
    </>
  );
}
