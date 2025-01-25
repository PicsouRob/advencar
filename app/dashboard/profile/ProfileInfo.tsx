"use client";

import { signOut } from "next-auth/react";

import ConfirmModal from "@/components/common/ConfirmModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileInfoProps = {
    isCurrentLoggedInUser: boolean;
    name: string;
    email: string;
    role: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ isCurrentLoggedInUser, name, email, role }) => {
    return (
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 md:items-center md:justify-between">
            <div className="flex items-center gap-x-4">
                <Avatar className="rounded size-16">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                    />

                    <AvatarFallback>US</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <h1 className="font-semibold">{name}</h1>
                    <p className="text-sm text-muted-foreground">{email}</p>
                    <p className="text-sm text-muted-foreground">{role === "ADMIN" ? "Administrador" : "Asistente"}</p>
                </div>
            </div>

            {isCurrentLoggedInUser && (
                <ConfirmModal
                    title="Cerrar sesión"
                    description="¿Estás seguro de que deseas cerrar sesión?"
                    onConfirm={async () => {
                        await signOut();

                        localStorage.removeItem("token");
                    }}
                >
                    <Button
                        variant="outline"
                        className="bg-red-50 max-w-min text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                        Cerrar Sesión
                    </Button>
                </ConfirmModal>
            )}
        </div>
    );
}

export default ProfileInfo;