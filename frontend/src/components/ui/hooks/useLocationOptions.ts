import { prawdziweDaneLokacji } from "@/mocks/prawdziweDaneLokacji";
import { useMemo, useReducer } from "react";

export const useLocationOptions = () => {
  const reducer = (state: any, action: any) => {
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
      case "setGmina":
        return {
          ...state,
          gmina: location,
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
    gmina: null,
    district: null,
  });

  const voivodeships = prawdziweDaneLokacji
    .filter((location) => location.NAZWA_DOD === "województwo")
    .map((location) => location.NAZWA);

  const districts = useMemo(() => {
    if (!state.voivodeship) return [];

    return prawdziweDaneLokacji
      .filter(
        (location) =>
          location.NAZWA_DOD === "powiat" &&
          location.WOJ === state.voivodeship.WOJ
      )
      .map((district) => district.NAZWA);
  }, [state.voivodeship]);

  const gminy = useMemo(() => {
    if (!state.district || !state.voivodeship) return [];

    return prawdziweDaneLokacji
      .filter(
        (location) =>
          location.NAZWA_DOD.includes("gmina") &&
          location.WOJ === state.voivodeship.WOJ
      )
      .map((gmina) => gmina.NAZWA);
  }, [state.voivodeship, state.district]);

  return {
    selected: state,
    setSelected: setState,
    voivodeships,
    gminy,
    districts,
  };
};
