import type React from "react";
import type { ImportMapComposition } from "../../../../domain/feature/importMap";
import { HorizontalLayout } from "../../layouts/HorizontalLayout";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { ImportMap } from "../../ui/ImportMap";
import { Spacer } from "../../ui/Spacer";
import { Stack } from "../../ui/Stack";

const imageType = ["png", "svg"] as const;

interface Props {
  composition: ImportMapComposition;
  onChangeImportType: (imageType: "svg" | "png") => void;
  onChangeEnableFlat: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
}

export const HomePage: React.FC<Props> = ({
  composition,
  onChangeImportType,
  onChangeEnableFlat,
  onClickSubmitButton,
}) => {
  return (
    <HorizontalLayout>
      <ImportMap composition={composition} />
      <div>
        <p>インポート形式</p>
        <Spacer size={[0, 12]} />
        <Form.Frame>
          {/* <Form.TextField id="accessToken" placeholder="Figma Personal Access Tokenを入力" defaultValue="" onInput={handleOnInputAccessToken} /> */}
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
          <Form.Checkbox id="enableFlat" onChange={onChangeEnableFlat} />
          flat
          <Form.Checkbox id="enableManifest" defaultChecked />
          manifest
          <Spacer size={[0, 20]} />
          <Button type="button" onClick={onClickSubmitButton}>
            選択したアセットを保存する
          </Button>
        </Form.Frame>
      </div>
    </HorizontalLayout>
  );
};
