import { getServerSession } from "next-auth";
import { Menu } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserDropdown from "@/components/UserDropdown";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await getServerSession(authOptions);

  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster />

      <main className="p-6 w-full space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-bold text-xl">{session?.user?.name}</h1>

            <p className="">{session?.user?.role === "ADMIN" ? "Administrador" : "Asistente"}</p>
          </div>

          <div className="flex items-center gap-4">
            <UserDropdown
              session={session}
              expendSize
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />

                <AvatarFallback>Admin</AvatarFallback>
              </Avatar>
            </UserDropdown>

            <SidebarTrigger className="md:hidden" size="sm">
              <Menu className="" />
            </SidebarTrigger>
          </div>
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}
