import { z } from "zod";

export const vehicleTypeFormSchema = z.object({
    id: z.number().optional(),
    description: z.string({
        required_error: "La descripción es obligatoria.",
        invalid_type_error: "La descripción debe ser una cadena.",
    }).nonempty("La descripción es obligatoria."),
    status: z.string({
        required_error: "El estado es obligatorio.",
        invalid_type_error: "El estado debe ser una cadena.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
});

export type VehicleTypeFormSchema = z.infer<typeof vehicleTypeFormSchema>;