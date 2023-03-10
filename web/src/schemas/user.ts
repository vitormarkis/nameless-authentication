import { z } from 'zod';

export const userSchema = z.object({
  id: z
    .number({ invalid_type_error: 'O id precisa ser um número.' })
    .int()
    .nonnegative(),
  username: z
    .string()
    .min(6, { message: 'O username precisa ter mais que 6 caracteres.' })
    .max(16, { message: 'O username não pode ter mais que 16 caracteres.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa ter mais que 6 caracteres.' })
    .max(16, { message: 'A senha não pode ter mais que 16 caracteres.' }),
  name: z
    .string()
    .min(6, { message: 'Você precisa colocar nome e sobrenome.' })
    .max(50, { message: 'Limite de caracteres excedida.' }),
  email: z.string().email(),
});

export const loginUserSchema = userSchema.pick({
  username: true,
  password: true,
});

export const registerUserSchema = userSchema.pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export type User = z.infer<typeof userSchema>;
export type UserRegister = z.infer<typeof registerUserSchema>;
export type UserLogin = z.infer<typeof loginUserSchema>;

export interface UserProfile extends Omit<User, 'password'> {
  cover_picture: string
  avatar_picture: string
  city: string
}
