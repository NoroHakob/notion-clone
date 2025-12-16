"use client";

import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

type UserRow = {
  id: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const { user, isLoaded } = useUser();
  const listUsers = useAction(api.users.listUsers);

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const role = user?.publicMetadata?.role as string | undefined;
  const isAdmin =
    typeof role === "string" &&
    (role === "superAdmin" || role.startsWith("admin"));

  useEffect(() => {
    if (!isAdmin) return;

    listUsers()
      .then((res) => setUsers(res as UserRow[]))
      .finally(() => setLoading(false));
  }, [isAdmin, listUsers]);

  if (!isLoaded) return null;
  if (!isAdmin) return <p>You do not have admin access.</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Users</h1>
      {loading && <p>Loading...</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}
      {users.map((u) => (
        <div key={u.id}>{u.email}</div>
      ))}
    </div>
  );
}
