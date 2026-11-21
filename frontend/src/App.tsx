import Navbar2 from "./components/navbars/Navbar2/Navbar2.tsx";

import Home from "./sections/Home/Home.tsx";
import Header from "./components/Header/Header.tsx";
import About from "./sections/About/About.tsx";
import Proyectos from "./sections/Proyectos/Proyectos.tsx";
import Contacto from "./sections/Contacto/Contacto.tsx";
import Footer from "./components/footer/Footer.tsx";
import { useCallback, useMemo, useState } from "react";

import type { Texts } from "./contexts/lenguages/lenguagesType.ts";
import { lenguages } from "./lenguages/lenguages.ts";
import lenguagesContext from "./contexts/lenguages/lenguagesContext.ts";
import UnderConstruction from "./components/underConstruction/UnderConstruction.tsx";

const health_URL = import.meta.env.VITE_MAILING_HEALT;

function App() {
  const [lenguage, setLenguage] = useState<Texts>(lenguages.ES);

  const changeLenguage = useCallback((current: Texts) => {
    setLenguage(current === lenguages.ES ? lenguages.EN : lenguages.ES);

    try {
      fetch(health_URL, {
        method: "GET",
      });
    } catch {}
  }, []);

  const contextValue = useMemo(
    () => ({ lenguage, changeLenguage }),
    [lenguage, changeLenguage],
  );

  return (
    <lenguagesContext.Provider value={contextValue}>
      {/* <Header>
        <Navbar2 />
      </Header>
      <Home />
      <About />
      <Proyectos />
      <Contacto />
      <Footer /> */}
      <UnderConstruction></UnderConstruction>
    </lenguagesContext.Provider>
  );
}

export default App;
