import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, key }: IValidationParams) => {
  return z.preprocess(
    (a) => {
      if (a && typeof a === "string") {
        if (a.toLowerCase() === "true" || a.toLowerCase() === "1") {
          return true;
        } else if (a.toLowerCase() === "false" || a.toLowerCase() === "0") {
          return false;
        } else {
          return a;
        }
      } else {
        return a;
      }
    },
    z.boolean({
      required_error: e.required(name || key),
      invalid_type_error: e.boolean(name || key),
    })
  );
};
