export type Role = string;

export function getRole(identity: any): Role {
  return (
    identity?.publicMetadata?.role ??
    identity?.public_metadata?.role ??
    "user"
  );
}

export function isAdmin(role: Role | undefined): boolean {
  if (!role) return false;
  return role === "superAdmin" || role.startsWith("admin");
}

export function isSuperAdmin(role: Role | undefined): boolean {
  if (!role) return false;
  return role === "superAdmin";
}