import { getInformationTheSession, saveDataInLS } from "./localStorage";

import { configSupabase } from "JV/services/other/config-db";
import { ActualDate } from "JV/services/other/getDate";
import { createToken } from "../other/createToken";

export async function verifyTokenAndReturnData({ token }) {
  const { actualDate } = ActualDate();
  const cookie = localStorage.getItem("cookie");
  if (cookie && JSON.parse(cookie).tokenUser) {
    const { tokenUser, expiredDate } = JSON.parse(cookie);
    if (tokenUser === token && actualDate < expiredDate) {
      const value = getInformationTheSession();
      if (value.exist) return { exist: true, data: value.data };
    }
  }

  const { supabase } = configSupabase();
  const { data, error } = await supabase

    .from("users")
    .select("name, user, email, data")
    .eq("token", token);

  if (error != null || data.length < 0) {
    saveDataInLS({ data: {} });
    saveToken({ token: "" });
    return { exist: false };
  }
  saveDataInLS({ data: data[0] });
  saveToken({ token });
  return { exist: true, data: data[0] };
}

export function saveToken({ token }) {
  const { expiredDate } = ActualDate();
  try {
    let lastCookie = localStorage.getItem("cookie");

    if (!lastCookie) lastCookie = "{}";

    const newObjet = {
      ...(JSON.parse(lastCookie) ? JSON.parse(lastCookie) : {}),
      tokenUser: token,
      expiredDate,
    };
    localStorage.setItem("cookie", JSON.stringify(newObjet));
    return { exist: true };
  } catch (error) {
    return { exist: false };
  }
}

export function deleteToken({ token }) {
  return "hola";
}

export function saveNewToken({ token }) {
  return "hola";
}

export function existToken() {
  const { actualDate } = ActualDate();
  const cookie = localStorage.getItem("cookie");
  if (cookie && JSON.parse(cookie).tokenUser) {
    if (JSON.parse(cookie).expiredDate > actualDate)
      return { exist: true, tokenUser: JSON.parse(cookie).tokenUser };
  }
  return { exist: false };
}

export async function signUp({ toInsert }) {
  try {
    const valuesToSend = ["name", "user", "email", "password"];
    const { supabase } = configSupabase();

    for (let i = 0; i < valuesToSend.length; i++) {
      if (!toInsert[valuesToSend[i]])
        return { exist: false, error: "datos incompletos " };
    }

    const token = createToken({
      user: toInsert.user,
    });

    const insert = {
      ...toInsert,
      token,
    };
    const { data, error } = await supabase.from("users").insert([insert]);

    if (error == "error unable to connect to the database") {
      return { exist: false, error: "error unable to connect to the database" };
    }

    saveToken({ token });
    return { exist: true, data };
  } catch (error) {
    return { exist: false, error: "error unable to connect to the database" };
  }
}

export async function signIn({ toInsert }) {
  try {
    const valuesToSend = ["user", "password"];
    const { supabase } = configSupabase();

    for (let i = 0; i < valuesToSend.length; i++) {
      if (!toInsert[valuesToSend[i]])
        return { exist: false, error: "datos incompletos " };
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user", toInsert.user)
      .eq("password", toInsert.password);

    if (error == null) {
      if (data.length > 0) {
        const s = saveToken({ token: data[0].token });
        return {
          exist: false,
          data: {
            name: data[0].name,
            user: data[0].user,
            email: data[0].email,
            data: data[0].data,
          },
        };
      }
    }
    return { exist: false };
  } catch (error) {
    return { exist: false };
  }
}

export function logout() {
  const validate = saveToken({ token: "" });

  if (validate.exist) {
    return { exist: true };
  }
  return { exist: true };
}
