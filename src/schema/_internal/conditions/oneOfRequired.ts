import { e } from "../handlers/messages";
import { RefineRelation } from "./types";

export default function ({ keys, ctx, cont }: RefineRelation) {
  const keyDetails = keys.map(({ key, name }) => ({
    key,
    name: name || key,
    value: cont?.[key],
  }));

  const definedKeys = keyDetails.filter(({ value }) => value);

  if (!definedKeys.length) {
    const names = keyDetails.map(({ name }) => name);
    keyDetails.forEach(({ key }) => {
      ctx.addIssue({
        code: "custom",
        path: [key],
        message: e.oneOfRequired(names),
      });
    });
  }
}
