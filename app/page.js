import HomeBanner from "./components/Home/home-bannar";
import HomeAbout from "./components/Home/home-about";
import HomeProducts from "./components/Home/home-products";
import HomeStaticOffer from "./components/Home/home-static";
import HomeClients from "./components/Home/home-clients";
import HomeFaq from "./components/Home/home-faq";
import HomeContact from "./components/Home/home-contact";

export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <HomeAbout />
      <HomeProducts />
      <HomeStaticOffer />
      <HomeClients />
      <HomeFaq />
      <HomeContact />
    </main>
  );
}