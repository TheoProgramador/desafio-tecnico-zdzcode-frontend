import type { Categoria, CategoriaPayload } from '~/types/catalog'

export function useCategories() {
  const config = useRuntimeConfig()
  const categorias = ref<Categoria[]>([])
  const loading = ref(false)
  const errorMessage = ref('')

  const sortByName = (items: Categoria[]) =>
    [...items].sort((left, right) => left.nome.localeCompare(right.nome, 'pt-BR'))

  async function fetchCategories() {
    loading.value = true
    errorMessage.value = ''

    try {
      categorias.value = await $fetch<Categoria[]>(`${config.public.apiBase}/categorias`)
    } catch (error) {
      errorMessage.value = useApiError().readApiError(error)
    } finally {
      loading.value = false
    }
  }

  async function createCategory(payload: CategoriaPayload) {
    const created = await $fetch<Categoria>(`${config.public.apiBase}/categorias`, {
      method: 'POST',
      body: payload
    })
    categorias.value = sortByName([...categorias.value, created])
    return created
  }

  async function updateCategory(id: number, payload: CategoriaPayload) {
    const updated = await $fetch<Categoria>(`${config.public.apiBase}/categorias/${id}`, {
      method: 'PUT',
      body: payload
    })
    categorias.value = sortByName(categorias.value.map((item) => (item.id === id ? updated : item)))
    return updated
  }

  async function deleteCategory(id: number) {
    await $fetch(`${config.public.apiBase}/categorias/${id}`, { method: 'DELETE' })
    categorias.value = categorias.value.filter((item) => item.id !== id)
  }

  return {
    categorias,
    loading,
    errorMessage,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
