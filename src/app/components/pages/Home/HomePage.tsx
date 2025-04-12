// biome-ignore lint/style/useImportType: <explanation>
import React, { KeyboardEvent } from "react";
import type { Status } from "../../../../libs/type";
import type { ImportMapComposition } from "../../../domain/feature/importMap";
import type { ImportFormat } from "../../../domain/feature/zip";
import { HorizontalLayout } from "../../layouts/HorizontalLayout";
import { Loading } from "../../modules/Loading";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { ImportMap } from "../../ui/ImportMap";
import { Text } from "../../ui/Text";

const imageFormat = ["png", "svg"] as const;
const importScale = [1, 2, 4] as const;

interface Props {
  accessTokenStatus: Status;
  defaultAccessToken: string;
  disabledSubmitButton: boolean;
  defaultImportFormat: ImportFormat;
  composition: ImportMapComposition;
  showLoading: boolean;
  onChangeImportFormat: (imageType: ImportFormat) => void;
  onChangeImportScale: (imageType: (typeof importScale)[number]) => void;
  onClickSubmitButton: () => void;
  onInputAccessToken: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const HomePage: React.FC<Props> = ({
  accessTokenStatus,
  defaultAccessToken,
  defaultImportFormat,
  disabledSubmitButton,
  composition,
  showLoading,
  onChangeImportFormat,
  onChangeImportScale,
  onClickSubmitButton,
  onInputAccessToken,
}) => {
  return (
    <>
      {showLoading && <Loading />}
      <HorizontalLayout>
        <ImportMap composition={composition} />
        <Form.Frame
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <Text fz={12} lh={1} style={{ marginBottom: 4 }}>
              アクセストークン
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Form.TextField
                status={accessTokenStatus}
                id="accessToken"
                placeholder="Figma Personal Access Tokenを入力"
                defaultValue={defaultAccessToken}
                onInput={onInputAccessToken}
              />
            </div>
          </div>

          <div>
            <Text fz={12} lh={1} style={{ marginBottom: 8 }}>
              出力形式
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
              }}
            >
              {imageFormat.map((type) => (
                <div
                  key={type}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Form.Radio
                    id={type}
                    name="imageFormat"
                    defaultChecked={type === defaultImportFormat}
                    onChange={() => onChangeImportFormat(type)}
                  />
                  <Text
                    as="label"
                    fz={12}
                    lh={1}
                    htmlFor={type}
                  >
                    {type.toUpperCase()}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flexGrow: 1
          }}>
            <Text fz={12} lh={1} style={{ marginBottom: 8 }}>
              出力倍率
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
              }}
            >
              {importScale.map((type) => (
                <div
                  key={`scale-${type.toString()}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Form.Radio
                    id={`scale-${type.toString()}`}
                    name="imageScale"
                    defaultChecked={type === 2}
                    onChange={() => onChangeImportScale(type)}
                  />
                  <Text
                    as="label"
                    fz={12}
                    lh={1}
                    htmlFor={`scale-${type.toString()}`}
                  >
                    x{type}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="button"
            disabled={disabledSubmitButton}
            onClick={onClickSubmitButton}
          >
            選択したアセットをインポートする
          </Button>
        </Form.Frame>
      </HorizontalLayout>
    </>
  );
};
