import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { UserProfile } from "../../../schemas/user"
import { api } from "../../../services/axios"
import ProfileCover from "../../ProfileCover"
import styles from "./styles.module.css"

export interface Info {
  username?: string
  name?: string
  email?: string
  cover_picture?: string
  avatar_picture?: string
  city?: string
}

const Profile: React.FC = () => {
  const [info, setInfo] = useState<Info>({} as Info)

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserProfile>({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await api.get("/profile").then(res => res.data[0])
      setInfo({
        avatar_picture: user.avatar_picture,
        cover_picture: user.cover_picture,
      })
      return user
    },
    staleTime: 1000 * 60, // 1 minuto
  })

  return (
    <div className={styles.container}>
        <div className={styles.coverContainer}>
          <ProfileCover info={info} user={user!} setInfo={setInfo} alt="Imagem de fundo" />
          <div className={`${styles.innerWidth} ${styles.absolute}`}>
            <div className={styles.avatarContainer}>
              <img src={user?.avatar_picture} />
              <h1 className={`${styles.title} truncate`}>{user?.name}</h1>
            </div>
          </div>
        </div>
        <div className={styles.innerWidth}>
          <div className={styles.body}>
            <h3 className="text-2xl">@{user?.username}</h3>
            <p className="text-lg font-thin text-zinc-400">
              From: {user?.city ?? <span className="italic">não informado</span>}
            </p>
          </div>
        </div>
    </div>
  )
}

export default Profile
