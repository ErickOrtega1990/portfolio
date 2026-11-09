import picture from "../../../assets/cards/profile/gatito.webp";
import style from "./Profile.module.css";
import { useContext } from "react";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";

type Props = {};

function Profile({}: Props) {
  const { lenguage } = useContext(lenguagesContext);

  return (
    <>
      <div className={style.profile}>
        <h1 className={style.h1}>{lenguage.About1.txt1}</h1>
        <img
          src={picture}
          alt="profile picture"
          className={style.profilePicture}
          loading="lazy"
        />
        <p>{lenguage.About1.txt2}</p>
        <p>{lenguage.About1.txt3}</p>
      </div>
    </>
  );
}

export default Profile;
