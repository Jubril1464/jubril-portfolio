"use client";
import { useState, useCallback } from "react";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SkillsOrbit from "@/components/SkillsOrbit";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { ProjectData } from "@/components/types";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState<ProjectData | null>(null);

  const handleLoaded = useCallback(() => setLoaded(true), []);
  const handleCloseModal = useCallback(() => setModal(null), []);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Loader onLoaded={handleLoaded} />
      <div
        id="jl-portfolio"
        style={{ position: "relative", width: "100%", overflowX: "hidden", background: "#0a0907" }}
      >
        <Nav isLoaded={loaded} />
        <Hero isLoaded={loaded} />
        <MarqueeStrip />
        <About />
        <Projects onProjectClick={setModal} />
        <SkillsOrbit />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <Modal project={modal} onClose={handleCloseModal} />
    </>
  );
}
