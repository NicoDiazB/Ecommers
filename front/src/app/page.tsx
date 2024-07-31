import CardsProduct from "@/components/CardsProduct/CardsProduct";
import Carousel from "@/components/Carousel/Carousel";

export default function Home() {
  return (
    <div>
      <Carousel />
      <main className="flex min-h-screen flex-col px-6">
        <CardsProduct />
      </main>
    </div>
  );
}
