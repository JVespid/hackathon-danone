import Nav from "JV/components/index/nav/nav";
import Head from "next/head";
import { useContext } from "react";
import style from "./navbar.module.scss";
import { contextGlobal } from "JV/services/context/global/global";

export default function NavBar({ title, children }) {
  const { colors } = useContext(contextGlobal);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav
        className={style["navbar"]}
        style={{
          background: colors.pistaColor.color_1,
          borderBottom: "solid 1px " + colors.pistaColor.color_2,
        }}
      >
        <Nav />
      </nav>
      {children}
    </>
  );
}
