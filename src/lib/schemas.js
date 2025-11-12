import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z.string().min(2, "Debe tener al menos 2 caracteres"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const registerSchema = z.object({
  userName: z.string().min(2, "El usuario debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(8, "Confirma la contraseña"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const createBoardSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});

export const createTaskSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "La fecha es requerida"), // El input 'datetime-local' da string
  columnId: z.coerce.number().min(1, "Columna requerida"),
  assignedUserId: z.coerce.number().min(1, "Usuario requerido"),
});