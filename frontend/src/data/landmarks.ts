import trocadero from "@/assets/map/trocadero.svg";
import tourEiffel from "@/assets/map/tour-eiffel.svg";
import invalides from "@/assets/map/invalides.svg";
import assemblee from "@/assets/map/assemblee.svg";
import orsay from "@/assets/map/orsay.svg";
import louvre from "@/assets/map/louvre.svg";
import notreDame from "@/assets/map/notre-dame.svg";
import hotelDeVille from "@/assets/map/hotel-de-ville.svg";
import liberte from "@/assets/map/liberte.svg";

export interface Landmark {
  id: string;
  icon: string;
  top: string;
  left: string;
  width: string;
  tooltipSide: "top" | "bottom" | "left" | "right";
}

export const landmarks: Landmark[] = [
  {
    id: "liberte",
    icon: liberte.src,
    top: "62%",
    left: "2.3%",
    width: "30px",
    tooltipSide: "right",
  },
  {
    id: "trocadero",
    icon: trocadero.src,
    top: "32%",
    left: "10%",
    width: "80px",
    tooltipSide: "bottom",
  },
  {
    id: "tour-eiffel",
    icon: tourEiffel.src,
    top: "34%",
    left: "20%",
    width: "30px",
    tooltipSide: "right",
  },
  {
    id: "invalides",
    icon: invalides.src,
    top: "40%",
    left: "35%",
    width: "40px",
    tooltipSide: "bottom",
  },
  {
    id: "assemblee",
    icon: assemblee.src,
    top: "34%",
    left: "40%",
    width: "65px",
    tooltipSide: "top",
  },
  {
    id: "orsay",
    icon: orsay.src,
    top: "44%",
    left: "51%",
    width: "65px",
    tooltipSide: "bottom",
  },
  {
    id: "louvre",
    icon: louvre.src,
    top: "29%",
    left: "55%",
    width: "45px",
    tooltipSide: "top",
  },
  {
    id: "notre-dame",
    icon: notreDame.src,
    top: "43%",
    left: "70%",
    width: "50px",
    tooltipSide: "bottom",
  },
  {
    id: "hotel-de-ville",
    icon: hotelDeVille.src,
    top: "47%",
    left: "81%",
    width: "60px",
    tooltipSide: "top",
  },
];

/** Landmark IDs used for i18n key lookup: croisiere.landmark_{id}_name / croisiere.landmark_{id}_description */
export const landmarkIds = landmarks.map((l) => l.id);

/** Itinerary step IDs for i18n key lookup: croisiere.itinerary_{index}_time / label / detail */
export const itineraryStepCount = 9;
