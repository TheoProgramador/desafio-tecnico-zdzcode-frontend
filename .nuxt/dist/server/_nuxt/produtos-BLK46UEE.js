import { u as useApiError, a as useCategories, _ as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4 } from "./useCategories-BYF4e-XE.js";
import { defineComponent, reactive, computed, watch, unref, useSSRContext, ref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createTextVNode } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttrs } from "vue/server-renderer";
import { X, Save, Plus, Pencil, Trash2 } from "@lucide/vue";
import { u as useRuntimeConfig } from "../server.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/ProjetosC/teste/frontend/node_modules/hookable/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/unctx/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/ProjetosC/teste/frontend/node_modules/defu/dist/defu.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductFormModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    product: {},
    categories: {},
    saving: { type: Boolean }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = reactive({
      nome: "",
      descricao: null,
      preco: 0,
      categoriaId: 0
    });
    const title = computed(() => props.product ? "Editar produto" : "Novo produto");
    const canSave = computed(() => form.nome.trim().length >= 5 && form.categoriaId > 0 && form.preco > 0);
    watch(
      () => [props.open, props.product, props.categories.length],
      () => {
        if (!props.open) {
          return;
        }
        form.nome = props.product?.nome ?? "";
        form.descricao = props.product?.descricao ?? null;
        form.preco = props.product?.preco ?? 0;
        form.categoriaId = props.product?.categoriaId ?? props.categories[0]?.id ?? 0;
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="modal-backdrop"><form class="modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title"><div class="modal-header"><h2 id="product-form-title">${ssrInterpolate(unref(title))}</h2><button class="icon-button ghost" type="button" aria-label="Fechar">`);
          _push2(ssrRenderComponent(unref(X), { size: 18 }, null, _parent));
          _push2(`</button></div><label> Nome <input${ssrRenderAttr("value", unref(form).nome)} type="text" autocomplete="off" minlength="5" required></label><label> Categoria <select required><option${ssrRenderAttr("value", 0)} disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoriaId) ? ssrLooseContain(unref(form).categoriaId, 0) : ssrLooseEqual(unref(form).categoriaId, 0)) ? " selected" : ""}>Selecione uma categoria</option><!--[-->`);
          ssrRenderList(__props.categories, (category) => {
            _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoriaId) ? ssrLooseContain(unref(form).categoriaId, category.id) : ssrLooseEqual(unref(form).categoriaId, category.id)) ? " selected" : ""}>${ssrInterpolate(category.nome)}</option>`);
          });
          _push2(`<!--]--></select></label><label> Preco <input${ssrRenderAttr("value", unref(form).preco)} type="number" min="0.01" step="0.01" required></label><label> Descricao <textarea rows="4">${ssrInterpolate(unref(form).descricao)}</textarea></label><div class="modal-actions"><button class="button secondary" type="button">Cancelar</button><button class="button primary" type="submit"${ssrIncludeBooleanAttr(!unref(canSave) || __props.saving) ? " disabled" : ""}>`);
          _push2(ssrRenderComponent(unref(Save), { size: 16 }, null, _parent));
          _push2(` Salvar </button></div></form></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductFormModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useProducts() {
  const config = useRuntimeConfig();
  const produtos = ref([]);
  const loading = ref(false);
  const errorMessage = ref("");
  const sortByName = (items) => [...items].sort((left, right) => left.nome.localeCompare(right.nome, "pt-BR"));
  async function fetchProducts() {
    loading.value = true;
    errorMessage.value = "";
    try {
      produtos.value = await $fetch(`${config.public.apiBase}/produtos`);
    } catch (error) {
      errorMessage.value = useApiError().readApiError(error);
    } finally {
      loading.value = false;
    }
  }
  async function createProduct(payload) {
    const created = await $fetch(`${config.public.apiBase}/produtos`, {
      method: "POST",
      body: payload
    });
    produtos.value = sortByName([...produtos.value, created]);
    return created;
  }
  async function updateProduct(id, payload) {
    const updated = await $fetch(`${config.public.apiBase}/produtos/${id}`, {
      method: "PUT",
      body: payload
    });
    produtos.value = sortByName(produtos.value.map((item) => item.id === id ? updated : item));
    return updated;
  }
  async function deleteProduct(id) {
    await $fetch(`${config.public.apiBase}/produtos/${id}`, { method: "DELETE" });
    produtos.value = produtos.value.filter((item) => item.id !== id);
  }
  return {
    produtos,
    loading,
    errorMessage,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "produtos",
  __ssrInlineRender: true,
  setup(__props) {
    const { produtos, loading, errorMessage, createProduct, updateProduct, deleteProduct } = useProducts();
    const { categorias, errorMessage: categoryError } = useCategories();
    const { readApiError } = useApiError();
    const columns = [
      { key: "nome", label: "Nome" },
      { key: "categoria", label: "Categoria" },
      { key: "preco", label: "Preco", align: "right" },
      { key: "descricao", label: "Descricao" },
      { key: "acoes", label: "Acoes", align: "right" }
    ];
    const modalOpen = ref(false);
    const confirmOpen = ref(false);
    const saving = ref(false);
    const selectedProduct = ref(null);
    const feedback = reactive({ message: "", tone: "success" });
    const deleteMessage = computed(
      () => selectedProduct.value ? `Confirma a exclusao do produto "${selectedProduct.value.nome}"?` : "Confirma a exclusao deste produto?"
    );
    function openEdit(product) {
      selectedProduct.value = product;
      modalOpen.value = true;
    }
    function closeModal() {
      modalOpen.value = false;
    }
    function askDelete(product) {
      selectedProduct.value = product;
      confirmOpen.value = true;
    }
    function closeConfirm() {
      confirmOpen.value = false;
    }
    function clearFeedback() {
      feedback.message = "";
    }
    function formatCurrency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
    async function saveProduct(payload) {
      saving.value = true;
      clearFeedback();
      try {
        if (selectedProduct.value) {
          await updateProduct(selectedProduct.value.id, payload);
          feedback.message = "Produto atualizado com sucesso.";
        } else {
          await createProduct(payload);
          feedback.message = "Produto cadastrado com sucesso.";
        }
        feedback.tone = "success";
        closeModal();
      } catch (error) {
        feedback.tone = "danger";
        feedback.message = readApiError(error);
      } finally {
        saving.value = false;
      }
    }
    async function deleteSelected() {
      if (!selectedProduct.value) {
        return;
      }
      clearFeedback();
      try {
        await deleteProduct(selectedProduct.value.id);
        feedback.tone = "success";
        feedback.message = "Produto excluido com sucesso.";
        closeConfirm();
      } catch (error) {
        feedback.tone = "danger";
        feedback.message = readApiError(error);
        closeConfirm();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ToastMessage = _sfc_main$2;
      const _component_DataGrid = _sfc_main$3;
      const _component_ProductFormModal = _sfc_main$1;
      const _component_ConfirmDialog = _sfc_main$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}><header class="page-header"><div><p class="eyebrow">Gestao de catalogo</p><h1>Produtos</h1></div><button class="button primary" type="button"${ssrIncludeBooleanAttr(unref(categorias).length === 0) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(Plus), { size: 17 }, null, _parent));
      _push(` Novo produto </button></header>`);
      _push(ssrRenderComponent(_component_ToastMessage, {
        message: unref(feedback).message,
        tone: unref(feedback).tone,
        onClose: clearFeedback
      }, null, _parent));
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(_component_ToastMessage, {
          message: unref(errorMessage),
          tone: "danger",
          onClose: ($event) => errorMessage.value = ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(categoryError)) {
        _push(ssrRenderComponent(_component_ToastMessage, {
          message: unref(categoryError),
          tone: "danger",
          onClose: ($event) => categoryError.value = ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_DataGrid, {
        columns,
        loading: unref(loading),
        empty: unref(produtos).length === 0,
        "empty-text": "Nenhum produto cadastrado."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(produtos), (product) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(product.nome)}</td><td${_scopeId}>${ssrInterpolate(product.categoria.nome)}</td><td class="right"${_scopeId}>${ssrInterpolate(formatCurrency(product.preco))}</td><td${_scopeId}>${ssrInterpolate(product.descricao || "-")}</td><td class="actions-cell"${_scopeId}><button class="button secondary compact" type="button"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Pencil), { size: 15 }, null, _parent2, _scopeId));
              _push2(` Editar </button><button class="button danger compact" type="button"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { size: 15 }, null, _parent2, _scopeId));
              _push2(` Excluir </button></td></tr>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(produtos), (product) => {
                return openBlock(), createBlock("tr", {
                  key: product.id
                }, [
                  createVNode("td", null, toDisplayString(product.nome), 1),
                  createVNode("td", null, toDisplayString(product.categoria.nome), 1),
                  createVNode("td", { class: "right" }, toDisplayString(formatCurrency(product.preco)), 1),
                  createVNode("td", null, toDisplayString(product.descricao || "-"), 1),
                  createVNode("td", { class: "actions-cell" }, [
                    createVNode("button", {
                      class: "button secondary compact",
                      type: "button",
                      onClick: ($event) => openEdit(product)
                    }, [
                      createVNode(unref(Pencil), { size: 15 }),
                      createTextVNode(" Editar ")
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      class: "button danger compact",
                      type: "button",
                      onClick: ($event) => askDelete(product)
                    }, [
                      createVNode(unref(Trash2), { size: 15 }),
                      createTextVNode(" Excluir ")
                    ], 8, ["onClick"])
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ProductFormModal, {
        open: unref(modalOpen),
        product: unref(selectedProduct),
        categories: unref(categorias),
        saving: unref(saving),
        onClose: closeModal,
        onSave: saveProduct
      }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(confirmOpen),
        title: "Excluir produto",
        message: unref(deleteMessage),
        onCancel: closeConfirm,
        onConfirm: deleteSelected
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produtos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=produtos-BLK46UEE.js.map
