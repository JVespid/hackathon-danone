import style from "JV/styles/Home.module.scss";
import { contextGlobal } from "JV/services/context/global/global";
import { useContext, useEffect, useRef } from "react";
import NavBar from "JV/layouts/navbar/navbar";
import { getAllData } from "JV/services/changeItems/products";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const { updateProducts } = useContext(contextGlobal);
  const useOnlyTime = useRef(true);
  const router = useRouter();

  const getDataInitialProducts = async () => {
    const data = await getAllData();
    if (!data.exist) return { exist: false };
    updateProducts({ products: data });
  };

  useEffect(() => {
    if (useOnlyTime.current) {
      useOnlyTime.current = false;
      getDataInitialProducts();
    }
  }, []);

  return (
    <>
      <NavBar title={"Home"}>
        <main className={style["main"]}>
          <img src="/svg/index-background.svg" alt="fondo-1" />

          <div className={style["header"]}>
            <h1>¡Lleve un registro de su límite diario de calorías!</h1>
            <h3>
              Mantener un registro de su ingesta de calorías no solo se trata de
              restricciones, sino de encontrar un equilibrio adecuado. Puede
              permitirse disfrutar de sus alimentos favoritos de la familia
              Danone en moderación
            </h3>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/signIn")}
            >
              Inicia Ahora
            </motion.button>
          </div>

          <div className={style["promos"]}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={style["promo"]}
              onClick={() => router.push("/calc")}
            >
              <h4>Pregúntanos</h4>
              <p>
                ¡Cuéntanos cuál es tu ingesta calórica diaria máxima y te
                recomendaremos los productos que mejor se adapten a tus
                objetivos!
              </p>
              <div className={style["img"]}>
                <img
                  src="https://tecnolawyer.com/wp-content/uploads/2021/05/20945347-scaled.jpg"
                  alt="imagen de la promoción"
                />
              </div>
              <button> vamos a platicar de ello</button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={style["promo"]}
              onClick={() => router.push("/products")}
            >
              <h4>Revisa</h4>
              <p>
                Revisa nuestros productos y mide tu consumo de calorías
                ¡Ayúdanos a ayudarte !
              </p>
              <div className={style["img"]}>
                <img
                  src="https://ideasfrescas.com.mx/wp-content/uploads/2016/06/binomio-pm.jpg"
                  alt="imagen de la promoción"
                />
              </div>
              <button>revisa el catalogo completo</button>
            </motion.div>
          </div>
        </main>
      </NavBar>
    </>
  );
}
