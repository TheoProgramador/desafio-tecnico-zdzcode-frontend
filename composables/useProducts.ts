import type { Produto, ProdutoPayload } from '~/types/catalog'

export function useProducts() {
  const config = useRuntimeConfig()
  const produtos = ref<Produto[]>([])
  const loading = ref(false)
  const errorMessage = ref('')

  const sortByName = (items: Produto[]) =>
    [...items].sort((left, right) => left.nome.localeCompare(right.nome, 'pt-BR'))

  async function fetchProducts() {
    loading.value = true
    errorMessage.value = ''

    try {
      produtos.value = await $fetch<Produto[]>(`${config.public.apiBase}/produtos`)
    } catch (error) {
      errorMessage.value = useApiError().readApiError(error)
    } finally {
      loading.value = false
    }
  }

  async function createProduct(payload: ProdutoPayload) {
    const created = await $fetch<Produto>(`${config.public.apiBase}/produtos`, {
      method: 'POST',
      body: payload
    })
    produtos.value = sortByName([...produtos.value, created])
    return created
  }

  async function updateProduct(id: number, payload: ProdutoPayload) {
    const updated = await $fetch<Produto>(`${config.public.apiBase}/produtos/${id}`, {
      method: 'PUT',
      body: payload
    })
    produtos.value = sortByName(produtos.value.map((item) => (item.id === id ? updated : item)))
    return updated
  }

  async function deleteProduct(id: number) {
    await $fetch(`${config.public.apiBase}/produtos/${id}`, { method: 'DELETE' })
    produtos.value = produtos.value.filter((item) => item.id !== id)
  }

  return {
    produtos,
    loading,
    errorMessage,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
