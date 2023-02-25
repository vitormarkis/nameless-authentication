import axios, { AxiosError } from "axios"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { baseURL } from "../../../constants"
import { loginUserSchema, UserLogin } from "../../../schemas/user"

function LoginForm() {
  const { register, handleSubmit } = useForm<UserLogin>()
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const submitHandler: SubmitHandler<UserLogin> = async userForm => {
    try {
      const userData = loginUserSchema.parse(userForm)
      setIsSubmitting(true)
      await axios.post(baseURL + "/login", userData, {
        withCredentials: true,
      })
      navigate("/articles")
    } catch (error) {
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
    setIsSubmitting(false)
  }

  return (
    <div className="p-6 text-white flex bg-black/70 rounded-lg">
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6 w-[400px]">
        <div>
          <h1 className="text-2xl">Seja bem-vindo...</h1>
          <p className="text-sm text-gray-400">Preencha seus dados para ver seus artigos.</p>
        </div>

        <input autoComplete="off" {...register("username")} placeholder="username" />
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

export default LoginForm
