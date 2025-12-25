"use client";

import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Spinner } from "@/components/spinner";

type UserRow = {
  id: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const { user, isLoaded } = useUser();

  const listUsers = useAction(api.users.listUsers);
  const disableUser = useAction(api.users.disableUser);

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
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAdmin, listUsers]);

  if (!isLoaded) return null;

  if (!isAdmin) {
    return <p>You do not have admin access.</p>;
  }

  const handleDisable = async (userId: string) => {
    const ok = confirm("Disable this user?");
    if (!ok) return;

    try {
      await disableUser({ userId });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to disable user");
    }
  };

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {loading && <Spinner size="lg" />}

      {!loading && users.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center border rounded px-4 py-2"
            >
              <div>
                <div className="font-medium">{u.email}</div>
                <div className="text-sm text-muted-foreground">
                  {u.role}
                </div>
              </div>

              <button
                onClick={() => handleDisable(u.id)}
                className="text-red-600 hover:underline"
              >
                Disable
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
