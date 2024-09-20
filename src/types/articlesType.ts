export type ArticleType = {
  author: {
    following: boolean
    username: string
    image: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[] | null
  title: string
  updatedAt: string
}
