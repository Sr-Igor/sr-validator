import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name }: IValidationParams) => {
  return z
    .string({
      required_error: e.required(name),
      invalid_type_error: e.string(name),
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message: e.password(name),
    });
};
