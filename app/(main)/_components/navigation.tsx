"use client";

import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  PlusIcon,
  Search,
  Settings,
  Trash,
  Shield
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { useModal } from "@/hooks/use-modal-store";

import { UserItem } from "./user-item";
import { Item } from "./item";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";

export const Navigation = () => {
  const settings = useSettings();
  const search = useSearch();
  const { onOpen } = useModal();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const { user, isLoaded } = useUser();

  const role = user?.publicMetadata?.role as string | undefined;
  const isAdmin =
    typeof role === "string" &&
    (role === "superAdmin" || role.startsWith("admin"));

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const resetWidth = () => {
    if (!sidebarRef.current || !navbarRef.current) return;
    setIsCollapsed(false);
    sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    navbarRef.current.style.left = isMobile ? "100%" : "240px";
    navbarRef.current.style.width = isMobile
      ? "0"
      : "calc(100% - 240px)";
  };

  const collapse = () => {
    if (!sidebarRef.current || !navbarRef.current) return;
    setIsCollapsed(true);
    sidebarRef.current.style.width = "0";
    navbarRef.current.style.left = "0";
    navbarRef.current.style.width = "100%";
  };

  if (!isLoaded) return null;

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col"
        )}
      >
        <UserItem />

        <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
        <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
        <Item label="New page" icon={PlusCircle} onClick={handleCreate} />

        {isAdmin && (
          <Item
            label="Admin actions"
            icon={Shield}
            onClick={() => onOpen("adminActions", { role })}
          />
        )}

        <DocumentList />
        <Item icon={PlusIcon} label="Add a Page" onClick={handleCreate} />

        <Popover>
          <PopoverTrigger className="w-full mt-4">
            <Item label="Trash" icon={Trash} />
          </PopoverTrigger>
          <PopoverContent className="p-0 w-72">
            <TrashBox />
          </PopoverContent>
        </Popover>
      </aside>

      <div ref={navbarRef} className="absolute top-0 left-60 w-[calc(100%-240px)]">
        <nav className="px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 cursor-pointer"
            />
          )}
        </nav>
      </div>
    </>
  );
};
