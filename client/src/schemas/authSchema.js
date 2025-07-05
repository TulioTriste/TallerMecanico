import {z} from "zod";

const passwordRules = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
  .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
  .regex(/[0-9]/, { message: "Debe contener al menos un número" })
  .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un carácter especial" });

export const loginSchema = z.object({
  correo: z.string().email({
    message: "Por favor ingresa un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  rememberMe: z.boolean().optional(),
}).refine((data) => data.rememberMe === true || data.rememberMe === false, {});

export const registerSchema = z
  .object({
    rut: z.string({
      message: "El RUT es obligatorio",
    }),
    nombre: z.string({
      message: "El nombre es obligatorio",
    }),
    apellido: z.string({
      message: "El apellido es obligatorio",
    }),
    correo: z.string().email({
      message: "Por favor ingresa un correo electrónico válido",
    }),
    password: passwordRules,
    confirmPassword: passwordRules,
    direccion: z.string({
      message: "La dirección es obligatoria",
    }),
    telefono: z.string({
      message: "El teléfono es obligatorio",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export const resetPasswordSchema = z.object({
  newPassword: passwordRules,
  confirmNewPassword: passwordRules,
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"],
});