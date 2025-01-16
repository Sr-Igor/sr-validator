import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, int, positive, max, min }: IValidationParams) => {
  let baseSchema = z.number({
    required_error: e.required(name),
    invalid_type_error: e.number(name),
  });

  if (int) {
    baseSchema = baseSchema.int({
      message: e.int(name),
    });
  }

  if (positive) {
    baseSchema = baseSchema.positive({
      message: e.positive(name),
    });
  }

  if (max !== undefined) {
    baseSchema = baseSchema.max(max, {
      message: e.max(name, max),
    });
  }

  if (min !== undefined) {
    baseSchema = baseSchema.min(min, {
      message: e.min(name, min),
    });
  }

  return z.preprocess(
    (a) => (a !== undefined && a !== null ? Number(a) : a),
    baseSchema
  );
};
