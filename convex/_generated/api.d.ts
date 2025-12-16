/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _clerk from "../_clerk.js";
import type * as _roles_getRole from "../_roles/getRole.js";
import type * as _roles_permissions from "../_roles/permissions.js";
import type * as admins from "../admins.js";
import type * as debug from "../debug.js";
import type * as documents from "../documents.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  _clerk: typeof _clerk;
  "_roles/getRole": typeof _roles_getRole;
  "_roles/permissions": typeof _roles_permissions;
  admins: typeof admins;
  debug: typeof debug;
  documents: typeof documents;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
