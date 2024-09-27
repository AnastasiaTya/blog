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

export interface ArticleState {
  article: {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: {
      username: string
      bio: string
      image: string
      following: boolean
    }
  }
}
