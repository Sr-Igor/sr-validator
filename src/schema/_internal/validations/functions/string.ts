import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, max, min, format, key }: IValidationParams) => {
  let schema = z.string({
    required_error: e.required(name || key),
    invalid_type_error: e.string(name || key),
  });

  if (min !== undefined) {
    schema = schema.min(min, {
      message: e.length(name || key, min),
    });
  }

  if (max !== undefined) {
    schema = schema.max(max, {
      message: e.length(name || key, max),
    });
  }

  return schema.transform((value) => {
    if (format === "upper") return value.toUpperCase();
    if (format === "lower") return value.toLowerCase();
    return value;
  });
};
