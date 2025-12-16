// convex/debug.ts
import { query } from "./_generated/server";

export const listDocs = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});
