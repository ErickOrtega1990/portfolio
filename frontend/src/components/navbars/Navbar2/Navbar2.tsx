import style from "./Navbar2.module.css";
import ToggleButton from "./ToogleButton/ToggleButton";
import { useState } from "react";
import NavbarContent from "./NavbarContent";

type Props = {};

const show = {
  height: "auto",
  overflow: "scroll",
  opacity: "1",
  pointerEvents: "auto",
} as const;

function Navbar1({}: Props) {
  const [showBar, setShowBar] = useState(false);

  const showBarHandler = () => {
    setShowBar(!showBar);
  };

  const closeBar = () => {
    setShowBar(false);
  };

  return (
    <>
      <ToggleButton setShowBar={showBarHandler} showBar={showBar} />
      <div className={style.navbar}>
        <div className={style.browserLinkContainer}>
          <NavbarContent />
        </div>
        <div
          className={style.mobileLinkContainer}
          style={showBar ? show : undefined}
        >
          <NavbarContent onNavigate={closeBar} />
        </div>
      </div>
    </>
  );
}

export default Navbar1;
