import { createFlatSceneNodes } from "./importMap";

export const createImageIds = (nodes: SceneNode[]) => {
  return createFlatSceneNodes(nodes)
    .map((node) => node.id)
    .join(",");
};
