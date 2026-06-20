import type { ApiProblem } from '~/types/catalog'

export function useApiError() {
  function readApiError(error: unknown): string {
    const response = error as { data?: ApiProblem; message?: string }
    const data = response.data

    if (data?.errors) {
      return Object.values(data.errors).flat().join(' ')
    }

    return data?.detail || data?.title || response.message || 'Nao foi possivel concluir a operacao.'
  }

  return { readApiError }
}
