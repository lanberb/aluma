import { BASE_URL } from "../../libs/constants/url";

export type Options = {
  fileKey: string;
  ids: string;
  format: "png" | "svg";
};

interface GetImagesProps {
  token: string;
  options: Options;
}
export const getImages = async (props: GetImagesProps) => {
  const { token, options } = props;
  const { fileKey, format, ids } = options;
  const url = `${BASE_URL.figma}/images/${fileKey}?format=${format}&ids=${ids}`;

  const headers = {
    "X-Figma-Token": token,
  };

  return await fetch(url, { headers });
};
