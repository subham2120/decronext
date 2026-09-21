import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import RoomSection from "../components/RoomSection";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <main>

      <Hero />
      <CategorySection />

      <RoomSection />

      <FeaturedProducts />

    </main>
  );
}

export default Home;