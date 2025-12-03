import { MovieWatchTemplate } from "@/templates/movie-watch-template";
import { RouteProtection } from "@/components/organisms/route-protection";

export default function MoviePage() {
  return (
    <RouteProtection>
      <MovieWatchTemplate />
    </RouteProtection>
  );
}
