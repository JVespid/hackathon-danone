import React, { useEffect, useRef, useState, useContext } from "react";
import { createClient } from "contentful";
import { motion } from "framer-motion";
import Link from "next/link";
import User from "./user/user";
import style from "./nav.module.scss";
import { contextGlobal } from "JV/services/context/global/global";

export default function Nav() {
  const [titleNavbar, setTitleNavbar] = useState([]);
  const [subNavbarIsVisible, setSubNavbarIsVisible] = useState({});
  const [navBar, setNavbar] = useState(false);

  const { colors } = useContext(contextGlobal);

  const fetchData = async () => {
    try {
      const titlesNavbar = localStorage.getItem("titlesNavbar");

      if (titlesNavbar != null && titlesNavbar) {
        setTitleNavbar(JSON.parse(titlesNavbar));
        return;
      }
      const client = createClient({
        space: process.env.NEXT_PUBLIC_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      });

      const res = await client.getEntries({ content_type: "homeNavbar" });
      localStorage.setItem(
        "titlesNavbar",
        JSON.stringify(res.items[0].fields.titleNavbar),
      );

      setTitleNavbar(res.items[0].fields.titleNavbar);
    } catch (error) {}
  };

  useEffect(() => {
    if (!titleNavbar || !titleNavbar.length > 0) {
      fetchData();
    }
  }, []);

  const animateMenuHover = ({ hover, item, index }) => {
    setSubNavbarIsVisible(() => ({
      [item + "-" + index]: hover,
    }));
  };

  const ulOccult = {
    hidden: {
      height: 0,
      padding: 0,
      border: "solid 0px red",
      background: colors.pistaColor.color_2,
    },
    visible: {
      height: "auto",
      padding: "10px",
      //border: "solid 1px " + colors.pistaColor.color_5,
      background: colors.pistaColor.color_2,
    },
  };
  const arrowExpanded = {
    hidden: {
      rotate: 0,
    },
    visible: {
      rotate: 180,
    },
  };

  const variantNavbar = {
    hidden: {},
    visible: {
      padding: "10px",
      height: "auto",
    },
  };

  return (
    <>
      <div className={style["navbar-container"]}>
        <div className={style["logo"]}>
          <img src="svg/svg-3-conFondo.svg" alt="logo de Danone" />
        </div>

        <div className={style["ul-container"]}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={style["responsive"]}
            onClick={() => {setNavbar(!navBar)}}
          >
            <img src="svg/icons/cuadro.svg" alt="menu desplegable " />
          </motion.div>

          <motion.ul
            layout
            animate={navBar ? "visible" : "hidden"}
            variants={variantNavbar}
            initial={"hidden"}
            className={style["navbar"]}
          >
            {titleNavbar
              ? titleNavbar.map((item, index) => (
                  <motion.li
                    key={"li-navbar-" + index}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={style["title-and-icon"]}
                      onMouseEnter={() =>
                        animateMenuHover({
                          hover: true,
                          item: item.title,
                          index,
                        })
                      }
                      onMouseLeave={() =>
                        animateMenuHover({
                          hover: false,
                          item: item.title,
                          index,
                        })
                      }
                    >
                      <Link href={item.src}>{item.title}</Link>
                      {item.icon && (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          variants={arrowExpanded}
                          animate={
                            subNavbarIsVisible[item.title + "-" + index]
                              ? "visible"
                              : "hidden"
                          }
                          key={"btn-navbar" + index}
                        >
                          <img
                            src={"svg/icons/" + item.icon + ".svg"}
                            alt="icon the product"
                          />
                        </motion.button>
                      )}
                    </div>

                    {item.extras != 0 && (
                      <motion.ul
                        layout
                        variants={ulOccult}
                        initial={"hidden"}
                        animate={
                          subNavbarIsVisible[item.title + "-" + index]
                            ? "visible"
                            : "hidden"
                        }
                        onMouseEnter={() =>
                          animateMenuHover({
                            hover: true,
                            item: item.title,
                            index,
                          })
                        }
                        onMouseLeave={() =>
                          animateMenuHover({
                            hover: false,
                            item: item.title,
                            index,
                          })
                        }
                        className={style["sub-navbar"]}
                      >
                        {item.extras.map((item, index) => (
                          <motion.li
                            whileHover={{ scale: 1.03, padding: "0" }}
                            key={"li-subNavbar-" + index}
                          >
                            <Link href={"/products?type=" + item.title}>
                              {item.title}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.li>
                ))
              : null}
          </motion.ul>
        </div>
        <div className={style["user-container"]}>
          <div className={style["user"]}>
            <User />
          </div>
        </div>
      </div>
    </>
  );
}
