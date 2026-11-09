import { useContext } from "react";
import NavbarLink from "../../NavbarLink/NavbarLink";
import lenguagesContext from "../../../../../contexts/lenguages/lenguagesContext";

type Props = {};

function DropdownContent1({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <NavbarLink href="#formacion">{lenguage.navBar.txt21}</NavbarLink>
      <NavbarLink href="#experiencia">{lenguage.navBar.txt22}</NavbarLink>
      <NavbarLink href="#habilidades">{lenguage.navBar.txt23}</NavbarLink>
    </>
  );
}

export default DropdownContent1;
