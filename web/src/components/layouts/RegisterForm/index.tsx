import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { baseURL } from "../../../constants"
import { registerUserSchema, UserRegister } from "../../../schemas/user"

function RegisterForm() {
  const { register, reset, handleSubmit } = useForm<UserRegister>()
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [isSubmitting, setisSubmitting] = useState(false)

  const submitHandler: SubmitHandler<UserRegister> = async userForm => {
    try {
      const userData = registerUserSchema.parse(userForm)
      setisSubmitting(true)
      const res = (await axios.post(baseURL + "/register", userData)) as AxiosResponse<{ msg: string }>
      console.log(res)
      setFormMessage(res.data.msg)
      reset()
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => alert(err.message))
      } else {
        console.log(error)
      }
      const axiosError = error as AxiosError<{
        msg: string
        sqlMessage: string
      }>
      const apiError = axiosError.response?.data.msg
      const sqlError = axiosError.response?.data.sqlMessage
      setFormMessage([apiError, sqlError].find(e => Boolean(e)) as string)
    }
    setisSubmitting(false)
  }

  // useEffect(() => {
  //   reset();
  // }, []);

  return (
    <div className="p-6 text-white flex bg-black/70 rounded-lg">
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl">Junte-se a nós...</h1>
          <p className="text-sm text-gray-400">Crie sua conta preenchendo os campos abaixo.</p>
        </div>

        <input autoComplete="off" {...register("name")} placeholder="name" />
        <input autoComplete="off" {...register("username")} placeholder="username" />
        <input autoComplete="off" type="email" {...register("email")} placeholder="email" />
        <input autoComplete="off" type="password" {...register("password")} placeholder="password" />
        {formMessage && <h2>{formMessage}</h2>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-3 disabled:text-black/70"
          disabled={isSubmitting}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
