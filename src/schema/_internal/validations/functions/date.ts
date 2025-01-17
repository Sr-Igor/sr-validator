import { z } from "zod";
import { e } from "../../handlers/messages";
import { addDays, format } from "date-fns";

//Types
import { IValidationParams } from "../types";

export default ({ name, today, key }: IValidationParams) => {
  const day = new Date(addDays(new Date(), -1));

  let schema = z.coerce.date({
    coerce: true,
    required_error: e.required(name || key),
    invalid_type_error: e.date(name || key),
  });

  if (today) {
    schema = schema.min(day, {
      message: e.min(name || key, format(day, "yyyy-MM-dd")),
    });
  }

  return schema.transform((date) => new Date(date));
};
