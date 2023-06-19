import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createJson } from "JV/pages/index";
import style from "./user.module.scss";
import { contextGlobal } from "JV/services/context/global/global";
import {
  existToken,
  verifyTokenAndReturnData,
} from "JV/services/changeItems/cookies";

export default function User() {
  const router = useRouter();
  const [tokenUserIs, setTokenUserIs] = useState("");
  const { updateSession, session } = useContext(contextGlobal);

  const tokenCheck = async ({ token }) => {
    const value = await verifyTokenAndReturnData({ token });

    if (!value.exist) {
      updateSession({ data: "no data", init: false });
      return false;
    }
    updateSession({ data: value.data, init: true });
    return true;
  };

  useEffect(() => {
    const verification = existToken();
    if (verification.exist) {
      if (tokenCheck({ token: verification.tokenUser })) {
        setTokenUserIs("exist");
        return;
      }
      setTokenUserIs("signIn");
      return;
    }
    setTokenUserIs("signIn");
  }, []);

  if (tokenUserIs == "signUp" || tokenUserIs == "signIn")
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={style["signup-signin"]}
          onClick={() => router.push("/" + tokenUserIs)}
        >
          <p>signUp/signIn</p>
        </motion.div>
      </>
    );
  if (tokenUserIs == "exist")
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={style["user-container"]}
          onClick={() => router.push("/user")}
        >
          <img src="svg/icons/user.svg" alt="icono de usuario" />
          <p>{session.user.split(" ")[0]}</p>
        </motion.div>
      </>
    );
}
