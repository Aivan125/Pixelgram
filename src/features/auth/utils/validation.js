import { z } from "zod";

export const signUpValidation = z
  .object({
    name: z
      .string()
      .min(4, "El nombre debe tener al menos 4 caracteres")
      .max(50, "El nombre debe tener máximo 50 caracteres"),
    username: z
      .string()
      .min(4, "El nombre debe tener al menos 4 caracteres")
      .max(50, "El nombre debe tener máximo 50 caracteres"),
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const signInValidation = z.object({
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
