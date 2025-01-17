//@ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any */

//Utils
import r from "../conditions";

//Types
import { RefinementCtx } from "zod";

export const refinesServer = (cont: any, ctx: RefinementCtx, refines: any) => {
  // console.log("refines", refines);

  refines.forEach((item: any) => {
    let act = r[item.type];
    if (!act) throw new Error(`Relação "${item.type}" não encontrada!`);
    act({ keys: item.keys, ctx, cont });
  });

  // if (refines?.relations?.reverse) {
  //   for (const item of refines.relations.reverse) {
  //     r.reverse({ item, ctx, data, lang: 'ptBR' });
  //   }
  // }
  // if (refines?.relations?.ref) {
  //   for (const item of refines.relations.ref) {
  //     r.ref({ item, ctx, data, lang: 'ptBR' });
  //   }
  // }
  // if (refines?.relations?.mutual) {
  //   for (const item of refines.relations.mutual) {
  //     r.mutual({ item, ctx, data, lang: 'ptBR' });
  //   }
  // }
};
