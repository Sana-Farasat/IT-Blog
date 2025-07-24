import { EmblaCarousel } from "@/Carousel/Carousel";
import Text from "@/components/BlogText";

export default function Home() {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <div>
        <div>
          <EmblaCarousel />
        </div>
      </div>
      <h1 className="text-center text-blue-800 pt-5 text-4xl md:text-5xl font-bold mb-4">
        Welcome to My Blog
      </h1>
      <div>
        <Text />
      </div>
    </main>
  );
}
