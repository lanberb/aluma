import assert from "node:assert";
import test from "node:test";
import {
  type ImportMapComposition,
  createImportMapComposition,
} from "./importMap";

const sampleValue = [
  { name: "子1", type: "FRAME" },
  { name: "子2", type: "FRAME" },
  { name: "子3", type: "FRAME" },
  {
    name: "/子4",
    type: "FRAME",
    children: [
      {
        name: "孫1",
        type: "FRAME",
      },
      {
        name: "/孫2",
        type: "FRAME",
        children: [
          {
            name: "曽孫1",
            type: "FRAME",
          },
          {
            name: "曽孫2",
            type: "FRAME",
          },
        ],
      },
    ],
  },
  { name: "子5", type: "FRAME" },
  {
    name: "/子6",
    type: "FRAME",
    children: [
      {
        name: "孫1",
        type: "FRAME",
      },
    ],
  },
  { name: "子7", type: "FRAME" },
] as unknown as SceneNode[];

test("#importMap", (t) => {
  t.test("createImportMapCompostion", () => {
    const expectValue: ImportMapComposition = [
      [{ type: "text", text: "sample" }],
      [{ type: "junction" }, { type: "text", text: "子1" }],
      [{ type: "junction" }, { type: "text", text: "子2" }],
      [{ type: "junction" }, { type: "text", text: "子3" }],
      [{ type: "junction" }, { type: "text", text: "子4" }],
      [
        { type: "vertical" },
        { type: "junction" },
        { type: "text", text: "孫1" },
      ],
      [{ type: "vertical" }, { type: "corner" }, { type: "text", text: "孫2" }],
      [
        { type: "vertical" },
        { type: "space" },
        { type: "junction" },
        { type: "text", text: "曽孫1" },
      ],
      [
        { type: "vertical" },
        { type: "space" },
        { type: "corner" },
        { type: "text", text: "曽孫2" },
      ],
      [{ type: "junction" }, { type: "text", text: "子5" }],
      [{ type: "junction" }, { type: "text", text: "子6" }],
      [{ type: "vertical" }, { type: "corner" }, { type: "text", text: "孫1" }],
      [{ type: "corner" }, { type: "text", text: "子7" }],
    ];
    assert.strictEqual(
      createImportMapComposition(sampleValue, "sample"),
      expectValue,
    );
  });
});
