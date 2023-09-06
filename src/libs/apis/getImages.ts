import { BASE_URL } from "../constants/url";

interface Options {
  fileKey: string;
  ids: string;
  format: "png" | "svg";
}

export const getImages = (token: string, { fileKey, ids, format }: Options) => {
  const url = `${BASE_URL.figma}/images/${fileKey}?format=${format}&ids=${ids}`;

  const headers = {
    "X-Figma-Token": token,
  };

  return fetch(url, { headers });
};
