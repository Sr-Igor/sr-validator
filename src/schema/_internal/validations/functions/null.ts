import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name, key }: IValidationParams) => {
  return z.preprocess(
    (a) => {
      return a && null;
    },
    z.null({
      required_error: e.required(name || key),
      invalid_type_error: e.null(name || key),
    }),
    z.null({
      required_error: e.required(name || key),
      invalid_type_error: e.null(name || key),
    })
  );
};
