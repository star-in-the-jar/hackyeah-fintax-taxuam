import { useEffect, useMemo, useReducer, useState } from "react";
import {
  prawdziweDaneLokacji,
  type Lokacja,
} from "@/mocks/prawdziweDaneLokacji";

export const useLocationOptions = () => {
  const reducer = (state, action) => {
    const locationName = action.payload;

    const location = prawdziweDaneLokacji.find(
      (location) => location.NAZWA === locationName
    );

    if (!location) return state;
    switch (action.type) {
      case "setVoivodeship":
        return {
          ...state,
          voivodeship: location,
        };
      case "setCity":
        return {
          ...state,
          city: location,
        };
      case "setDistrict":
        return {
          ...state,
          district: location,
        };
      default:
        return state;
    }
  };

  const [state, setState] = useReducer(reducer, {
    voivodeship: null,
    city: null,
    district: null,
  });

  const voivodeships = prawdziweDaneLokacji
    .filter((location) => location.NAZWA_DOD === "województwo")
    .map((location) => location.NAZWA);

  const cities = useMemo(() => {
    if (!state.voivodeship) return [];

    return prawdziweDaneLokacji
      .filter(
        (location) =>
          location.NAZWA_DOD.includes("miasto") &&
          location.WOJ === state.voivodeship.WOJ
      )
      .map((location) => location.NAZWA);
  }, [state.voivodeship]);

  const districts = useMemo(() => {
    if (!state.city) return [];

    return prawdziweDaneLokacji
      .filter(
        (location) =>
          location.NAZWA_DOD === "powiat" && location.WOJ === state.city.WOJ
      )
      .map((district) => district.NAZWA);
  }, [state.city]);

  return {
    selected: state,
    setSelected: setState,
    voivodeships,
    cities,
    districts,
  };
};
