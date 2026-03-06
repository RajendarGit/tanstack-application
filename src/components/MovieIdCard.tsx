import { getImageUrl } from "#/helper/getImageUrl";
import { roundToOneDecimal } from "#/helper/getRoundedValue";
import { useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Movie } from "type";
import ContainerLayout from "./ContainerLayout";
import { Button } from "./ui/button";

export default function MovieIdCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  return (
    <div className="mt-20">
      {movie.backdrop_path ? (
        <div className="w-full h-75 object-cover bg-gray-100 hidden lg:block z-10">
          <img
            src={
              movie.backdrop_path
                ? getImageUrl(movie.backdrop_path)
                : getImageUrl(movie.poster_path)
            }
            alt={movie.title}
            className="w-full h-75 object-cover brightness-30 hidden lg:block z-10"
            loading="lazy"
            fetchPriority="high"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-900 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">
            {movie.title}
          </span>
        </div>
      )}

      <ContainerLayout>
        <div className="flex gap-8">
          {movie.poster_path ? (
            <img
              src={
                movie.poster_path
                  ? getImageUrl(movie.poster_path)
                  : "/placeholder.png"
              }
              alt={movie.title}
              className="w-full lg:w-75 p-4 lg:p-0 h-auto object-cover rounded-lg lg:shadow-lg lg:mt-[-20%] relative z-10"
              loading="lazy"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full lg:w-75 p-4 lg:p-0 h-86 object-cover lg:absolute lg:top-20 lg:left-20 rounded-lg lg:shadow-lg bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">
                {movie.title}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-4 lg:pl-10">
            <h2 className="text-4xl font-bold title tracking-wide">
              {movie.title}
            </h2>
            <p className="text-gray-500 text-sm">
              Release Date: {movie.release_date}
            </p>
            <p className="text-md">
              {movie.overview.length > 200
                ? `${movie.overview.slice(0, 200)}...`
                : movie.overview}
            </p>
            <p className="text-amber-400 font-bold text-2xl flex items-center gap-2">
              <Star className="size-6" />
              {roundToOneDecimal(movie.vote_average)}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate({ to: `/movies/player/${movie.id}` })}
                variant="secondary"
              >
                Play
              </Button>
              <Button variant="destructive">Watch Later</Button>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}
