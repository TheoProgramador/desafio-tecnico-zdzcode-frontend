# Catalog Frontend - Nuxt 3

Frontend em Nuxt 3 para gestao de categorias e produtos do catalogo comercial.

Este repositorio representa somente o frontend. O backend .NET 8 fica em um repositorio separado e e responsavel por persistir os dados no banco.

## Status da Persistencia

O banco de dados esta na nuvem e ja esta funcionando.

O frontend nao acessa o banco diretamente. O fluxo correto e:

```text
Nuxt 3 -> API .NET -> SQL Server em nuvem
```

A API backend ja esta conectada ao SQL Server remoto hospedado na Site4Now e as migrations ja foram aplicadas. Foi feito teste real de escrita, leitura e exclusao no banco remoto via API.

Na pratica: quando o usuario cria, edita ou exclui uma categoria/produto pela interface, o frontend chama a API, e a API persiste de verdade no banco SQL Server em nuvem.

## Funcionalidades

- Listagem de categorias.
- Cadastro e edicao de categorias em modal.
- Exclusao com confirmacao.
- Listagem de produtos.
- Cadastro e edicao de produtos em modal.
- Select de categorias carregado da API.
- Tratamento visual de erros retornados pelo backend.
- Atualizacao reativa da lista apos `PUT` e `DELETE`, sem recarregar a pagina.

## Requisitos

- Node.js 18.20 ou superior.
- npm.
- API backend rodando e acessivel.

O projeto foi testado com:

```text
Node 20.19.4
npm 10.8.2
```

## Configuracao da API

Por padrao, o frontend consome:

```text
http://localhost:5192/api
```

Isso esta configurado em `nuxt.config.ts`:

```ts
apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5192/api'
```

Para apontar para outro backend, defina a variavel:

```powershell
$env:NUXT_PUBLIC_API_BASE="https://sua-api-publicada.com/api"
```

## Executar Localmente

```powershell
npm install
$env:NUXT_PUBLIC_API_BASE="http://localhost:5192/api"
npm run dev
```

Aplicacao:

```text
http://localhost:3001
```

## Backend Necessario

Antes de usar o frontend, a API backend precisa estar rodando.

Em ambiente local, a API esperada e:

```text
http://localhost:5192
```

Swagger do backend:

```text
http://localhost:5192/swagger
```

## Build

```powershell
npm run build
```

## Typecheck

```powershell
npm run typecheck
```

## Estrutura

```text
pages/
  categorias.vue
  produtos.vue

components/
  CategoryFormModal.vue
  ProductFormModal.vue
  ConfirmDialog.vue
  DataGrid.vue
  ToastMessage.vue

composables/
  useCategories.ts
  useProducts.ts
  useApiError.ts

types/
  catalog.ts
```

## Observacao Importante

A persistencia real acontece no backend. Este frontend foi desenhado para demonstrar a integracao completa com a API e com o banco SQL Server em nuvem ja configurado e validado.
