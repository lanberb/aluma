import { FC, memo } from "react";
import { ImportMapComposition } from "../../../domain/feature/importMap";

export type ImportMapNodeToken = "vertical" | "horizontal" | "junction" | "corner" | "space" | "text";

export interface ImportMapNodeProps {
  type: ImportMapNodeToken;
  text?: string;
}

const ImportMapNode: FC<ImportMapNodeProps> = ({ type, text }) => {
  return (
    <div aria-hidden={type !== "text" || !text} className="importMapNode" data-type={type}>
      {type === "text" && text && <p className="importMapNode__text">{text}</p>}
    </div>
  );
};

interface ImportMapProps {
  composition: ImportMapComposition;
}

export const ImportMap: FC<ImportMapProps> = memo(({ composition }) => {
  return (
    <div className="importMap">
      {composition.length === 0 ? (
        <p className="importMap__empty">{"アイコンを含んだフレームを\n選択すると表示されます"}</p>
      ) : (
        composition.map((row, rowIndex) => (
          <div className="importMap__row" key={`row-${rowIndex}`}>
            {row.map((node, nodeIndex) => (
              <ImportMapNode key={`row-${rowIndex}_node-${nodeIndex}`} type={node.type} text={node.text} />
            ))}
          </div>
        ))
      )}
    </div>
  );
});
