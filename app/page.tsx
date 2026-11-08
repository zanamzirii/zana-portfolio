import { HeroSection }       from "@/components/sections/HeroSection";
import { ProjectsSection }   from "@/components/sections/ProjectsSection";
import { CreativeSection }   from "@/components/sections/CreativeSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StatsSection }      from "@/components/sections/StatsSection";
import { EducationSection }  from "@/components/sections/EducationSection";
import { SkillsSection }     from "@/components/sections/SkillsSection";
import { AboutSection }      from "@/components/sections/AboutSection";
import { ContactSection }    from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <CreativeSection />
      <ExperienceSection />
      <StatsSection />
      <EducationSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
