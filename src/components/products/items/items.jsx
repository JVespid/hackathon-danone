import React, { useContext } from "react";
import style from "./items.module.scss";
import { motion } from "framer-motion";
import { contextGlobal } from "JV/services/context/global/global";

export default function Items({ item }) {
  const { colors } = useContext(contextGlobal);

  const variation = {
    normal: {
      background: colors.pistaColor.color_1,
    },
    hover: {
      scale: 1.1,
      background: colors.degrade.color_1,
    },
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={style["item-container"]}
      >
        <div className={style["img"]}>
          <img src={item.picture} alt={"imagen de " + item.name} />
        </div>

        <div className={style["container-general"]}>

          
          <div className={style["title-container"]}>
            <h2>{item.name.split("\n")[0]}</h2>
            <h2>{item.name.split("\n")[1]}</h2>
          </div>

          <div className={style["p-container"]}>
            <motion.div
              variants={variation}
              initial={"normal"}
              whileHover={"hover"}
              className={style["spam"]}
            >
              {item["Contenido Energético por porción en kcal"]}
              <span>kcal</span>
            </motion.div>
            <motion.div 
              variants={variation}
              initial={"normal"}
              whileHover={"hover"} className={style["spam"]}>
              {item["Contenido Energético por envase en kcal"]}
              <span>kcal</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
