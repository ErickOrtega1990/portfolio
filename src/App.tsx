import Navbar2 from "./components/navbars/Navbar2/Navbar2.tsx";

import Home from "./sections/Home/Home.tsx";
import Header from "./components/Header/Header.tsx";
import About from "./sections/About/About.tsx";
import Proyectos from "./sections/Proyectos/Proyectos.tsx";
import Contacto from "./sections/Contacto/Contacto.tsx";
import { useState } from "react";

import type { Texts } from "./contexts/lenguages/lenguagesType.ts";
import { lenguages } from "./lenguages/lenguages.ts";
import lenguagesContext from "./contexts/lenguages/lenguagesContext.ts";

function App() {
  const [lenguage, setLenguage] = useState<Texts>(lenguages.ES);

  const changeLenguage = (current: Texts) => {
    console.log("hola");
    if (current === lenguages.ES) {
      setLenguage(lenguages.EN);
    } else {
      setLenguage(lenguages.ES);
    }
  };

  return (
    <>
      <lenguagesContext.Provider value={{ lenguage, changeLenguage }}>
        <Header>
          <Navbar2 />
        </Header>
        <Home />
        <About />
        <Proyectos />
        <Contacto />
      </lenguagesContext.Provider>
    </>
  );
}

export default App;
