import { existToken, logout } from "JV/services/changeItems/cookies";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import style from "JV/styles/pages/user/index.module.scss";
import { useEffect } from "react";
export default function Index() {
  const router = useRouter();

  const exit = () => {
    logout();
    router.push("/");
  };
  const home = () => {
    router.push("/");
  };

  useEffect(() => {
    const validation = existToken();
    if (!validation.exist) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <main className={style["main"]}>
        <div className={style["center"]}>
          <motion.h1 whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }}>
            Pagina no disponible
          </motion.h1>
          <motion.h2 whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }}>
            ERROR 404
          </motion.h2>
          <div className={style["btn"]}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={home}
            >
              ir al Inicio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exit}
            >
              cerrar sesión
            </motion.button>
          </div>
        </div>
      </main>
    </>
  );
}
