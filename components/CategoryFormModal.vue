<template>
  <Teleport to="body">
    <div v-if="open" class="modal-backdrop">
      <form class="modal" role="dialog" aria-modal="true" aria-labelledby="category-form-title" @submit.prevent="submit">
        <div class="modal-header">
          <h2 id="category-form-title">{{ title }}</h2>
          <button class="icon-button ghost" type="button" aria-label="Fechar" @click="$emit('close')">
            <X :size="18" />
          </button>
        </div>

        <label>
          Nome
          <input v-model.trim="form.nome" type="text" autocomplete="off" minlength="5" required />
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
import type { Categoria, CategoriaPayload } from '~/types/catalog'

const props = defineProps<{
  open: boolean
  category: Categoria | null
  saving: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [payload: CategoriaPayload]
}>()

const form = reactive<CategoriaPayload>({
  nome: '',
  descricao: null
})

const title = computed(() => (props.category ? 'Editar categoria' : 'Nova categoria'))
const canSave = computed(() => form.nome.trim().length >= 5)

watch(
  () => [props.open, props.category] as const,
  () => {
    if (!props.open) {
      return
    }

    form.nome = props.category?.nome ?? ''
    form.descricao = props.category?.descricao ?? null
  },
  { immediate: true }
)

function submit() {
  if (!canSave.value) {
    return
  }

  emit('save', {
    nome: form.nome.trim(),
    descricao: form.descricao?.trim() || null
  })
}
</script>
