<template>
  <Teleport to="body">
    <div v-if="open" class="modal-backdrop">
      <form class="modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title" @submit.prevent="submit">
        <div class="modal-header">
          <h2 id="product-form-title">{{ title }}</h2>
          <button class="icon-button ghost" type="button" aria-label="Fechar" @click="$emit('close')">
            <X :size="18" />
          </button>
        </div>

        <label>
          Nome
          <input v-model.trim="form.nome" type="text" autocomplete="off" minlength="5" required />
        </label>

        <label>
          Categoria
          <select v-model.number="form.categoriaId" required>
            <option :value="0" disabled>Selecione uma categoria</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.nome }}
            </option>
          </select>
        </label>

        <label>
          Preco
          <input v-model.number="form.preco" type="number" min="0.01" step="0.01" required />
        </label>

        <label>
          Descricao
          <textarea v-model.trim="form.descricao" rows="4" />
        </label>

        <div class="modal-actions">
          <button class="button secondary" type="button" @click="$emit('close')">Cancelar</button>
          <button class="button primary" type="submit" :disabled="!canSave || saving">
            <Save :size="16" />
            Salvar
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Save, X } from '@lucide/vue'
import type { Categoria, Produto, ProdutoPayload } from '~/types/catalog'

const props = defineProps<{
  open: boolean
  product: Produto | null
  categories: Categoria[]
  saving: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [payload: ProdutoPayload]
}>()

const form = reactive<ProdutoPayload>({
  nome: '',
  descricao: null,
  preco: 0,
  categoriaId: 0
})

const title = computed(() => (props.product ? 'Editar produto' : 'Novo produto'))
const canSave = computed(() => form.nome.trim().length >= 5 && form.categoriaId > 0 && form.preco > 0)

watch(
  () => [props.open, props.product, props.categories.length] as const,
  () => {
    if (!props.open) {
      return
    }

    form.nome = props.product?.nome ?? ''
    form.descricao = props.product?.descricao ?? null
    form.preco = props.product?.preco ?? 0
    form.categoriaId = props.product?.categoriaId ?? props.categories[0]?.id ?? 0
  },
  { immediate: true }
)

function submit() {
  if (!canSave.value) {
    return
  }

  emit('save', {
    nome: form.nome.trim(),
    descricao: form.descricao?.trim() || null,
    preco: Number(form.preco),
    categoriaId: Number(form.categoriaId)
  })
}
</script>
