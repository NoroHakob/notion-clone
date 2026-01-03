"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const AdminActionsModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  if (type !== "adminActions") return null;

  const isAdmin = data?.isAdmin === true;
  const isSuperAdmin = data?.isSuperAdmin === true;

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
          {isSuperAdmin && (
            <Button onClick={() => goTo("/admin/admins")}>
              List Admins
            </Button>
          )}

          {isAdmin && (
            <Button onClick={() => goTo("/admin/users")}>
              List Users
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
