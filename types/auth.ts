import { Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface CustomUser extends NextAuthUser {
    accessToken: string;
    message: string;
}

export type Credentials = {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    accessToken: string;
}

export interface JwtToken {
    access_token?: string;
    sub?: string;
    id?: string;
}

export type UserSession = {
    session: Session; token: JWT
}

export interface UserSessionApp {
    name: string;
    email: string;
    role: string;
    sub: string;
    accessToken: string;
    exp: number;
    iat: number;
    jti: string;
}