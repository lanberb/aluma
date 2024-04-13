import React, { memo } from "react";
import { ImportMapComposition } from "../../../../domain/feature/importMap";
import { styled } from "@linaria/react";

export type ImportMapNodeToken = "vertical" | "horizontal" | "junction" | "corner" | "space" | "text";

const _ImportMapNode = styled.div`
  --importMapNode--width: 1px;

  position: relative;
  width: 24px;
  height: 24px;
  color: white;
  flex-shrink: 0;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    width: 0;
    height: 0;
    background-color: var(--figma-color-bg-secondary);
    border: none;
  }

  /* type=horizontal */
  &[data-type="horizontal"]::before {
    margin: auto 0;
    width: 100%;
    height: var(--importMapNode--width);
  }
  &[data-type="horizontal"]::after {
    content: none;
  }

  /* type=vertical */
  &[data-type="vertical"]::before {
    margin: 0 auto;
    width: var(--importMapNode--width);
    height: 100%;
  }
  &[data-type="vertical"]::after {
    content: none;
  }

  /* type=junction */
  &[data-type="junction"]::before {
    margin: auto 0 auto auto;
    width: 50%;
    height: var(--importMapNode--width);
  }
  &[data-type="junction"]::after {
    margin: 0 auto;
    width: var(--importMapNode--width);
    height: 100%;
  }

  /* type=corner */
  &[data-type="corner"]::before {
    margin: auto 0 auto auto;
    width: calc(50% + var(--importMapNode--width) / 2);
    height: var(--importMapNode--width);
  }
  &[data-type="corner"]::after {
    margin: 0 auto;
    width: var(--importMapNode--width);
    height: calc(50% + var(--importMapNode--width) / 2);
  }

  /* type=space */
  &[data-type="space"]::before,
  &[data-type="space"]::after {
    content: none;
  }

  /* type=text */
  &[data-type="text"] {
    width: 100%;
    padding-left: 4px;
    white-space: nowrap;
    font-size: 12px;
    line-height: 1;
    display: flex;
    align-items: center;
  }
  & > p {
    height: fit-content;
  }
`;
export interface ImportMapNodeProps {
  type: ImportMapNodeToken;
  text?: string;
}
const ImportMapNode: React.FC<ImportMapNodeProps> = ({ type, text }) => {
  return (
    <_ImportMapNode aria-hidden={type !== "text" || !text} data-type={type}>
      {type === "text" && text && <p>{text}</p>}
    </_ImportMapNode>
  );
};

const _ImportMap = styled.div`
  height: 100%;
  padding: 0 0 16px;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  .importMap__empty {
    position: relative;
    margin: auto;
    font-size: 12px;
    white-space: pre-wrap;
    line-height: 140%;
    text-align: center;
    color: var(--figma-color-text-tertiary);
  }
  .importMap__row {
    display: flex;
  }
`;
interface ImportMapProps {
  composition: ImportMapComposition;
}

export const ImportMap: React.FC<ImportMapProps> = memo(function Component({ composition }) {
  return (
    <_ImportMap>
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
    </_ImportMap>
  );
});
