import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "JV/styles/pages/signUp/index.module.scss";
import { motion } from "framer-motion";
import { existToken, signUp } from "JV/services/changeItems/cookies";
import { saveDataInLS } from "JV/services/changeItems/localStorage";

export default function Index() {
  const inputs = [
    {
      type: "text",
      id: "name",
      placeholder: "Gerardo Ochoa",
      label: "Ingresa tu nombre",
    },
    {
      type: "text",
      id: "user",
      placeholder: "TheJuan-2",
      label: "Ingresa un nombre de usuario",
    },
    {
      type: "email",
      id: "email",
      placeholder: "email@compañía.com",
      label: "Ingresa un correo electrónico",
    },
    {
      type: "password",
      id: "password",
      placeholder: "***************",
      label: "Ingresa una contraseña",
    },
    {
      type: "password",
      id: "password2",
      placeholder: "***************",
      label: "Confirma la contraseña",
    },
  ];

  const router = useRouter();
  const newUser = async e => {
    e.preventDefault();
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (!e.target[inputs[i].id].value)
        return alert("datos incompletos " + inputs[i].id);
      else {
        if (inputs[i].id === "password2") continue;
        data = { ...data, [inputs[i].id]: e.target[inputs[i].id].value };
      }
    }
    const res = await signUp({ toInsert: data });
    if (res.exist) {
      saveDataInLS({ data });
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
          onSubmit={newUser}
          className={style["form"]}
        >
          <div className={style["title"]}>
            <h2>Regístrate</h2>
          </div>

          {inputs.map((input, index) => (
            <Inputs
              key={"signUpInput-" + input.id}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              label={input.label}
              index={index + 1}
            />
          ))}

          <div className={style["btn"]}>
            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.5 }}
              type="button"
              onClick={() => router.push("/signIn")}
              value={"Inicia sesión"}
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

const Inputs = ({ id, type, placeholder, label, index }) => {
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
        tabIndex={index}
      />
    </motion.div>
  );
};
