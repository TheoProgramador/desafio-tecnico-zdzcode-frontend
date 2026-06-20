<template>
  <Teleport to="body">
    <div v-if="open" class="modal-backdrop">
      <section class="modal confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div class="modal-header">
          <h2 id="confirm-title">{{ title }}</h2>
          <button class="icon-button ghost" type="button" aria-label="Fechar" @click="$emit('cancel')">
            <X :size="18" />
          </button>
        </div>

        <p class="muted">{{ message }}</p>

        <div class="modal-actions">
          <button class="button secondary" type="button" @click="$emit('cancel')">Cancelar</button>
          <button class="button danger" type="button" @click="$emit('confirm')">
            <Trash2 :size="16" />
            Excluir
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Trash2, X } from '@lucide/vue'

defineProps<{
  open: boolean
  title: string
  message: string
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>
