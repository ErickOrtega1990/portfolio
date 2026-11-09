import { useContext } from "react";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";

type Props = {};

function ExperienceCard2({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <h1>{lenguage.About2.txt2}</h1>
      <p>{lenguage.About2.Experience.txt1}</p>
      <p>{lenguage.About2.Experience.txt2}</p>
    </>
  );
}

export default ExperienceCard2;
