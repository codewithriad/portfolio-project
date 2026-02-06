import About from "@/components/About";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
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
      <Contact />
      <Footer />
    </main>
  );
}
