import { Role, isAdmin, isSuperAdmin } from "./getRole";

export function canManageUsers(role: Role) {
  return isAdmin(role);
}

export function canDeleteTarget(callerRole: Role, targetRole: Role) {
  if (isSuperAdmin(callerRole)) return true;
  if (isAdmin(callerRole) && isSuperAdmin(targetRole)) return false;
  return isAdmin(callerRole);
}
