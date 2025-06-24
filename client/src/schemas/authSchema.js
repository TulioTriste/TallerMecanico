import {z} from "zod";

export const loginSchema = z.object({
  correo: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().optional(),
}).refine((data) => data.rememberMe === true || data.rememberMe === false, {});

export const registerSchema = z
  .object({
    rut: z.string({
      message: "Rut is required",
    }),
    nombre: z.string({
      message: "Name is required",
    }),
    apellido: z.string({
      message: "Name is required",
    }),
    correo: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    direccion: z.string({
      message: "Address is required",
    }),
    telefono: z.string({
      message: "Phone number is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmNewPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
});