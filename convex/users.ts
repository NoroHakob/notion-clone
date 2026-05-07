import { action } from "./_generated/server";
import { v } from "convex/values";
import { clerk } from "./_clerk";
import { getRole, Role, isAdmin, isSuperAdmin } from "./_roles/getRole";
import { canManageUsers, canDeleteTarget } from "./_roles/permissions";

export const listUsers = action({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("=== IDENTITY FULL ===", JSON.stringify(identity, null, 2));
    console.log("=== publicMetadata ===", identity?.publicMetadata);
    console.log("=== public_metadata ===", (identity as any)?.public_metadata);
    if (!identity) throw new Error("Unauthenticated");

    const role = getRole(identity);
    if (!canManageUsers(role)) throw new Error("Forbidden");

    const users = await clerk.users.getUserList({ limit: 100 });

    return users.data
      .filter((u) => {
        const r = u.publicMetadata?.role as Role | undefined;
        const status = u.publicMetadata?.status;
        return (!r || r === "user") && status !== "disabled"; // ✅ fixed
      })
      .map((u) => ({
        id: u.id,
        email: u.primaryEmailAddress?.emailAddress ?? "",
        role: "user",
      }));
  },
});

export const listAdmins = action({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const role = getRole(identity);
    if (!isSuperAdmin(role)) throw new Error("Forbidden");

    const users = await clerk.users.getUserList({ limit: 100 });

    return users.data
      .filter((u) => {
        const r = u.publicMetadata?.role as Role;
        const status = u.publicMetadata?.status;

        return (
          status !== "disabled" &&
          (isSuperAdmin(r) || isAdmin(r))
        );
      })
      .map((u) => ({
        id: u.id,
        email: u.primaryEmailAddress?.emailAddress ?? "",
        role: (u.publicMetadata?.role as Role) ?? "user",
      }));
  },
});

export const disableUser = action({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const callerRole = getRole(identity);
    if (!canManageUsers(callerRole)) throw new Error("Forbidden");

    const targetUser = await clerk.users.getUser(userId);
    const targetRole =
      (targetUser.publicMetadata?.role as Role) ?? "user";

    if (!canDeleteTarget(callerRole, targetRole)) {
      throw new Error("Forbidden");
    }

    await clerk.users.updateUser(userId, {
      publicMetadata: {
        ...targetUser.publicMetadata,
        status: "disabled",
      },
    });

    return { ok: true };
  },
});
