<template>
  <div v-if="message" class="toast" :class="tone" role="status">
    <CircleAlert v-if="tone === 'danger'" :size="18" />
    <CircleCheck v-else :size="18" />
    <span>{{ message }}</span>
    <button class="icon-button ghost" type="button" aria-label="Fechar mensagem" @click="$emit('close')">
      <X :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { CircleAlert, CircleCheck, X } from '@lucide/vue'

defineProps<{
  message: string
  tone: 'success' | 'danger'
}>()

defineEmits<{
  close: []
}>()
</script>
