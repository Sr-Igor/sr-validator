//@ts-nocheck

//Utils
import r from "../conditions";

//Types
import { RefinementCtx } from "zod";

export const refinesServer = (cont: any, ctx: RefinementCtx, refines: any) => {
  refines.forEach((item: any) => {
    let act = r[item.type];
    if (!act) throw new Error(`Relação "${item.type}" não encontrada!`);
    act({ keys: item.keys, ctx, cont });
  });
};
