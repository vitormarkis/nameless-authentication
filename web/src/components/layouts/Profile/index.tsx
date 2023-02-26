import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { UserProfile } from "../../../schemas/user"
import { api } from "../../../services/axios"
import styles from "./styles.module.css"

const Profile: React.FC = () => {
  const { data: user, isLoading } = useQuery<UserProfile>({
    queryKey: ["user"],
    queryFn: () => api.get("/profile").then(res => res.data[0]),
    staleTime: 1000 * 60, // 1 minuto
  })

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className={styles.container}>
      {isLoading || !user ? (
        <h2>Carregando</h2>
      ) : (
        <div>
          <div className={styles.coverContainer}>
            <img src={user.cover_picture} alt="Imagem de fundo" />
            <div className={`${styles.innerWidth} ${styles.absolute}`}>
              <div className={styles.avatarContainer}>
                <img src={user.avatar_picture} />
                <h1 className={styles.title}>{user.name}</h1>
              </div>
            </div>
          </div>
          <div className={styles.innerWidth}>
            <div className={styles.body}>
              <h3 className="text-2xl">@{user.username}</h3>
              <p className="text-lg font-thin text-zinc-400">
                From: {user.city ?? <span className="italic">não informado</span>}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
