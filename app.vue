<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">C</span>
        <div>
          <strong>Catalogo</strong>
          <span>Inventario comercial</span>
        </div>
      </div>

      <nav class="nav-links" aria-label="Navegacao principal">
        <NuxtLink to="/categorias" active-class="active">
          <Tags :size="18" />
          Categorias
        </NuxtLink>
        <NuxtLink to="/produtos" active-class="active">
          <PackageSearch :size="18" />
          Produtos
        </NuxtLink>
      </nav>
    </aside>

    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { PackageSearch, Tags } from '@lucide/vue'
</script>
