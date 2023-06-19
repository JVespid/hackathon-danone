import { contextGlobal } from "JV/services/context/global/global";
import { useContext, useEffect, useState, useRef } from "react";
import Items from "../items/items";
import Pagination from "../pagination/pagination";
import style from "./all.module.scss";
import { useRouter } from "next/router";

export default function All() {
  const router = useRouter();

  const { products } = useContext(contextGlobal);
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    if (router.query.page) {
      setActualPage(parseInt(router.query.page));
    }
  }, [router.query]);

  if (!products || !products.exist) return <h2>No existen productos</h2>;

  const size = 7;
  const totalItems = products.data.Products.data.length;

  return (
    <div>
      <>
        <div className={style["items-container"]}>
          {products.exist && (
            <>
              {products.data.Products.data.length>0 &&
                products.data.Products.data
                  .slice(
                    (actualPage - 1) * size + (actualPage - 1),
                    actualPage * size + (actualPage - 1),
                  )
                  .map(item => {
                    if (!item) return null;
                    return <Items key={"product-" + item.id} item={item} />;
                  })}
            </>
          )}
        </div>
        <Pagination
          size={size}
          actualPage={actualPage}
          totalItems={totalItems}
        />
      </>
    </div>
  );
}
