import { z } from "zod";
import { e } from "../../handlers/messages";
import { addDays, format } from "date-fns";

//Types
import { IValidationParams } from "../types";

export default ({ name, today }: IValidationParams) => {
  const day = new Date(addDays(new Date(), -1));

  let schema = z.coerce.date({
    coerce: true,
    required_error: e.required(name),
    invalid_type_error: e.date(name),
  });

  if (today) {
    schema = schema.min(day, {
      message: e.min(name, format(day, "yyyy-MM-dd")),
    });
  }

  return schema.transform((date) => new Date(date));
};
