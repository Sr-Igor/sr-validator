import { e } from "../handlers/messages";
import { RefineRelation } from "./types";

export default function ({ keys, ctx, cont }: RefineRelation) {
  const keyDetails = keys.map(({ key, name }) => ({
    key,
    name: name || key,
    value: cont?.[key],
  }));

  if (keyDetails.length > 1) {
    const uniqueValues = new Set(keyDetails.map(({ value }) => value));

    if (uniqueValues.size > 1) {
      const names = keyDetails.map(({ name }) => name);

      keyDetails.forEach(({ key }) => {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: e.equal(names),
        });
      });
    }
  }
}
