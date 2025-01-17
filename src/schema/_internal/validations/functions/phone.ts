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
    .refine(
      (phone) => {
        const cellRegex = /^(\+?\d{11,14})?$/;
        const residentialRegex = /^(\+?\d{10,13})?$/;

        const testCell = cellRegex.test(phone);
        const testResidential = residentialRegex.test(phone);

        if (!testCell && !testResidential) return false;
        return true;
      },
      { message: e.phone(name || key) }
    )
    .transform((phone) => phone.replace(/\D/g, ""));
};
