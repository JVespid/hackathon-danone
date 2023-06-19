import { useRouter } from "next/router";
import style from "./pagination.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Pagination({ size, actualPage, totalItems }) {
  const router = useRouter();
  const cantPages = 5;
  const calc = Math.floor(totalItems / size / 10);

  const numPages = Math.ceil(totalItems / size) - calc;
  const diferencie = actualPage - Math.ceil(cantPages / 2);
  const start =
    diferencie <= 0
      ? 0
      : actualPage + (cantPages - 2) >= numPages
      ? numPages - cantPages
      : diferencie;
  const end = cantPages + start > numPages ? numPages : cantPages + start;

  useEffect(() => {
    if (actualPage > numPages || actualPage < 1) {
      router.push({
        pathname: router.pathname,
        query: { page: 1 },
      });
    }
  }, []);

  const PaginationInter = () => {
    const pages = [];

    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <motion.div
          whileHover={{ scale: 1.3 }}
          key={"page-" + router.pathname + "-" + i}
          className={
            style["page"] +
            " " +
            style[actualPage === i ? "active" : "inactive"]
          }
          onClick={() => {
            router.push({
              pathname: router.pathname,
              query: { page: i },
            });
          }}
        >
          {i}
        </motion.div>,
      );
    }
    return pages;
  };

  return (
    <>
      <div className={style["pagination-container"]}>
        <motion.div
          whileHover={{ scale: 1.3 }}
          className={style["page"] + " " + style["arrow"]}
          onClick={() => {
            router.push({
              pathname: router.pathname,
              query: { page: 1 },
            });
          }}
        >
          {"<<"}
        </motion.div>
        {actualPage - 1 > 0 && (
          <motion.div
            whileHover={{ scale: 1.3 }}
            className={style["page"] + " " + style["arrow"]}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { page: actualPage - 1 },
              });
            }}
          >
            {"<"}
          </motion.div>
        )}
        {PaginationInter().slice(start, end)}
        {actualPage + 1 <= numPages && (
          <motion.div
            whileHover={{ scale: 1.3 }}
            className={style["page"] + " " + style["arrow"]}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: {
                  page: actualPage + 1,
                },
              });
            }}
          >
            {">"}
          </motion.div>
        )}
        <motion.div
          whileHover={{ scale: 1.3 }}
          className={style["page"] + " " + style["arrow"]}
          onClick={() => {
            router.push({
              pathname: router.pathname,
              query: { page: numPages },
            });
          }}
        >
          {">>"}
        </motion.div>
      </div>
    </>
  );
}
