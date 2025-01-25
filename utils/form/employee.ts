import { z } from "zod";
import { isValidDocumentId } from "../validateDocument";

export const employeeFormSchema = z.object({
    id: z.number().optional(),
    name: z.string({
        required_error: "El nombre es obligatorio.",
    }).nonempty("El nombre es obligatorio."),
    email: z.string({
        required_error: "El email es obligatorio.",
    })
        .nonempty("El email es obligatorio.")
        .email("El email es incorrecto."),
    password: z.string({
        required_error: "La contraseña es obligatoria.",
    })
        .nonempty("La contraseña es obligatoria.")
        .min(8, { message: "La contraseña debe ser por lo menos de 8 caracteres." }),
    documentId: z.string({
        required_error: "El documento es obligatorio.",
        invalid_type_error: "El documento debe ser cadena numérica.",
    })
        .nonempty("El documento es obligatorio.")
        .length(11, { message: "El documento debe ser de 12 dígitos." })
        .refine((value) => isValidDocumentId(value), {
            message: "El documento proporcionado no es válido. Verifica que los dígitos sean correctos y cumplan con el formato.",
        }),
    workShift: z.string({
        required_error: "El trabajo es obligatorio.",
    }).nonempty("El trabajo es obligatorio."),
    commissionPct: z.number({
        required_error: "La comisión es obligatoria.",
        // invalid_type_error: "La comisión es invalido.",
    })
        .positive({ message: "La comisión debe ser positivo." }),
    hireDate: z.coerce.date({
        required_error: "La fecha de contratación es obligatoria.",
        invalid_type_error: "La fecha de contratación es invalido.",
    }),
    status: z.string({
        required_error: "El estado es obligatorio.",
    }).nonempty("El estado es obligatorio.").default("Activo"),
    role: z.string({
        required_error: "El rol es obligatorio.",
    }).nonempty("El rol es obligatorio.").default("ASSISTANT"),
});

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;