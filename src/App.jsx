import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProjectsSection from "./components/projects/ProjectsSection";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

export default function App() {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const h = () => setNavSolid(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", color: "#111", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #DDD; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>

      <Nav solid={navSolid} />
      <Hero />
      <ProjectsSection />
      <Skills />
      <Footer />
    </div>
  );
}
