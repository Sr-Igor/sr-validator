import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, values = [], key }: IValidationParams) => {
  if (values.length === 0) {
    throw new Error("Enum validation requires at least one value");
  }

  return z.enum(values as [string, ...string[]], {
    required_error: e.required(name || key),
    invalid_type_error: e.enum(name || key, values),
  });
};
