<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Gestao de catalogo</p>
        <h1>Produtos</h1>
      </div>
      <button class="button primary" type="button" :disabled="categorias.length === 0" @click="openCreate">
        <Plus :size="17" />
        Novo produto
      </button>
    </header>

    <ToastMessage :message="feedback.message" :tone="feedback.tone" @close="clearFeedback" />
    <ToastMessage v-if="errorMessage" :message="errorMessage" tone="danger" @close="errorMessage = ''" />
    <ToastMessage v-if="categoryError" :message="categoryError" tone="danger" @close="categoryError = ''" />

    <DataGrid :columns="columns" :loading="loading" :empty="produtos.length === 0" empty-text="Nenhum produto cadastrado.">
      <tr v-for="product in produtos" :key="product.id">
        <td>{{ product.nome }}</td>
        <td>{{ product.categoria.nome }}</td>
        <td class="right">{{ formatCurrency(product.preco) }}</td>
        <td>{{ product.descricao || '-' }}</td>
        <td class="actions-cell">
          <button class="button secondary compact" type="button" @click="openEdit(product)">
            <Pencil :size="15" />
            Editar
          </button>
          <button class="button danger compact" type="button" @click="askDelete(product)">
            <Trash2 :size="15" />
            Excluir
          </button>
        </td>
      </tr>
    </DataGrid>

    <ProductFormModal
      :open="modalOpen"
      :product="selectedProduct"
      :categories="categorias"
      :saving="saving"
      @close="closeModal"
      @save="saveProduct"
    />

    <ConfirmDialog
      :open="confirmOpen"
      title="Excluir produto"
      :message="deleteMessage"
      @cancel="closeConfirm"
      @confirm="deleteSelected"
    />
  </section>
</template>

<script setup lang="ts">
import { Pencil, Plus, Trash2 } from '@lucide/vue'
import type { Produto, ProdutoPayload } from '~/types/catalog'

const { produtos, loading, errorMessage, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts()
const { categorias, errorMessage: categoryError, fetchCategories } = useCategories()
const { readApiError } = useApiError()

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'categoria', label: 'Categoria' },
  { key: 'preco', label: 'Preco', align: 'right' as const },
  { key: 'descricao', label: 'Descricao' },
  { key: 'acoes', label: 'Acoes', align: 'right' as const }
]

const modalOpen = ref(false)
const confirmOpen = ref(false)
const saving = ref(false)
const selectedProduct = ref<Produto | null>(null)
const feedback = reactive({ message: '', tone: 'success' as 'success' | 'danger' })

const deleteMessage = computed(() =>
  selectedProduct.value
    ? `Confirma a exclusao do produto "${selectedProduct.value.nome}"?`
    : 'Confirma a exclusao deste produto?'
)

onMounted(async () => {
  await Promise.all([fetchProducts(), fetchCategories()])
})

function openCreate() {
  selectedProduct.value = null
  modalOpen.value = true
}

function openEdit(product: Produto) {
  selectedProduct.value = product
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function askDelete(product: Produto) {
  selectedProduct.value = product
  confirmOpen.value = true
}

function closeConfirm() {
  confirmOpen.value = false
}

function clearFeedback() {
  feedback.message = ''
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

async function saveProduct(payload: ProdutoPayload) {
  saving.value = true
  clearFeedback()

  try {
    if (selectedProduct.value) {
      await updateProduct(selectedProduct.value.id, payload)
      feedback.message = 'Produto atualizado com sucesso.'
    } else {
      await createProduct(payload)
      feedback.message = 'Produto cadastrado com sucesso.'
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
  if (!selectedProduct.value) {
    return
  }

  clearFeedback()

  try {
    await deleteProduct(selectedProduct.value.id)
    feedback.tone = 'success'
    feedback.message = 'Produto excluido com sucesso.'
    closeConfirm()
  } catch (error) {
    feedback.tone = 'danger'
    feedback.message = readApiError(error)
    closeConfirm()
  }
}
</script>
