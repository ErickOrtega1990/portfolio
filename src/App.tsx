import Navbar2 from "./components/navbars/Navbar2/Navbar2.tsx";

import Home from "./sections/Home/Home.tsx";
import Header from "./components/Header/Header.tsx";
import About from "./sections/About/About.tsx";
import Proyectos from "./sections/Proyectos/Proyectos.tsx";
import Contacto from "./sections/Contacto/Contacto.tsx";
import { useCallback, useMemo, useState } from "react";

import type { Texts } from "./contexts/lenguages/lenguagesType.ts";
import { lenguages } from "./lenguages/lenguages.ts";
import lenguagesContext from "./contexts/lenguages/lenguagesContext.ts";

function App() {
  const [lenguage, setLenguage] = useState<Texts>(lenguages.ES);

  const changeLenguage = useCallback((current: Texts) => {
    setLenguage(current === lenguages.ES ? lenguages.EN : lenguages.ES);
  }, []);

  const contextValue = useMemo(
    () => ({ lenguage, changeLenguage }),
    [lenguage, changeLenguage],
  );

  return (
    <lenguagesContext.Provider value={contextValue}>
      <Header>
        <Navbar2 />
      </Header>
      <Home />
      <About />
      <Proyectos />
      <Contacto />
    </lenguagesContext.Provider>
  );
}

export default App;
