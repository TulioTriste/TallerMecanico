import {z} from "zod";

export const registerSchema = z.object({
  rut: z.string({
    message: "Rut is required",
  }).regex(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/, {
    message: "Rut must be in the format XX.XXX.XXX-K",
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
  direccion: z.string({
    message: "Address is required",
  }),
  telefono: z.string({
    message: "Phone number is required",
  }),
});

export const loginSchema = z.object({
  correo: z.string().email(),
  password: z.string().min(6),
});