import { getImageUrl } from "#/helper/getImageUrl";
import { roundToOneDecimal } from "#/helper/getRoundedValue";
import type { Movie } from "type";
import ContainerLayout from "./ContainerLayout";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function MovieIdCard({ movie }: { movie: Movie }) {
  return (
    <div className="relative">
      <img
        src={
          movie.poster_path
            ? getImageUrl(movie.poster_path)
            : "/placeholder.png"
        }
        alt={movie.title}
        className="w-full h-75 object-cover brightness-20 hidden lg:block z-10"
        loading="lazy"
        fetchPriority="low"
      />
      <img
        src={
          movie.poster_path
            ? getImageUrl(movie.poster_path)
            : "/placeholder.png"
        }
        alt={movie.title}
        className="w-full lg:w-75 p-4 lg:p-0 h-auto object-cover lg:absolute lg:top-20 lg:left-20 rounded-lg lg:shadow-lg"
        loading="lazy"
        fetchPriority="high"
      />
      <ContainerLayout>
        <div className="lg:ml-80 flex flex-col gap-4">
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
            <Button variant="secondary">Play</Button>
            <Button variant="destructive">Watch Later</Button>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}
