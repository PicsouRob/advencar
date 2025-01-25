import { UserSessionApp } from '@/types/auth';
import { Session } from 'next-auth';
import { useSession } from "next-auth/react";

export type UserSessionProps = {
    session: Session | null;
    isAuthenticated: boolean;
    user: UserSessionApp;
}

export const useUserSession = (): UserSessionProps => {
    const { data: session, status } = useSession();
    const user = session?.user as UserSessionApp;
    const isAuthenticated: boolean = status === "authenticated";

    return { session, isAuthenticated, user } as const;
}