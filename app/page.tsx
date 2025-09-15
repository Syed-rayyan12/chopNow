
import { RestaurantRiderNavbar } from "@/components/customer-panel-components/admin-rider-navbar";
import ComingSoon from "@/components/customer-panel-components/coming-soon";
import FeatureSection from "@/components/customer-panel-components/feature-section";
import { FeaturedRestaurants } from "@/components/customer-panel-components/featured-restaurants";
import { Footer } from "@/components/customer-panel-components/footer";
import { Header } from "@/components/customer-panel-components/header";

import { HeroSection } from "@/components/customer-panel-components/hero-section";
import { PopularCuisines } from "@/components/customer-panel-components/popular-cuisines";
import ScrollMarquee from "@/components/customer-panel-components/scroll-marquee";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <RestaurantRiderNavbar/>
      <Header />
      <main>
        <HeroSection />
        <FeaturedRestaurants />
        <PopularCuisines />
        <FeatureSection/>
        <ScrollMarquee/>
        <ComingSoon/>
      </main>
      <Footer />
    </div>
  )
}
