import { useState, useRef } from "react";
import style from "JV/styles/pages/calc/index.module.scss";
import NavBar from "JV/layouts/navbar/navbar";
import { motion } from "framer-motion";

import { Configuration, OpenAIApi } from "openai";

export default function Index() {
  const [response, setResponse] = useState([
    { rol: "user", text: "hola" },
    { rol: "bot", text: "hola" },
  ]);
  let arrActual = [];

  const refInput = useRef(null);

  const sendRes = async text => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENIA_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const SYSTEM_MESSAGE = {
      role: "system",
      text: `residirás un texto del usuario, tu trabajo es responder como un experto de la salud que trabaja para Danone (empresa de productos lácteos) y tienes que recomendar productos de la marca según te lo pida y que cumplan con las necesidades del usuario.`,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [SYSTEM_MESSAGE, { role: "user", text }],
    });

    return response.data.choices[0]
      ? response.data.choices[0].message
      : "error";
  };

  const addResUser = async () => {
    if (!refInput.current.value.trim()) return;
    arrActual.push({ rol: "user", text: refInput.current.value });
    setResponse([...response, ...arrActual]);
    arrActual = [];
    refInput.current.value = "";
    try {
      const text = await sendRes(refInput.current.value);
      arrActual.push({ rol: "user", text: text });
      setResponse([...response, ...arrActual]);
      arrActual = [];
    } catch (error) {}
  };

  return (
    <>
      <NavBar title={"calc"}>
        <header className={style["header"]}>
          <br />
          <h2>Pregunta lo que quieras</h2>
          <br />
        </header>
        <main className={style["main"]}>
          <section className={style["historial"]}>
            <div className={style["historial-container"]}>
              {response &&
                response.map((item, index) => (
                  <div
                    className={style["msg-container"]}
                    key={item.text + "-" + index}
                  >
                    <div className={style["msg"] + " " + style["bot"]}>
                      {item.rol == "bot" && (
                        <>
                          <div className={style["header"]}>{item.rol}</div>
                          <p>{item.text}</p>
                        </>
                      )}
                    </div>

                    <div className={style["msg"] + " " + style["user"]}>
                      {item.rol == "user" && (
                        <>
                          <div className={style["header"]}>{item.rol}</div>
                          <p>{item.text}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className={style["text-input"]}>
            <div>
              <input
                type="text"
                placeholder="¿Que productos de Danone tienen pocas calorías?"
                ref={refInput}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={style["img"]}
                onClick={addResUser}
              >
                <img src="/svg/icons/send.svg" alt="botón enviar" />
              </motion.div>
            </div>
          </section>
        </main>
      </NavBar>
    </>
  );
}
