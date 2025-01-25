"use client";

import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ConfirmModal from "@/components/common/ConfirmModal";
import { SidebarMenuButton } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import UserInfo from "./UserInfo";
import { useRouter } from "next/navigation";

interface UserDropdownProps { 
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any;
    expendSize?: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
    children, session, expendSize = false
}) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="p-2 h-full">
                    {children}
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                className={`${expendSize ? "min-w-[300px] mr-6" : "w-[--radix-popper-anchor-width]"} space-y-1`}
            >
                <div className="flex items-center gap-2 p-2">
                    <UserInfo name={session?.user?.name || ""}
                        email={session?.user?.email || ""}
                    />
                </div>

                <Separator />

                <DropdownMenuItem className="py-2 cursor-pointer"
                    onClick={() => router.push(`/dashboard/profile?id=${session?.user?.sub}`)}
                >
                    <div className="flex items-center gap-1 text-sm">
                        <User className="mr-2 size-5" />

                        <span className="">Account</span>
                    </div>
                </DropdownMenuItem>

                <ConfirmModal title="Cerrar sesión"
                    description="¿Estás seguro de que deseas cerrar sesión?"
                    onConfirm={async() => {
                        await signOut();

                        localStorage.removeItem("token");
                    }}
                >
                    <div
                        className="py-2 cursor-pointer flex items-center gap-2 px-3 hover:bg-gray-100 text-sm rounded app-transition"
                    >
                        <LogOut className="mr-2 size-5" />

                        <span className="">Sign Out</span>
                    </div>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdown