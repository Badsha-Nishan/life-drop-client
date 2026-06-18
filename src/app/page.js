import FeaturedSection from "@/component/FeaturedSection";
import HeroBanner from "@/component/HeroBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedSection />
    </div>
  );
}
