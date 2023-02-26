import * as Dialog from "@radix-ui/react-dialog"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { UserProfile } from "../../schemas/user"
import { api } from "../../services/axios"
import queryClient from "../../services/queryClient"
import { Info } from "../layouts/Profile"
import styles from "./styles.module.css"

interface Props {
  alt: string
  info: Info
  setInfo: Dispatch<SetStateAction<Info>>
  user: UserProfile
}

const ProfileCover: React.FC<Props> = ({ alt, info, setInfo, user }) => {
  console.log({info})
  const { cover_picture } = info
  const { mutate, error } = useMutation(
    async (updatedSource: Info) => {
      const res = await api.post("/update-profile-info", updatedSource)
      return res.data
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["user"]),
    }
  )

  if(error) alert(error.message!)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild className={`${styles.reset} bg-green-800 w-full`}>
        {/* <p>Oi</p> */}
        <img className={styles.img} src={user?.cover_picture} alt={alt} />
      </Dialog.Trigger>
      <Dialog.Content onCloseAutoFocus={() => mutate({ cover_picture })}>
        <Dialog.Overlay className="w-screen h-screen bg-black/70 absolute inset-0 z-20" />
        <div className="bg-zinc-200 center z-20 p-4 rounded-md flex gap-2">
          <input
            type="text"
            name="cover_picture"
            value={cover_picture}
            onChange={e => setInfo(prev => ({ ...prev, [e.currentTarget.name]: e.currentTarget.value }))}
            className="px-3 py-1 rounded-md w-[480px]"
            placeholder="http://image.com.br/"
          />
          <Dialog.Close asChild>
            <button autoFocus className="px-3 py-1 bg-red-500 rounded-md">
              Fechar
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ProfileCover
