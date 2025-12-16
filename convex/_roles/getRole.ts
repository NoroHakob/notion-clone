export type Role = string;

export function getRole(identity: any): Role {
  return (
    identity?.public_metadata?.role ??
    identity?.token?.public_metadata?.role ??
    "user"
  );
}

export function isAdmin(role: Role) {
  return role === "superAdmin" || role.startsWith("admin");
}

export function isSuperAdmin(role: Role) {
  return role === "superAdmin";
}
