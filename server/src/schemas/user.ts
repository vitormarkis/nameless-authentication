import { z } from "zod"

export const sensitiveInformation = z.object({
  id: z.number({ invalid_type_error: "O id precisa ser um número." }).int().nonnegative(),
  password: z
    .string()
    .min(6, { message: "A senha precisa ter mais que 6 caracteres." })
    .max(16, { message: "A senha não pode ter mais que 16 caracteres." }),
})

export const userSchema = z.object({
  username: z
    .string()
    .min(6, { message: "O username precisa ter mais que 6 caracteres." })
    .max(16, { message: "O username não pode ter mais que 16 caracteres." }),
  name: z
    .string()
    .min(6, { message: "Você precisa colocar nome e sobrenome." })
    .max(50, { message: "Limite de caracteres excedida." })
    .regex(/\s/, { message: "Insira um nome válido." })
    .min(1),
  email: z.string().email(),
})

export const fullUserSchema = userSchema.merge(sensitiveInformation)

export const loginUserSchema = fullUserSchema.pick({
  username: true,
  password: true,
})

export const registerUserSchema = fullUserSchema.pick({
  username: true,
  password: true,
  email: true,
  name: true,
})

export type User = z.infer<typeof userSchema>
export type UserRegister = z.infer<typeof registerUserSchema>
export type UserLogin = z.infer<typeof loginUserSchema>

export const profileDataSchema = z.object({
  cover_picture: z
    .string()
    .max(455, { message: "URL muito extensa." })
    .url({ message: "Insira uma URL válida." }),
  avatar_picture: z
    .string()
    .max(455, { message: "URL muito extensa." })
    .url({ message: "Insira uma URL válida." }),
  city: z.string().email().max(60, { message: "Limite de carateres atingido." }),
})

export const mutableUserDataSchema = userSchema.merge(profileDataSchema).partial()

export type UserMutableData = z.infer<typeof mutableUserDataSchema>
