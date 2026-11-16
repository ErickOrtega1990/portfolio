import { useContext } from "react";
import DropdownContent1 from "./DropdownList/DropdownContent1/DropdownContent1";
import DropdownList from "./DropdownList/DropdownList";
import NavbarLink from "./NavbarLink/NavbarLink";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";
import SliderRadio from "../../sliderRadio/SliderRadio";

type Props = {};

function NavbarContent({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <NavbarLink href="#inicio">{lenguage.navBar.txt1}</NavbarLink>
      <DropdownList title={lenguage.navBar.txt2} childrenNumber={8}>
        <DropdownContent1 />
      </DropdownList>
      <NavbarLink href="#proyectos">{lenguage.navBar.txt3}</NavbarLink>
      <NavbarLink href="#contacto">{lenguage.navBar.txt4}</NavbarLink>
      <SliderRadio />
    </>
  );
}

export default NavbarContent;
