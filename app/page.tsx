import { HeroSection }      from "@/components/sections/HeroSection";
import { AboutSection }     from "@/components/sections/AboutSection";
import { SkillsSection }    from "@/components/sections/SkillsSection";
import { ProjectsSection }  from "@/components/sections/ProjectsSection";
import { StatsSection }     from "@/components/sections/StatsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection }   from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <StatsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
