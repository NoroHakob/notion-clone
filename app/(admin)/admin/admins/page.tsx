"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/spinner";

type AdminUser = {
  id: string;
  email: string;
  role: string;
};

export default function AdminsPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const listAdmins = useAction(api.users.listAdmins);
  const disableUser = useAction(api.users.disableUser);

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const role = user?.publicMetadata?.role as string | undefined;
  const isSuperAdmin = role === "superAdmin";

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSuperAdmin) {
      router.replace("/documents");
      return;
    }

    listAdmins()
      .then((res) => setAdmins(res as AdminUser[]))
      .finally(() => setLoading(false));
  }, [isLoaded, isSuperAdmin, listAdmins, router]);

  const handleDisable = async (userId: string) => {
    const ok = confirm("Disable this admin?");
    if (!ok) return;

    await disableUser({ userId });

    setAdmins((prev) => prev.filter((a) => a.id !== userId));
  };

  if (!isLoaded || loading) {
    return <Spinner size="lg"/>;
  }

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Admins</h1>

      {admins.length === 0 && <p>No admins found.</p>}

      <ul className="space-y-3">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="flex justify-between items-center border rounded px-4 py-2"
          >
            <div>
              <div className="font-medium">{admin.email}</div>
              <div className="text-sm text-muted-foreground">
                {admin.role}
              </div>
            </div>

            {/* ❗ superAdmin-ը ինքն իրեն disable անել չի կարող */}
            {admin.role !== "superAdmin" && (
              <button
                onClick={() => handleDisable(admin.id)}
                className="text-red-600 hover:underline"
              >
                Disable
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
