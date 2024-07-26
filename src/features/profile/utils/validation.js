import { z } from "zod";

export const editProfileValidation = z.object({
  name: z
    .string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(50, "El nombre debe tener máximo 50 caracteres")
    .optional(),
  bio: z
    .string()
    .max(160, {
      message: "La bio no puede tener más de 160 caracteres.",
    })
    .optional(),
  avatar: z.union([
    z
      .string()
      .url({ message: "Debe ser una URL válida" })
      .refine(
        (url) =>
          url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null ||
          url.startsWith("https://cloud.appwrite.io/v1"),
        {
          message:
            "La URL debe ser de una imagen válida o un avatar de Appwrite",
        },
      ),
    z
      .any()
      .refine(
        (file) =>
          file instanceof Object &&
          "name" in file &&
          "size" in file &&
          "type" in file &&
          file.type.startsWith("image/"),
        { message: "El archivo debe ser una imagen válida" },
      ),
  ]),
});
