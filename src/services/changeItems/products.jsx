import { configSupabase } from "JV/services/other/config-db";
import { ActualDate } from "JV/services/other/getDate";

export const getDataDB = async ({ nameLocalStorage, nameTable }) => {
  if (typeof nameLocalStorage !== "string" || typeof nameTable !== "string") {
    return { exist: false };
  }

  try {
    const storageJson = localStorage.getItem(nameLocalStorage);
    if (storageJson != null || JSON.parse(storageJson)) {
      const { data, expiredDate } = JSON.parse(storageJson);
      const { actualDate } = ActualDate();
      if (actualDate < expiredDate) {
        return { exist: true, data };
      }
      localStorage.setItem(nameLocalStorage, JSON.stringify([]));
    }
  } catch (error) {}

  const { supabase } = configSupabase();
  const { data, error } = await supabase.from(nameTable).select("*");
  if (error != null || data.length < 0) {
    localStorage.setItem(nameLocalStorage, JSON.stringify([]));
    return { exist: false };
  }

  const { expiredDate } = ActualDate();
  localStorage.setItem(nameLocalStorage, JSON.stringify({ data, expiredDate }));
  return { exist: true, data };
};

export const getAllData = async () => {
  try {
    const existCategories = await getDataDB({
      nameLocalStorage: "categoriesData",
      nameTable: "categories",
    });
    const existMark = await getDataDB({
      nameLocalStorage: "marksData",
      nameTable: "marks",
    });
    const existProduct = await getDataDB({
      nameLocalStorage: "productsData",
      nameTable: "products",
    });

    return {
      exist: true,
      data: {
        Categories: existCategories.exist
          ? { data: existCategories.data, exist: existCategories.exist }
          : { data: [], exist: false },
        Marks: existMark.exist
          ? { data: existMark.data, exist: existMark.exist }
          : { data: [], exist: false },
        Products: existProduct.exist
          ? { data: existProduct.data, exist: existProduct.exist }
          : { data: [], exist: false },
      },
    };
  } catch (error) {
    return {
      exist: false,
      data: {},
    };
  }
};
export const searchProductExistWhitTitles = async ({
  title,
  tableS,
  category,
  mark,
}) => {
  //try {
  const typesTables = {
    categories: { table: "categories", localStorageName: "categoriesData" },
    marks: { table: "marks", localStorageName: "marksData" },
    products: { table: "products", localStorageName: "productsData" },
  };
  const { table, localStorageName } = typesTables[tableS];

  const values = await getDataDB({
    nameLocalStorage: localStorageName,
    nameTable: table,
  });

  let searched = values.data.map(item => {
    const { name } = item;
    const search = name.toLowerCase().search(title.toLowerCase());
    if (search !== -1) {
      return item;
    }
  });
  let searchedFilter = searched;

  searchedFilter = searchedFilter.filter(objeto => objeto !== undefined);

  if (category !== 0) {
    searchedFilter = searchedFilter.filter(
      objeto => objeto["categori_id"] == category,
    );
  }
  if (mark !== 0) {
    searchedFilter = searchedFilter.filter(objeto => objeto["mark-id"] == mark);
  }

  return { exist: true, data: searchedFilter };
  //} catch (error) {
  //  return { exist: false, data: {} };
  //}
};
