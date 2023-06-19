export const methods = {
  UPDATE_SESSION: "UPDATE_SESSION",
  UPDATE_PRODUCTS: "UPDATE_PRODUCTS",
  CHANGE_PRODUCTS_CATEGORIES: "CHANGE_PRODUCTS_CATEGORIES",
  CHANGE_PRODUCTS_MARKS: "CHANGE_PRODUCTS_MARKS",
  CHANGE_PRODUCTS_PRODUCTS: "CHANGE_PRODUCTS_PRODUCTS",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_MARKS: "SET_MARKS",
};

export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case methods.UPDATE_SESSION:
      return {
        ...state,
        system: {
          ...state.system,
          session: {
            ...state.system.session,
            ...payload.data,
            init: payload.init,
          },
        },
      };
    case methods.UPDATE_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          exist: payload.exist,
          data: payload.data,
        },
      };
    case methods.CHANGE_PRODUCTS_CATEGORIES:
      return {
        ...state,
        products: {
          ...state.products,
          data: {
            ...state.products.data,
            Categories: {
              data: payload.data,
              exist: payload.data,
            },
          },
        },
      };
    case methods.CHANGE_PRODUCTS_MARKS:
      return {
        ...state,
        products: {
          ...state.products,
          data: {
            ...state.products.data,
            Marks: {
              data: payload.data,
              exist: payload.data,
            },
          },
        },
      };
    case methods.CHANGE_PRODUCTS_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          data: {
            ...state.products.data,
            Products: {
              data: payload.data,
              exist: payload.data,
            },
          },
        },
      };
    case methods.SET_CATEGORIES:
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: payload,
        },
      };
    case methods.SET_MARKS:
      return {
        ...state,
        filters: {
          ...state.filters,
          marks: payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
