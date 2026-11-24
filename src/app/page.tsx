import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("Developer & Digital Creator");
export default function Home() {
  return (
    <>
      <HomeSection />
      <div className="discipline-strip" aria-label="Areas of interest">
        <span>WEB DEVELOPMENT</span>
        <i>✳</i>
        <span>ANDROID</span>
        <i>✳</i>
        <span>UI / UX DESIGN</span>
        <i>✳</i>
        <span>GAMING & CONTENT</span>
      </div>
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
