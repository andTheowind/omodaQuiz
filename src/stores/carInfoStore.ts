import { readable } from "svelte/store";
import type { RadioVariant } from "../lib/radio";

export type CarInfo = RadioVariant & {
  previewImage: string;
  finalImage: string;
};

export async function getCarsData(): Promise< CarInfo[] > {

  return fetch("config.json")
  .then((response) => response.json())
  .then((data) => {
    return data.cars;
  });

}