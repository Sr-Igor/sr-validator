import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, key }: IValidationParams) => {
  return z
    .string({
      required_error: e.required(name || key),
      invalid_type_error: e.string(name || key),
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      {
        message: e.password(name || key),
      }
    );
};
