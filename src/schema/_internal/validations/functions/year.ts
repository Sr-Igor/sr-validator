import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name }: IValidationParams) => {
  const currentYear = new Date().getFullYear() + 1;

  return z.preprocess(
    (a) => a && Number(a),
    z
      .number({
        required_error: e.required(name),
        invalid_type_error: e.number(name),
      })
      .int({
        message: e.int(name),
      })
      .positive({
        message: e.positive(name),
      })
      .min(999, {
        message: e.coordinates(name),
      })
      .max(currentYear, {
        message: e.max(name, currentYear),
      })
  );
};
