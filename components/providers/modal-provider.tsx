"use client";

import { useState, useEffect } from "react";
import { SettingsModal } from "../modals/settings-modal";
import { AdminActionsModal } from "../modals/admin-actions-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <AdminActionsModal />
    </>
  );
};
