import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, key }: IValidationParams) => {
  const currentYear = new Date().getFullYear() + 1;

  return z.preprocess(
    (a) => a && Number(a),
    z
      .number({
        required_error: e.required(name || key),
        invalid_type_error: e.number(name || key),
      })
      .int({
        message: e.int(name || key),
      })
      .positive({
        message: e.positive(name || key),
      })
      .min(999, {
        message: e.coordinates(name || key),
      })
      .max(currentYear, {
        message: e.max(name || key, currentYear),
      })
  );
};
