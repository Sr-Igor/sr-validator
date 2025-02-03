import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, key }: IValidationParams) => {
  return z.preprocess(
    (value) => {
      if (Array.isArray(value)) return value;
      else if (typeof value === "string") return value?.split(",");
      return value;
    },
    z.array(
      z.string({
        required_error: e.required(name || key),
        invalid_type_error: e.string(name || key),
      }),
      {
        message: e.array(name || key),
      }
    )
  );
};
