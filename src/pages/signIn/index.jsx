import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "JV/styles/pages/signIn/index.module.scss";
import { motion } from "framer-motion";
import { existToken, signIn } from "JV/services/changeItems/cookies";
import { saveDataInLS } from "JV/services/changeItems/localStorage";

export default function Index() {
  const router = useRouter();
  const inputs = [
    {
      type: "text",
      id: "user",
      placeholder: "TheJuan-2",
      label: "Ingresa un nombre de usuario",
    },
    {
      type: "password",
      id: "password",
      placeholder: "***************",
      label: "Ingresa una contraseña",
    },
  ];

  const getUser = async e => {
    e.preventDefault();
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (!e.target[inputs[i].id].value)
        return alert("datos incompletos " + inputs[i].id);
      data = { ...data, [inputs[i].id]: e.target[inputs[i].id].value };
    }
    const res = await signIn({ toInsert: data });

    if (res.exist) {
      saveDataInLS({ data: res.data });
      router.push("/");
    }
  };

  const backToHome = e => {
    e.preventDefault();
    router.push("/");
  };

  useEffect(() => {
    const val = existToken();
    if (val.exist) router.push("/");
  }, []);

  return (
    <>
      <main className={style["main"]}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          whileFocus={{ scale: 1.5 }}
          className={style["back"]}
          onClick={backToHome}
        >
          <img src="/svg/icons/arrow-bottom.svg" alt="arrow" />
        </motion.div>

        <motion.form
          whileTap={{ scale: 0.9999 }}
          whileFocus={{ scale: 1.5 }}
          onSubmit={getUser}
          className={style["form"]}
        >
          <div className={style["title"]}>
            <h2>Inicia Sesión</h2>
          </div>

          {inputs.map(input => (
            <Inputs
              key={"signUpInput-" + input.id}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              label={input.label}
            />
          ))}

          <div className={style["btn"]}>
            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.5 }}
              type="button"
              onClick={() => router.push("/signUp")}
              value={"Crear cuenta"}
            />

            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.5 }}
              type="submit"
            />
          </div>
        </motion.form>
      </main>
    </>
  );
}

const Inputs = ({ id, type, placeholder, label }) => {
  return (
    <motion.div className={style["quest"]}>
      <label htmlFor={id} className={style["pregunta"]}>
        {label}
      </label>
      <motion.input
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        whileFocus={{ scale: 1.5 }}
        type={type}
        className={style["question-input"]}
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </motion.div>
  );
};
