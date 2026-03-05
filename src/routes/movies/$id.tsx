import MovieCreditCard from "#/components/MovieCreditCard";
import MovieIdCard from "#/components/MovieIdCard";
import { queryClient } from "#/helper/queryClient";
import { fetchMovieById } from "#/queries/fetchMovieById";
import { getMovieCredits } from "#/queries/fetchMovieCast";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { CastMember, Movie } from "type";
import { NotFoundComponent } from "../NotFound";

export const Route = createFileRoute("/movies/$id")({
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) throw new Error("Movie ID is required");

    // Prefetch movie
    await queryClient.prefetchQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieById(id),
    });

    // Prefetch credits (first page)
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["credits", id],
      queryFn: async ({ pageParam = 1 }) => {
        const credits = await getMovieCredits(id);
        const pageSize = 12;
        const start = (pageParam - 1) * pageSize;
        const end = start + pageSize;
        return credits.cast.slice(start, end);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: CastMember[], allPages: CastMember[][]) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
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
    isLoading: movieLoading,
    error: movieError,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: creditsLoading,
    error: creditsError,
  } = useInfiniteQuery<CastMember[]>({
    queryKey: ["credits", id],
    queryFn: async ({ pageParam = 1 }) => {
      const credits = await getMovieCredits(id);
      const pageSize = 12;
      const start = ((pageParam as number) - 1) * pageSize;
      const end = start + pageSize;
      return credits.cast.slice(start, end);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: CastMember[], allPages: CastMember[][]) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
  });

  if (movieLoading || creditsLoading) return <p>Loading...</p>;
  if (movieError instanceof Error) return <p>{movieError.message}</p>;
  if (creditsError instanceof Error) return <p>{creditsError.message}</p>;

  return (
    <>
      <MovieIdCard movie={movie} />
      <MovieCreditCard
        castPages={data?.pages ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
