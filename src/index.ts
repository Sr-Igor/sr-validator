//@ts-nocheck

//Libs
import { z } from "zod";
import schema from "./schema";
import { e } from "./schema/_internal/handlers/messages";
import {
  IValidationParams,
  ICustomValidation,
} from "./schema/_internal/validations/types";
import mocks from "./mocks";

interface IValidator extends IValidationParams {
  method: keyof typeof schema.f;
  nullable?: boolean;
  optional?: boolean;
  coerse?: string;
  column?: string;
  model?: string;
}

interface ICustomValidator extends ICustomValidation {
  nullable?: boolean;
  optional?: boolean;
  coerse?: string;
  column?: string;
  model?: string;
}

type Relation = {
  keys: string[];
  type: keyof typeof schema.conditions;
};

interface IValidatorRequest {
  body?: (IValidator | ICustomValidation)[];
  params?: (IValidator | ICustomValidation)[];
  query?: (IValidator | ICustomValidation)[];
  relations?: {
    query?: Relation[];
    body?: Relation[];
    params?: Relation[];
  };
}

const validator = (data: IValidatorRequest) => async (req, res, next) => {
  try {
    const {
      bodyF,
      paramsF,
      queryF,
      bodyRelation,
      paramsRelation,
      queryRelation,
    } = schema.preFire(data, req);

    //Each Map
    const eachMap = (local) => {
      const objectMapper = {};

      new Promise((resolve) => {
        local?.forEach(async (item) => {
          const funcMethod = schema.f[item.method];
          if (!funcMethod && !item.custom)
            throw new Error(`Método "${item.method}" não encontrado!`);

          let method;
          try {
            method = item.custom || funcMethod(item);
          } catch {
            throw new Error(
              `Ocorreu um erro na função validadora ${item.method}`
            );
          }

          try {
            if (item.optional && item.nullable) {
              objectMapper[item.key] = method.optional().nullable();
            } else if (item.optional) {
              objectMapper[item.key] = method.optional();
            } else if (item.nullable) {
              objectMapper[item.key] = method.nullable();
            } else {
              objectMapper[item.key] = method;
            }

            resolve();
          } catch {
            throw new Error(
              `Ocorreu um erro ao fazer inclusão de parâmetros no método ${item.method}`
            );
          }
        });
      });

      return objectMapper;
    };

    //Params
    const paramsObject = eachMap(paramsF);
    const queryObject = eachMap(queryF);
    const bodyObject = eachMap(bodyF);

    const modifiersValidator = (obj, cont, ctx, refine, local) => {
      const keys = Object.keys(cont);

      keys?.forEach((item) => {
        //@ts-ignore
        const optional = obj[item]?.isOptional();
        //@ts-ignore
        const nullable = obj[item]?.isNullable();

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

      if (local === "query" && cont.select && cont.include) {
        ctx.addIssue({
          code: "custom",
          message: e.reverse(["select", "include"]),
          path: ["select"],
        });

        ctx.addIssue({
          code: "custom",
          message: e.reverse(["select", "include"]),
          path: ["include"],
        });
      }

      //Has x-refine header
      const hasRefine = req.headers["x-refine"] === "true";

      if (!process.env.NODE_ENV?.includes("test") || hasRefine) {
        schema.refinesServer(cont, ctx, refine);
      }
    };

    //Structure the schema
    const body = z
      .object(bodyObject)
      .strict({
        message: schema.e.notAllowed("body"),
      })
      .superRefine((cont, ctx) => {
        modifiersValidator(bodyObject, cont, ctx, bodyRelation, "body");
      });

    const query = z
      .object(queryObject)
      .strict({
        message: schema.e.notAllowed("query"),
      })
      .superRefine((cont, ctx) => {
        modifiersValidator(queryObject, cont, ctx, queryRelation, "query");
      });

    const params = z
      .object(paramsObject)
      .strict({
        message: schema.e.notAllowed("params"),
      })
      .superRefine((cont, ctx) => {
        modifiersValidator(paramsObject, cont, ctx, paramsRelation, "params");
      });

    //@ts-ignore
    if (req?.schema) return { body, query, params };

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

    Object.keys(resolved?.body || []).forEach((item) => {
      const nullable = bodyObject[item].isNullable();

      if (nullable && resolved.body[item] === "") {
        resolved.body[item] = null;
      }
    });

    const select = Object.keys(resolved?.query?.select || {})?.length
      ? resolved?.query?.select
      : undefined;
    const include = Object.keys(resolved?.query?.include || {})?.length
      ? resolved?.query?.include
      : undefined;

    delete resolved.query.select;
    delete resolved.query.include;

    // Set the values
    req.b = {
      ...resolved.body,
      ...(req?.uploads || {}),
    };
    req.q = resolved.query;
    req.p = resolved.params;
    req.select = select;
    req.include = include;

    //Clean the values
    req.body = {};
    req.query = {};
    req.params = {};

    return next();
  } catch (error) {
    const objectError = error?.issues ? schema.handleError(error) : {};
    if (!error.issues) {
      console.error(`[VALIDATOR]: ${error.message}`);
    }

    return res.status(400).send({
      status: 400,
      success: false,
      error: "Estrutura inválida.",
      errors: objectError,
      entity: "Development",
    });
  }
};

export { validator, IValidationParams, IValidatorRequest, mocks };
