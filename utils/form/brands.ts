import { z } from "zod";

export const brandFormSchema = z.object({
    id: z.number().optional(),
    description: z.string({
        required_error: "La descripción es obligatoria.",
    }).min(1, { message: "La descripción es obligatoria." }),
    status: z.string({
        required_error: "El estado es obligatorio.",
    }).min(1, { message: "El estado es obligatorio." }).default("Disponible"),
});

export type BrandFormSchema = z.infer<typeof brandFormSchema>;