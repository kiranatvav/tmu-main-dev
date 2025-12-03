import { MovieCalendarTemplate } from "@/templates/movie-calendar-template";
import { RouteProtection } from "@/components/organisms/route-protection";

export default function BookPage() {
  return (
    <RouteProtection>
      <MovieCalendarTemplate />
    </RouteProtection>
  );
}
