import { z } from "zod";

export const formSchema = z.object({
    email: z.string({
        required_error: "Email is required."
    }).email({
        message: "Email is incorrect."
    }),
    password: z.string({
        required_error: "Password is required."
    }).min(8, {
        message: "Password must have at least 8 characteres."
    })
});

export type SigninFormSchema = z.infer<typeof formSchema>;