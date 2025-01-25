import { z } from "zod";

export const modelFormSchema = z.object({
    id: z.number().optional(),
    brandId: z.number({
        required_error: "La marca es obligatoria.",
        invalid_type_error: "La marca debe ser un número.",
    }).int({
        message: "El id de la marca debe ser un número entero.",
    }).positive({
        message: "El id de la marca debe ser positivo.",
    }),
    description: z.string({
        required_error: "La descripción es obligatoria.",
        invalid_type_error: "La descripción es invalido.",
    }).nonempty("La descripción es obligatoria."),
    status: z.string({
        required_error: "El estado es obligatorio.",
        invalid_type_error: "El estado es invalido.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
});

export type ModelFormSchema = z.infer<typeof modelFormSchema>;