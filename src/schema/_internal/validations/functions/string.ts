import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, max, min, format }: IValidationParams) => {
  let schema = z.string({
    required_error: e.required(name),
    invalid_type_error: e.string(name),
  });

  if (min !== undefined) {
    schema = schema.min(min, {
      message: e.length(name, min),
    });
  }

  if (max !== undefined) {
    schema = schema.max(max, {
      message: e.length(name, max),
    });
  }

  return schema.transform((value) => {
    if (format === "upper") return value.toUpperCase();
    if (format === "lower") return value.toLowerCase();
    return value;
  });
};
