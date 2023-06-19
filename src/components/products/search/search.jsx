import { searchProductExistWhitTitles } from "JV/services/changeItems/products";
import { contextGlobal } from "JV/services/context/global/global";
import React, { useContext, useEffect } from "react";
import style from "./search.module.scss";

export default function Search() {
  const { changeProductsProducts, filters } = useContext(contextGlobal);

  const refInput = React.useRef();

  const searchText = async e => {
    const data = await searchProductExistWhitTitles({
      tableS: "products",
      title: e.target.value,
      mark: filters.marks,
      category: filters.categories,
    });
    changeProductsProducts({ products: data });
  };

  useEffect(() => {
    const e = { target: { value: refInput.current.value } };
    searchText(e);
  }, [filters.marks, filters.categories]);

  return (
    <>
      <div className={style["search"]}>
        <img
          src="svg/icons/search.svg"
          alt="icono de buscar"
          onClick={() => refInput.current.focus()}
        />
        <input
          type="search"
          name="Search"
          id="search"
          onChange={searchText}
          placeholder="Buscar"
          ref={refInput}
        />
      </div>
    </>
  );
}
