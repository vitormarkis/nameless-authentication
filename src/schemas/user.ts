import { z } from "zod"

export const userSchema = z.object({
  username: z
    .string()
    .min(6, { message: "O username precisa ter mais que 6 caracteres." })
    .max(16, { message: "O username não pode ter mais que 16 caracteres." }),
  password: z
    .string()
    .min(6, { message: "A senha precisa ter mais que 6 caracteres." })
    .max(16, { message: "A senha não pode ter mais que 16 caracteres." }),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof userSchema>
export const registerUserSchema = userSchema.pick({
  username: true,
  password: true,
  email: true,
  name: true,
})
export type UserRegister = z.infer<typeof registerUserSchema>
