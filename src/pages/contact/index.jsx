import { useContext } from "react";
import style from "JV/styles/pages/contact/index.module.scss";
import { contextGlobal } from "JV/services/context/global/global";
import NavBar from "JV/layouts/navbar/navbar";

export default function Index() {
  //const { colors } = useContext(contextGlobal);
  return (
    <>
      <NavBar title={"Contactar"}>
        <></>
      </NavBar>
    </>
  );
}
