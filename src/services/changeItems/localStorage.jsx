import React from "react";

export function LocalStorage() {
  return "hola";
}


export function updateInfo({ token }) {
  return "hola";
}

export function updateDataJsonUser({ newData, token }) {
  return "hola";
}

export function getInformationTheSession() {
  try {
    const { data } = JSON.parse(localStorage.getItem("informationSession"));
    return { exist: true, data };
  } catch (error) {
    return { exist: false };
  }
}

export function saveDataInLS({ data }) {
  try {
    localStorage.setItem("informationSession", JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}
