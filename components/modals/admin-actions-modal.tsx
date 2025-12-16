"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

type Role = "superAdmin" | "admin-2" | "admin-3" | "user";

export const AdminActionsModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  if (type !== "adminActions") return null;

  const role = data?.role as Role;

  const goTo = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-4">
          {role === "superAdmin" && (
            <Button onClick={() => goTo("/admin/admins")}>
              List Admins
            </Button>
          )}

          {(role === "superAdmin" ||
            role === "admin-2" ||
            role === "admin-3") && (
            <Button onClick={() => goTo("/admin/users")}>
              List Users
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
