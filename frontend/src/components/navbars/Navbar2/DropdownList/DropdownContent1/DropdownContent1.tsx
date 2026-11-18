import { useContext } from "react";
import NavbarLink from "../../NavbarLink/NavbarLink";
import lenguagesContext from "../../../../../contexts/lenguages/lenguagesContext";

type Props = { onNavigate?: () => void };

function DropdownContent1({ onNavigate }: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <NavbarLink href="#formacion" onNavigate={onNavigate}>
        {lenguage.navBar.txt21}
      </NavbarLink>
      <NavbarLink href="#experiencia" onNavigate={onNavigate}>
        {lenguage.navBar.txt22}
      </NavbarLink>
      <NavbarLink href="#habilidades" onNavigate={onNavigate}>
        {lenguage.navBar.txt23}
      </NavbarLink>
    </>
  );
}

export default DropdownContent1;
