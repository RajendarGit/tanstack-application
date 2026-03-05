import MovieIdCard from "#/components/MovieIdCard";
import { queryClient } from "#/helper/queryClient";
import { fetchMovieById } from "#/queries/fetchMovieById";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Movie } from "type";
import { NotFoundComponent } from "../NotFound";

export const Route = createFileRoute("/movies/$id")({
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) throw new Error("Movie ID is required");
    await queryClient.prefetchQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieById(id),
    });
    return { id };
  },
  component: MovieDetail,
  notFoundComponent: NotFoundComponent,
});

function MovieDetail() {
  const { id } = Route.useLoaderData();

  const {
    data: movie = {} as Movie,
    isLoading,
    error,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return <MovieIdCard movie={movie} />;
}
