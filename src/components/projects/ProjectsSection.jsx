import { PROJECTS } from "../../data/projects";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [main, ...past] = PROJECTS;
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 72px" }}>
      <Reveal>
        <SectionHeader label="PROJECTS" />
      </Reveal>
      {main && <ProjectCard key={main.title} proj={main} initOpen={true} />}

      {past.length > 0 && (
        <>
          <Reveal>
            <div style={{ marginTop: 56 }}>
              <SectionHeader label="PAST PROJECTS" />
            </div>
          </Reveal>
          {past.map(proj => (
            <ProjectCard key={proj.title} proj={proj} initOpen={false} />
          ))}
        </>
      )}
    </div>
  );
}
