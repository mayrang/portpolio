import { PROJECTS } from "../../data/projects";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 72px" }}>
      <Reveal>
        <SectionHeader label="PROJECTS" />
      </Reveal>
      {PROJECTS.map((proj, i) => (
        <ProjectCard key={proj.title} proj={proj} initOpen={true} />
      ))}
    </div>
  );
}
