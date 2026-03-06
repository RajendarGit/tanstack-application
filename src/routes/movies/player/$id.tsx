import MoviePlayer from "#/components/MoviePlayer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/player/$id")({
  component: MoviePlayerComponent,
});

function MoviePlayerComponent() {
  return <MoviePlayer src="https://www.w3schools.com/html/mov_bbb.mp4" />;
}
