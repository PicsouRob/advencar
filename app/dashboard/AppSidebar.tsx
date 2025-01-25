"use client";

import Link from "next/link";

import Logo from "@/components/common/Logo";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import { sidebarData } from "@/utils/sidebarData";
import UserDropdown from "@/components/UserDropdown";
import UserInfo from "@/components/UserInfo";
import { useUserSession } from "@/hooks/useUserSession";
import { usePathname } from "next/navigation";

const AppSidebar: React.FC = () => {
    const { session } = useUserSession();
    const pathname = usePathname();

    return (
        <Sidebar className="pl-2">
            <SidebarHeader className="pt-4">
                <Logo />
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarData.map((item) => (
                                <SidebarMenuItem key={item.name}
                                    className={`${pathname === item.href && "bg-[#0b3948]/20 rounded text-[#0b3948]"} app-transition`}
                                >
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href}
                                            className="hover:bg-[#0b3948]/20 rounded hover:text-[#0b3948]"
                                        >
                                            <item.icon className="mr-2 size-8" />

                                            <span className="text-[15px] font-medium">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdown
                            session={session}
                        >
                            <UserInfo name={session?.user?.name || ""}
                                email={session?.user?.email || ""}
                            />
                        </UserDropdown>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;