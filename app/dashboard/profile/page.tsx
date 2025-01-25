import Image from "next/image";
import { getServerSession } from "next-auth";

import { Separator } from "@/components/ui/separator";
import { prisma } from "@/libs/prisma.config";
import { formatDate } from "@/utils/date";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProfileInfo from "./ProfileInfo";

type profileProps = {
    searchParams: Promise<{
        id: string;
    }>
}

const Profile: React.FC<profileProps> = async ({ searchParams }) => {
    const id = (await searchParams).id;

    if(!id) {
        return <div>Error: no se proporcionó el id del usuario</div>;
    }

    // Employee without password
    const user = await prisma.employee.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            name: true, documentId: true, workShift: true,
            commissionPct: true, hireDate: true, status: true,
            role: true, email: true, 
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await getServerSession(authOptions);
    const isCurrentLoggedInUser = session?.user?.sub === id;

    const hireDate: string = formatDate(user!.hireDate.toString());
    const formatedHireDate: string = hireDate.substring(0, 1).toUpperCase() + hireDate.substring(1, hireDate.length)

    if(!user) {
        return <div>No se encontró el usuario</div>;
    }

    return (
        <div className="h-full">
            <div className="bg-white rounded-md shadow">
                <Image width={1000} height={1000}
                    src="/pattern.avif"
                    className="h-[150px] w-full object-cover rounded-t-md"
                    alt="profile pattern"
                />

                <div className="bg-white relative shadow rounded-md p-3 sm:p-6 mx-3 sm:mx-6 -mt-16">
                    <ProfileInfo
                        isCurrentLoggedInUser={isCurrentLoggedInUser}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                    />
                </div>

                <div className="mt-6 grid gap-4 p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Rol:</p>
                        <p className="text-muted-foreground">
                            {user.role === "ADMIN" ? "Administrador" : "Asistente"}
                        </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Id Del Documento:</p>
                        <p className="text-muted-foreground">{user.documentId}</p>
                    </div>

                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Horario de Trabajo:</p>
                        <p className="text-muted-foreground">{user.workShift}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Fecha de Contratación:</p>
                        <p className="text-muted-foreground">{formatedHireDate}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Estado:</p>
                        <p className="text-muted-foreground">{user.status}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <p className="">Comisión (%):</p>
                        <p className="text-muted-foreground">{user.commissionPct}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;