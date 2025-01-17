import { e } from "../handlers/messages";
import { RefineRelation } from "./types";

export default function ({ keys, ctx, cont }: RefineRelation) {
  const keyDetails = keys.map(({ key, name }) => ({
    key,
    name: name || key,
    value: cont?.[key],
  }));

  const definedKeys = keyDetails.filter(({ value }, idx) =>
    !idx ? true : value
  );

  if (definedKeys.length > 1) {
    const firstKey = definedKeys[0];
    const otherKeys = definedKeys.slice(1);

    otherKeys.forEach(({ key, name, value }) => {
      if (firstKey.value <= value) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: e.notGreater(firstKey.name, name),
        });
      }
    });
  }
}
