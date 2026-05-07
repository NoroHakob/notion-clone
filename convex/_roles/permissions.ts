import { Role, isAdmin, isSuperAdmin } from "./getRole";

export function canManageUsers(role: Role | undefined) {
  return isAdmin(role);
}

export function canDeleteTarget(callerRole: Role | undefined, targetRole: Role | undefined) {
  if (isSuperAdmin(callerRole)) return true;
  if (isAdmin(callerRole) && isSuperAdmin(targetRole)) return false;
  return isAdmin(callerRole);
}