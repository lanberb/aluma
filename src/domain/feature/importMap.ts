import { ImportMapNodeProps, ImportMapNodeToken } from "../../app/components/ui/ImportMap";

export type ImportMapComposition = Array<Array<ImportMapNodeProps>>;
export type ImportMapMode = "normal" | "flat";

export const createFlatSceneNodes = (nodes: SceneNode[]) => {
  return nodes.reduce<SceneNode[]>((arr, node) => {
    if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "COMPONENT") {
      return arr;
    }

    if (node.name.charAt(0) === "/" && node.children) {
      const childNode = createFlatSceneNodes(node.children.concat());
      arr.push(...childNode);
      return arr;
    }

    arr.push(node);
    return arr;
  }, []);
};

export const createImportMapComposition = (nodes: SceneNode[], compositionName: string, mode: ImportMapMode) => {
  const convertedNodes = mode === "flat" ? createFlatSceneNodes(nodes) : nodes;

  const headRow: ImportMapNodeProps[] = [{ type: "text", text: compositionName }];
  const childRows = convertedNodes.reduce<ImportMapComposition>(function createImportMapRow(arr, node, index, _, prefixTokens?: ImportMapNodeProps[], isLastChild = false) {
    const row: ImportMapNodeProps[] = [...(prefixTokens || [])];

    if (node.type !== "FRAME" && node.type !== "GROUP" && node.type !== "COMPONENT") {
      row.push({ type: "vertical" });
      arr.push(row);
      return arr;
    }

    const hasChildren = node.name.charAt(0) === "/" && node.children;
    const isLast = index === convertedNodes.length - 1 || isLastChild;

    if (isLast) {
      row.push({ type: "corner" });
    } else {
      row.push({ type: "junction" });
    }

    row.push({ type: "text", text: node.name });
    arr.push(row);

    if (hasChildren) {
      const childPrefixTokens: ImportMapNodeProps[] = [...(prefixTokens || []), { type: isLast ? "space" : "vertical" }];
      node.children.forEach((child, index) => createImportMapRow(arr, child, index, _, childPrefixTokens, index === node.children.length - 1));
    }

    return arr;
  }, []);

  const isDisableChildRows = childRows.flat().every((node) => node.type === "vertical");
  return isDisableChildRows ? [] : [headRow, ...childRows];
};
