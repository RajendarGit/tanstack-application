import ContainerLayout from "#/components/ContainerLayout";
import Hero from "#/components/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="relative">
      <Hero />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <ContainerLayout>
          <section className="flex flex-col items-start gap-6">
            <p className="text-white/50">Watch Movies Online</p>
            <p className="text-xl lg:text-7xl title text-white">
              One place for all your movie needs.
            </p>
            <p className="m-0 max-w-3xl leading-8 text-white/50">
              Explore our vast collection of movies, from timeless classics to
              the latest blockbusters. Stream your favorites or discover new
              ones with ease. Your next movie night starts here.
            </p>
          </section>
          <section>popular movies content</section>
        </ContainerLayout>
      </div>
    </div>
  );
}
