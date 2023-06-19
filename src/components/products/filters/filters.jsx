import { contextGlobal } from "JV/services/context/global/global";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import style from "./filters.module.scss";

export default function Filters() {
  const { products } = useContext(contextGlobal);

  return (
    <>
      <div className={style["categories-and-marks-container"]}>
        <Search products={products} type={"categories"} Type="Categories" />
        <Search products={products} type={"marks"} Type="Marks" />
      </div>
    </>
  );
}

const Search = ({ products, type, Type }) => {
  const { setCategories, setMarks } = useContext(contextGlobal);
  const [data, setData] = useState([]);
  const [exist, setExist] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);
  const [focused, setFocused] = useState("hidden");
  const [selected, setSelected] = useState({ id: null });
  const paseOneDate = React.useRef(true);

  useEffect(() => {
    if (!selected || selected.id != itemSelect) {
      const item = data.find(item => item.id === itemSelect);
      setSelected(item);
    }
  }, [itemSelect]);

  useEffect(() => {
    if (products.exist && paseOneDate.current) {
      paseOneDate.current = false;
      setData(products.data[Type].data);
      setExist(products.data[Type].exist);
    }
  }, [products]);

  const changes = e => {
    const value = e.target.value;
    if (value === "") {
      setData(products.data[Type].data);
      setExist(products.data[Type].exist);
      return;
    }
    const dataFilter = products.data[Type].data.map(item => {
      const { name } = item;
      const search = name.toLowerCase().search(value.toLowerCase());

      if (search !== -1) {
        return item;
      }
    });

    const objetEnyNull = dataFilter.filter(item => item !== undefined);

    setData(objetEnyNull);
    setExist(objetEnyNull ? true : false);
  };

  const action = item => {
    if (type === "categories") {
      setCategories({ categories: item });
    } else if (type === "marks") {
      setMarks({ marks: item });
    }
    setItemSelect(item);
  };

  return (
    <>
      <div className={style[type] + " " + style["content"]}>
        {!(!selected || selected.id != itemSelect) && itemSelect != null ? (
          <div className={style["selection"]}>
            <div className={style["id"]}>{selected.id}</div>
            <div className={style["name"]}>{selected.name}</div>
            <div className={style["img"]} onClick={action}>
              <img src="/svg/icons/cross.svg" alt="btn cerrar" />
            </div>
          </div>
        ) : null}
        <div className={style["searching"]}>
          <input
            type="search"
            name={"search-" + type}
            id={"search-" + type}
            onChange={changes}
            onFocus={e => setFocused("visible")}
            onBlur={e => setFocused("hidden")}
            placeholder={Type}
          />
          <div
            className={style["img"]}
            onClick={() =>
              setFocused(focused == "visible" ? "hidden" : "visible")
            }
          >
            <img src="/svg/icons/arrow-bottom.svg" alt="arrow" />
          </div>
          <div className={style["items"]}>
            {products.exist ? (
              <Items
                data={data}
                exist={exist}
                type={type}
                setItemSelect={setItemSelect}
                focused={focused}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Items = ({ data, exist, type, setItemSelect, focused }) => {
  const { setCategories, setMarks } = useContext(contextGlobal);

  const action = item => {
    if (type === "categories") {
      setCategories({ categories: item });
    } else if (type === "marks") {
      setMarks({ marks: item });
    }
    setItemSelect(item);
  };

  const variantUl = {
    hidden: {
      height: 0,

      padding: "0",
    },
    visible: {
      height: "auto",
      padding: "0 20px 10px 20px",
    },
  };
  return (
    <>
      <motion.ul
        layout
        variants={variantUl}
        animate={focused}
        initial={"hidden"}
        transition={{ duration: 0.4 }}
        className={style["ul-container"]}
      >
        {exist ? (
          <>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={"filter-category-0-0"}
              onClick={() => action(0)}
              className={style["li-values"]}
            >
              <div className={style["container-values"]}>
                <div className={style["indice"]}>{0}</div>
                <div className={style["name"]}>{"all"}</div>
              </div>
            </motion.li>
            {data.map((item, index) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={"filter-category-" + index + 1}
                onClick={() => action(item.id)}
                className={style["li-values"]}
              >
                <div className={style["container-values"]}>
                  <div className={style["indice"]}>{index + 1}</div>
                  <div className={style["name"]}>{item.name}</div>
                </div>
              </motion.li>
            ))}
          </>
        ) : (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={"filter-category-0-0"}
            onClick={() => action(0)}
            className={style["li-values"]}
          >
            <div className={style["container-values"]}>
              <div className={style["indice"]}>{0}</div>
              <div className={style["name"]}>{"No hay datos"}</div>
            </div>
          </motion.li>
        )}
      </motion.ul>
    </>
  );
};
0;
