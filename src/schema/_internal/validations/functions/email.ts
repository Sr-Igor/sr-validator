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
    .refine(
      (value) => {
        if (!value.toString()) return true;
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(value);
      },
      {
        message: e.email(name),
      }
    )
    .transform((email) => email.toLowerCase());
};
