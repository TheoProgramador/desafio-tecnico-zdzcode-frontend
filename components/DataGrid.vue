<template>
  <div class="grid-shell">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" :class="column.align">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="empty-cell">Carregando dados...</td>
        </tr>
        <tr v-else-if="empty">
          <td :colspan="columns.length" class="empty-cell">{{ emptyText }}</td>
        </tr>
        <slot v-else />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Array<{ key: string; label: string; align?: 'right' | 'center' }>
  loading?: boolean
  empty?: boolean
  emptyText: string
}>()
</script>
