// biome-ignore lint/style/useImportType: <explanation>
import React, { KeyboardEvent } from "react";
import type { Status } from "../../../../libs/type";
import type { ImportMapComposition } from "../../../domain/feature/importMap";
import { HorizontalLayout } from "../../layouts/HorizontalLayout";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { ImportMap } from "../../ui/ImportMap";
import { Spacer } from "../../ui/Spacer";
import { Stack } from "../../ui/Stack";

const imageType = ["png", "svg"] as const;

interface Props {
  accessTokenStatus: Status;
  defaultAccessToken: string;
  composition: ImportMapComposition;
  onChangeImportType: (imageType: "svg" | "png") => void;
  onClickSubmitButton: () => void;
  onInputAccessToken: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const HomePage: React.FC<Props> = ({
  accessTokenStatus,
  defaultAccessToken,
  composition,
  onChangeImportType,
  onClickSubmitButton,
  onInputAccessToken,
}) => {
  return (
    <HorizontalLayout>
      <ImportMap composition={composition} />
      <div>
        <Spacer size={[0, 12]} />
        <Form.Frame>
          <Form.TextField
            status={accessTokenStatus}
            id="accessToken"
            placeholder="Figma Personal Access Tokenを入力"
            defaultValue={defaultAccessToken}
            onInput={onInputAccessToken}
          />
          <Spacer size={[0, 12]} />
          <Stack>
            {imageType.map((type) => (
              <Stack key={type} alignItems="center">
                <Form.Radio
                  id={type}
                  name="imageType"
                  onChange={() => onChangeImportType(type)}
                />
                <label htmlFor={type}>{type}</label>
              </Stack>
            ))}
          </Stack>
          <Spacer size={[0, 20]} />
          <Button type="button" onClick={onClickSubmitButton}>
            選択したアセットを保存する
          </Button>
        </Form.Frame>
      </div>
    </HorizontalLayout>
  );
};
