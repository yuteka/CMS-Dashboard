import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import MediaSection from "@/components/MediaSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default async function HomePage({ params }: { params: { lang: string } }) {
  const content = await getContent();
  const { lang } = params;

  return (
    <main className="bg-white">
      <Navbar lang={lang} navItems={content.common.nav} />
      <Hero lang={lang} data={content.home.hero} />
      <div id="about">
        <About lang={lang} data={content.home.about} />
      </div>
      <div id="services">
        <Services lang={lang} data={content.home.services} />
      </div>
      <MediaSection lang={lang} data={content.home.media_section} />
      <Testimonials lang={lang} data={content.home.testimonials} />
      <div id="contact">
        <Contact 
          lang={lang} 
          data={content.home.contact} 
          footerData={content.common.footer} 
        />
      </div>
    </main>
  );
}
