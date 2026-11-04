import "./styles/globals.css";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Timeline from "./sections/Timeline";
import Standout from "./sections/Standout";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Works />
        <Standout />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}