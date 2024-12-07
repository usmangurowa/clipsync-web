"use client";
import {
  Calendar,
  LogOutIcon,
  MoonIcon,
  Settings,
  SunIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./brand";
import Link from "next/link";
import { useTheme } from "next-themes";
import { logout } from "@/actions/auth";

// Menu items.
const items = [
  {
    title: "Clipboard",
    url: "/clipboard",
    icon: () => <Logo />,
  },

  {
    title: "Notifications",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "/clipboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Clip Sync</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem onClick={toggleTheme} className="cursor-pointer">
                <SidebarMenuButton>
                  {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                  <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem onClick={() => logout()} className="cursor-pointer">
            <SidebarMenuButton>
              <LogOutIcon />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
