import { useQuery } from "@tanstack/react-query"
import { api } from "../../../services/axios"
import { IArticle } from "./types"

const Articles: React.FC = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<IArticle[]>({
    queryKey: ["articles"],
    queryFn: () => api.get("/articles").then(response => response.data),
    staleTime: 1000 * 60, // 1 minuto
  })

  if (!articles || isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      {articles.map(article => {
        return (
          <div>
            <h1>article.</h1>
          </div>
        )
      })}
    </div>
  )
}

export default Articles
