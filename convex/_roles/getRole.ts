export type Role = string;

export function getRole(identity: any): Role {
  return (
    identity?.publicMetadata?.role ??   // ✅ camelCase — correct Convex path
    identity?.public_metadata?.role ??  // snake_case fallback
    "user"
  );
}

export function isAdmin(role: Role) {
  return role === "superAdmin" || role.startsWith("admin");
}

export function isSuperAdmin(role: Role) {
  return role === "superAdmin";
}