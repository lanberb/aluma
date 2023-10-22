import JSZip from "jszip";

export type ImportFormat = "png" | "svg";
const mineType: { [format in ImportFormat]: string } = {
  png: "image/png",
  svg: "image/svg+xml",
};
const extension: { [format in ImportFormat]: string } = {
  png: ".png",
  svg: ".svg",
};

export interface ZipComposition extends Array<{ name: string; id: string; children?: ZipComposition }> {}

export const createZipComposition = (nodes: SceneNode[]) => {
  return nodes.reduce<ZipComposition>((arr, node) => {
    if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "COMPONENT") {
      return arr;
    }

    const { name, id, children } = node;

    if (node.name.charAt(0) === "/" && children) {
      const childrenNodes = createZipComposition(children.concat());
      arr.push({
        name,
        id,
        children: childrenNodes,
      });
      return arr;
    }

    arr.push({
      name,
      id,
    });
    return arr;
  }, []);
};

export interface ZipBinaryImagesComposition {
  [id: string]: Blob;
}
export const createZipAsync = (binaryImages: ZipBinaryImagesComposition, composition: ReturnType<typeof createZipComposition>, format: ImportFormat) => {
  const zip = composition.reduce<JSZip>(function createFile(zipFile, node) {
    const { children, id, name } = node;

    if (children !== undefined) {
      const childFile = zipFile.folder(name);
      children.forEach((child) => childFile && createFile(childFile, child));
      return zipFile;
    }

    zipFile.file(`${name}${extension[format]}`, binaryImages[id]);
    return zipFile;
  }, new JSZip());

  return zip.generateAsync({ type: "blob" });
};
