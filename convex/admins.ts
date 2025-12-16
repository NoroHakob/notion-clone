// convex/admins.ts

import { query } from "./_generated/server";
import { getRole, isSuperAdmin } from "./_roles/getRole";

export const isSuperAdminQuery = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const role = getRole(identity);
    return isSuperAdmin(role);
  },
});
