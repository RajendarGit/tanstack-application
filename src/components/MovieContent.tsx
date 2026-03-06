// components/MovieContent.tsx
import ContainerLayout from "#/components/ContainerLayout";
import MovieCard from "#/components/MovieCard";
import { Button } from "#/components/ui/button";
import { fetchMovies } from "#/queries/fetMovies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Movie } from "type";

interface MovieContentProps {
  type: "popular" | "upcoming" | "top_rated";
  queryKey: string[];
  limit?: number;
}

export default function MovieContent({
  type,
  queryKey,
  limit,
}: MovieContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, type }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: Movie[], allPages: Movie[][]) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    });

  const navigate = useNavigate();

  return (
    <>
      <ContainerLayout>
        <div className="mt-20 md:mt-0">
          {data?.pages.map((page, index) => {
            const moviesToRender = limit ? page.slice(0, limit) : page;

            return (
              <div
                className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-4"
                key={index}
              >
                {moviesToRender.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            );
          })}

          {limit?.toFixed() ? (
            <Button
              onClick={() =>
                navigate({
                  to: `/movies/${type}`,
                })
              }
              variant={"secondary"}
            >
              {isFetchingNextPage ? "Loading..." : "View all"}
            </Button>
          ) : (
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
          )}
        </div>
      </ContainerLayout>
    </>
  );
}
