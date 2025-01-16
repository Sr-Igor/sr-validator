//@ts-nocheck

//Libs
import { z } from "zod";
import schema from "./schema";
import { e } from "./schema/_internal/handlers/messages";
import { IValidationParams } from "./schema/_internal/validations/types";

const validator = (data) => async (req, res, next) => {
  try {
    const { bodyF, paramsF, queryF } = schema.preFire(data, req);

    //Each Map
    const eachMap = (local) => {
      const objectMapper = {};

      local?.forEach((item) => {
        const method = schema.f[item.method](item);

        if (item.optional && item.nullable) {
          objectMapper[item.name] = method.optional().nullable();
        } else if (item.optional) {
          objectMapper[item.name] = method.optional();
        } else {
          objectMapper[item.name] = method;
        }
      });

      return objectMapper;
    };

    //Params
    const paramsObject = eachMap(paramsF);
    const queryObject = eachMap(queryF);
    const bodyObject = eachMap(bodyF);

    //Structure the schema
    const body = z
      .object(bodyObject)
      .strict({
        message: schema.e.notAllowed("body"),
      })
      .superRefine((cont, ctx) => {
        const keys = Object.keys(cont);

        keys.forEach((item) => {
          //@ts-ignore
          const optional = bodyObject[item].isOptional();
          //@ts-ignore
          const nullable = bodyObject[item].isNullable();

          if (cont[item] === "" && !nullable) {
            if (optional) {
              ctx.addIssue({
                code: "custom",
                message: e.notEmpty(item),
                path: [item],
              });
            } else {
              ctx.addIssue({
                code: "custom",
                message: e.required(item),
                path: [item],
              });
            }
          }
        });

        schema.refinesBodyServer(cont, ctx, data);
      });

    const query = z.object(queryObject).strict({
      message: schema.e.notAllowed("query"),
    });
    const params = z.object(paramsObject).strict({
      message: schema.e.notAllowed("params"),
    });

    //@ts-ignore
    if (req?.forDoc) return { body, query, params };

    //Schema
    const schemaZod = z.object({
      body,
      query,
      params,
    });

    const resolved = await schemaZod.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    //Check if the nullable values are empty
    Object.keys(resolved.body).forEach((item) => {
      //@ts-ignore
      const nullable = bodyObject[item].isNullable();

      if (nullable && resolved.body[item] === "") {
        resolved.body[item] = null;
      }
    });

    // Set the values
    req.b = resolved.body;
    req.q = resolved.query;
    req.p = resolved.params;

    //Clean the values
    req.body = {};
    req.query = {};
    req.params = {};

    return next();
  } catch (error) {
    const objectError = schema.handleError(error);

    return res.status(400).send({
      status: 400,
      success: false,
      error: "Ocorreu um erro ao validar as informações",
      errors: objectError,
      entity: "Development",
    });
  }
};

export { validator, IValidationParams };
