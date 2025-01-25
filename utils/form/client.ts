import { z } from "zod";

import { isValidCreditCard, isValidDocumentId } from "../validateDocument";

export const clientFormSchema = z.object({
    id: z.number().optional(),
    name: z.string({
        required_error: "El nombre es obligatorio.",
        invalid_type_error: "El nombre debe ser una cadena de texto.",
    }).nonempty({ message: "El nombre es obligatorio." }),
    documentId: z.string({
        required_error: "El documento es obligatorio.",
        invalid_type_error: "El documento debe ser cadena numérica.",
    })
        .nonempty({ message: "El documento es obligatorio." })
        .length(11, { message: "El documento debe ser de 11 dígitos." })
        .refine((value) => isValidDocumentId(value), {
            message: "El documento proporcionado no es válido. Verifica que los dígitos sean correctos y cumplan con el formato.",
        }),
    creditCard: z.string({
        required_error: "El número de tarjeta de crédito es obligatorio.",
        invalid_type_error: "El número de tarjeta de crédito debe ser una cadena numérica.",
    })
        .nonempty({ message: "El número de tarjeta de crédito es obligatorio." })
        .min(13, { message: "El número de tarjeta deber tener al menos 13 dígitos." })
        .max(19, { message: "El número de tarjeta deber tener un máximo de 19 dígitos." })
        .refine((value) => isValidCreditCard(value), {
            message: "El número de tarjeta de crédito proporcionado no es válido. Verifica que los dígitos sean correctos.",
        }),
    creditLimit: z.number({
        required_error: "Limite de Crédito es obligatorio.",
        invalid_type_error: "El limite de crédito debe ser un número.",
    })
        .int({ message: "El limite de crédito debe ser un número entero." })
        .positive({ message: "El limite de crédito debe ser positivo." }),
    personType: z.string({
        required_error: "Tipo de persona es obligatorio.",
        invalid_type_error: "El tipo de persona debe ser una cadena de texto.",
    }).nonempty({ message: "Tipo de persona es obligatorio." }).default("Física"),
    status: z.string({
        required_error: "El estado es obligatorio.",
        invalid_type_error: "El estado debe ser una cadena de texto.",
    }).nonempty({ message: "El estado es obligatorio." }).default("Activo"),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;
