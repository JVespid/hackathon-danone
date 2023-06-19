import { createContext, useMemo, useReducer } from "react";

import { reducer, methods } from "./reducer";

export const contextGlobal = createContext();

const initialState = {
  products: {
    exist: false,
    data: {},
  },

  filters: {
    marks: 0,
    categories: 0,
  },

  system: {
    session: {
      init: false,
      token: "",
      name: "",
      user: "JVespid",
      email: "",
      data: {},
    },
    colors: {
      transparent: "rgba(0, 0, 0, 0)",
      pistaColor: {
        color_1: "rgb(232, 243, 255)",
        color_2: "rgb(213, 232, 255)",
        color_3: "rgb(179, 211, 255)",
        color_4: "rgb(133, 180, 255)",
        color_5: "rgb(86, 134, 255)",
        color_6: "rgb(47, 89, 255)",
        color_7: "rgb(12, 38, 255)",
        color_8: "rgb(0, 23, 235)",
        color_9: "rgb(0, 23, 235)",
        color_10: "rgb(6, 28, 205)",
        color_11: "rgb(16, 36, 159)",
        color_12: "rgb(10, 19, 92)",
      },
      colorLogos: {
        color_1: "rgb(232, 243, 255)",
        color_2: "rgb(76, 171, 228)",
        color_3: "rgb(91, 181, 233)",
        color_4: "rgb(137, 200, 242)",
        color_5: "rgb(17, 172, 237)",
        color_6: "rgb(50, 75, 170)",
      },
      degrade: {
        color_1: "rgba(133, 180, 255, 0.4)",
      },
    },
  },
};

export default function Global({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSession = ({ data, init }) => {
    init = typeof init == "boolean" ? init : false;
    data = typeof data == "object" ? data : initialState.system.session;
    dispatch({ type: methods.UPDATE_SESSION, payload: { data, init } });
  };
  const updateProducts = ({ products }) => {
    if (state.products.exist) {
      return;
    }
    products.exist =
      typeof products.exist == "boolean" ? products.exist : false;
    products.data = products.exist && products.data ? products.data : {};

    dispatch({ type: methods.UPDATE_PRODUCTS, payload: products });
  };

  const changeProductsCategories = ({ categories }) => {
    categories = typeof categories == "object" ? categories : {};
    dispatch({ type: methods.CHANGE_PRODUCTS_CATEGORIES, payload: categories });
  };
  const changeProductsMarks = ({ marks }) => {
    marks = typeof marks == "object" ? marks : {};
    dispatch({ type: methods.CHANGE_PRODUCTS_MARKS, payload: marks });
  };
  const changeProductsProducts = ({ products }) => {
    products = typeof products == "object" ? products : {};
    dispatch({ type: methods.CHANGE_PRODUCTS_PRODUCTS, payload: products });
  };

  const setCategories = ({ categories }) => {
    categories = typeof categories == "number" ? categories : 0;

    dispatch({ type: methods.SET_CATEGORIES, payload: categories });
  }
  const setMarks = ({ marks }) => {
    marks = typeof marks == "number" ? marks : 0;
    dispatch({ type: methods.SET_MARKS, payload: marks });
  }


  const value = useMemo(
    () => ({
      state,
      colors: state.system.colors,
      session: state.system.session,
      products: state.products,
      filters: state.filters,
      updateSession,
      updateProducts,
      changeProductsCategories,
      changeProductsMarks,
      changeProductsProducts,

      setCategories,
      setMarks,
    }),
    [state],
  );

  return (
    <contextGlobal.Provider value={value}>{children}</contextGlobal.Provider>
  );
}
