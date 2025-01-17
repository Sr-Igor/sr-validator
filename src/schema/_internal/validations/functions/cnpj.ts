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
      (value) => {
        if (!value.toString()) return true;

        const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!regex.test(value)) return false;

        const cnpj = value.replace(/\D/g, "");
        if (cnpj === "00000000000000") return false;

        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        const digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;

        for (let i = size; i >= 1; i--) {
          sum += parseInt(numbers.charAt(size - i)) * pos--;
          if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) return false;

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;

        for (let i = size; i >= 1; i--) {
          sum += parseInt(numbers.charAt(size - i)) * pos--;
          if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
      },

      { message: e.cnpj(name || key) }
    );
};
