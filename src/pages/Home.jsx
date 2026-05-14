import Banner from "../components/home/Banner";
import BannerBottom from "../components/home/BannerBottom";
import FeaturedCategories from "../components/home/FeaturedCategories";
import PremiumDeal from "../components/home/PremiumDeal";
import HomeProductsGrid from "../components/home/HomeProductsGrid";

export default function Home() {
    return (
        <main className="bg-primary overflow-hidden">
            <section className="relative">
                <Banner />
            </section>

            <section className="relative z-10 -mt-16 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <BannerBottom />
                    <FeaturedCategories />
                    <PremiumDeal />
                    <HomeProductsGrid />

                </div>
            </section>
        </main>
    );
}