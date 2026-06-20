export interface Categoria {
  id: number
  nome: string
  descricao: string | null
}

export interface Produto {
  id: number
  nome: string
  descricao: string | null
  preco: number
  categoriaId: number
  categoria: Categoria
}

export interface CategoriaPayload {
  nome: string
  descricao: string | null
}

export interface ProdutoPayload {
  nome: string
  descricao: string | null
  preco: number
  categoriaId: number
}

export interface ApiProblem {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}
