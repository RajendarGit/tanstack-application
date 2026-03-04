import { getImageUrl } from "#/helper/getImageUrl";
import { roundToOneDecimal } from "#/helper/getRoundedValue";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="shadow-xl border border-gray-100 rounded-2xl flex flex-col gap-4">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-2xl shadow-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl">{movie.title}</h2>
        <div className="flex items-center justify-between">
          <p>{movie.release_date}</p>
          <p className="text-2xl text-amber-600 font-bold">
            {roundToOneDecimal(movie.vote_average)}
          </p>
        </div>

        <p className="text-sm">
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
}
