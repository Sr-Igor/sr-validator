import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, int, positive, max, min, key }: IValidationParams) => {
  let baseSchema = z.number({
    required_error: e.required(name || key),
    invalid_type_error: e.number(name || key),
  });

  if (int) {
    baseSchema = baseSchema.int({
      message: e.int(name || key),
    });
  }

  if (positive) {
    baseSchema = baseSchema.positive({
      message: e.positive(name || key),
    });
  }

  if (max !== undefined) {
    baseSchema = baseSchema.max(max, {
      message: e.max(name || key, max),
    });
  }

  if (min !== undefined) {
    baseSchema = baseSchema.min(min, {
      message: e.min(name || key, min),
    });
  }

  return z.preprocess(
    (a) => (a !== undefined && a !== null ? Number(a) : a),
    baseSchema
  );
};
