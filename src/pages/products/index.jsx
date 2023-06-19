import { useContext, useRef, useEffect, useState } from "react";
import { contextGlobal } from "JV/services/context/global/global";
import NavBar from "JV/layouts/navbar/navbar";
import { getAllData } from "JV/services/changeItems/products";
import All from "JV/components/products/all/all";
import Search from "JV/components/products/search/search";
import style from "JV/styles/pages/products/index.module.scss";
import Filters from "JV/components/products/filters/filters";

export default function Index() {
  const { updateProducts, colors } = useContext(contextGlobal);

  const useOnlyTime = useRef(true);

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
      <NavBar title={"Productos"}>
        <>
          <header className={style["header"]}>
            <img src="#" alt="" className="banner" />
            <h2>Productos de la familia Danone </h2>
          </header>

          <main className={style["main"]}>
            <section className={style["search-filters-container"]}>
              <article className={style["filters"]}>
                <h5>Filtros</h5>
                <Filters />
              </article>
              <article className={style["search"]}>
                <Search />
              </article>
            </section>
            <section className={style["products-container"]}>
              <article className={style["all"]}>
                <All />
              </article>
            </section>
          </main>
        </>
      </NavBar>
    </>
  );
}
