<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Gestao de catalogo</p>
        <h1>Categorias</h1>
      </div>
      <button class="button primary" type="button" @click="openCreate">
        <Plus :size="17" />
        Nova categoria
      </button>
    </header>

    <ToastMessage :message="feedback.message" :tone="feedback.tone" @close="clearFeedback" />
    <ToastMessage v-if="errorMessage" :message="errorMessage" tone="danger" @close="errorMessage = ''" />

    <DataGrid :columns="columns" :loading="loading" :empty="categorias.length === 0" empty-text="Nenhuma categoria cadastrada.">
      <tr v-for="category in categorias" :key="category.id">
        <td>{{ category.nome }}</td>
        <td>{{ category.descricao || '-' }}</td>
        <td class="actions-cell">
          <button class="button secondary compact" type="button" @click="openEdit(category)">
            <Pencil :size="15" />
            Editar
          </button>
          <button class="button danger compact" type="button" @click="askDelete(category)">
            <Trash2 :size="15" />
            Excluir
          </button>
        </td>
      </tr>
    </DataGrid>

    <CategoryFormModal
      :open="modalOpen"
      :category="selectedCategory"
      :saving="saving"
      @close="closeModal"
      @save="saveCategory"
    />

    <ConfirmDialog
      :open="confirmOpen"
      title="Excluir categoria"
      :message="deleteMessage"
      @cancel="closeConfirm"
      @confirm="deleteSelected"
    />
  </section>
</template>

<script setup lang="ts">
import { Pencil, Plus, Trash2 } from '@lucide/vue'
import type { Categoria, CategoriaPayload } from '~/types/catalog'

const { categorias, loading, errorMessage, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategories()
const { readApiError } = useApiError()

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descricao' },
  { key: 'acoes', label: 'Acoes', align: 'right' as const }
]

const modalOpen = ref(false)
const confirmOpen = ref(false)
const saving = ref(false)
const selectedCategory = ref<Categoria | null>(null)
const feedback = reactive({ message: '', tone: 'success' as 'success' | 'danger' })

const deleteMessage = computed(() =>
  selectedCategory.value
    ? `Confirma a exclusao da categoria "${selectedCategory.value.nome}"?`
    : 'Confirma a exclusao desta categoria?'
)

onMounted(fetchCategories)

function openCreate() {
  selectedCategory.value = null
  modalOpen.value = true
}

function openEdit(category: Categoria) {
  selectedCategory.value = category
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function askDelete(category: Categoria) {
  selectedCategory.value = category
  confirmOpen.value = true
}

function closeConfirm() {
  confirmOpen.value = false
}

function clearFeedback() {
  feedback.message = ''
}

async function saveCategory(payload: CategoriaPayload) {
  saving.value = true
  clearFeedback()

  try {
    if (selectedCategory.value) {
      await updateCategory(selectedCategory.value.id, payload)
      feedback.message = 'Categoria atualizada com sucesso.'
    } else {
      await createCategory(payload)
      feedback.message = 'Categoria cadastrada com sucesso.'
    }

    feedback.tone = 'success'
    closeModal()
  } catch (error) {
    feedback.tone = 'danger'
    feedback.message = readApiError(error)
  } finally {
    saving.value = false
  }
}

async function deleteSelected() {
  if (!selectedCategory.value) {
    return
  }

  clearFeedback()

  try {
    await deleteCategory(selectedCategory.value.id)
    feedback.tone = 'success'
    feedback.message = 'Categoria excluida com sucesso.'
    closeConfirm()
  } catch (error) {
    feedback.tone = 'danger'
    feedback.message = readApiError(error)
    closeConfirm()
  }
}
</script>
