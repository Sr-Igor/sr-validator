import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

function parseBooleanStrings(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === "true") return [key, true];
      if (value === "false") return [key, false];
      return [key, value];
    })
  );
}

export default ({ name, key }: IValidationParams) => {
  return z
    .preprocess((data, ctx) => {
      try {
        let parse = {};
        if (data && typeof data === "object") {
          parse = parseBooleanStrings(data);
        } else {
          parse = data ? JSON.parse(data as any) : undefined;
        }

        return parse;
      } catch {
        ctx.addIssue({
          code: "custom",
          message: e.object(name || key),
        });
      }
    }, z.any())
    .optional();
};
