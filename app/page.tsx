import About from "@/components/About";
import Articles from "@/components/Articles";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SelectedWork />
      <About />
      <Testimonials />
      <Articles />
      <CTA />
      <Footer />
    </main>
  );
}
