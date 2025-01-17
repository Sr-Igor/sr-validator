import { RefinementCtx } from "zod";
import { IValidationParams } from "../validations/types";

export type RefineRelation = {
  keys: IValidationParams[];
  ctx: RefinementCtx;
  cont: any;
};
