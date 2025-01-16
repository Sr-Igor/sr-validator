import { z } from "zod";
import { e } from "../../handlers/messages";

//Types
import { IValidationParams } from "../types";

export default ({ name }: IValidationParams) => {
  return z.preprocess(
    (a) => {
      return a && null;
    },
    z.null({
      required_error: e.required(name),
      invalid_type_error: e.null(name),
    }),
    z.null({
      required_error: e.required(name),
      invalid_type_error: e.null(name),
    })
  );
};
