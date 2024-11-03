import { BASE_URL } from "../../../libs/constants/url";

export type Options = {
  fileKey: string;
  ids: string;
  format: "png" | "svg";
  scale: 1 | 2 | 4;
};

interface GetImagesProps {
  token: string;
  options: Options;
}
export const getImages = async (props: GetImagesProps): Promise<Response> => {
  const { token, options } = props;
  const { fileKey, format, ids, scale } = options;
  const url = `${BASE_URL.figma}/images/${fileKey}?format=${format}&ids=${ids}&scale=${scale}`;

  const headers = {
    "X-Figma-Token": token,
  };

  return await fetch(url, { headers });
};
