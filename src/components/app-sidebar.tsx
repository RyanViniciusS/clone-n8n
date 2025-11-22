"use client";

import { CreditCard, CreditCardIcon, FolderOpen, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Main",
    items: [{ title: "Worflows", icon: FolderOpenIcon, url: "/workflows" }],
  },
  {
    title: "Credentials",
    items: [{ title: "Credentials", icon: KeyIcon, url: "/credentials" }],
  },
  {
    title: "Execiutions",
    items: [{ title: "Execiutions", icon: HistoryIcon, url: "/executions" }],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-2 h-10 px-4">
            <Link href="/" prefetch>
              <Image src="/logo.svg" alt="NodeBase" width={30} height={30} />
              <span className="font-semibold text-lg">NodeBase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} className="p-0 m-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)}
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Upgrade to Pro" className="gap-x-4 h-10 px-4" onClick={() => {}}>
              <StarIcon className="size-4 text-yellow-500" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Billing Portal" className="gap-x-4 h-10 px-4" onClick={() => {}}>
              <CreditCardIcon className="size-4 text-yellow-500" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="gap-x-4 h-10 px-4"
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                });
              }}
            >
              <LogOutIcon className="size-4 text-orange-600-500" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
