import { OPEN_SOURCE } from "../../data/opensource";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import OpenSourceCard from "./OpenSourceCard";

export default function OpenSourceSection() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 72px" }}>
      <Reveal>
        <SectionHeader label="OPEN SOURCE CONTRIBUTIONS" />
      </Reveal>
      {OPEN_SOURCE.map((data, i) => (
        <OpenSourceCard
          key={data.id}
          data={data}
          initOpen={data.id === "lexical"}
        />
      ))}
    </div>
  );
}
