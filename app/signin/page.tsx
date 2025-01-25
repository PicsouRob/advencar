/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/common/Logo";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useToast } from "@/hooks/use-toast";
import { formSchema, SigninFormSchema } from "@/utils/form/signin";
import { UserSessionProps, useUserSession } from "@/hooks/useUserSession";

const SignIn: React.FC = () => {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const { toast } = useToast();
    const { isAuthenticated }: UserSessionProps = useUserSession();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const form = useForm<SigninFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "", password: ""
        },
    });

    const onSubmit = async (values: SigninFormSchema) => {
        try {
            setError("");
            
            const { email, password } = values;
            const response = await signIn("credentials", {
                email, password, redirect: false
            });

            if (response?.ok && response.status === 200) {                
                toast({
                    title: "Conección",
                    description: "Te has conectado con éxito.",
                    duration: 3000,
                });

                const session: any = await getSession();
                localStorage.setItem("token", session?.user?.accessToken as string);
                router.push("/");
            } else {
                setError(`${response?.error}`);
            }
        } catch (error) {
            setError((error as Error).message);
        } 
    }

    return (
        <div className="grid place-items-center h-screen px-4 md:px-0">
            <div className="space-y-4 mx-auto md:border md:rounded-md md:py-6 md:px-10">

                <div className="text-center flex flex-col gap-2 items-center justify-center">
                    <Logo />

                    <h1 className="font-bold text-2xl">Bienvenido</h1>

                    <p className="max-w-[400px]">
                        Inicia sesión para manejar tus alquileres y ver tus estadísticas.
                    </p>
                </div>

                {error && <ErrorMessage error={error} />}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input autoComplete='additional-name' type="text" placeholder="ex: johndoe@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Tu contraseña" {...field} />
                                    </FormControl>
                                    <FormMessage />

                                    {/* <div className="pb-5 text-sm">
                                        <Link href="/forgot-password"
                                            className="text-primary hover:underline app-transition float-right"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div> */}
                                </FormItem>
                            )}
                        />
                        
                        <Button
                            disabled={form.formState.isSubmitting}
                            className="text-white font-semibold w-full flex items-center gap-2 mt-4"
                            type="submit"
                        >
                            {form.formState.isSubmitting && <div className="size-4 rounded-full border-y border-l animate-spin" />}

                            <span className="">
                                {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                            </span>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;