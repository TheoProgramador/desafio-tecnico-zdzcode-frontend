import { a as useCategories, _ as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, u as useApiError } from "./useCategories-BYF4e-XE.js";
import { defineComponent, reactive, computed, watch, unref, useSSRContext, ref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createTextVNode } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
import { X, Save, Plus, Pencil, Trash2 } from "@lucide/vue";
import "../server.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/ProjetosC/teste/frontend/node_modules/hookable/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/unctx/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/ProjetosC/teste/frontend/node_modules/defu/dist/defu.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategoryFormModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    category: {},
    saving: { type: Boolean }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = reactive({
      nome: "",
      descricao: null
    });
    const title = computed(() => props.category ? "Editar categoria" : "Nova categoria");
    const canSave = computed(() => form.nome.trim().length >= 5);
    watch(
      () => [props.open, props.category],
      () => {
        if (!props.open) {
          return;
        }
        form.nome = props.category?.nome ?? "";
        form.descricao = props.category?.descricao ?? null;
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="modal-backdrop"><form class="modal" role="dialog" aria-modal="true" aria-labelledby="category-form-title"><div class="modal-header"><h2 id="category-form-title">${ssrInterpolate(unref(title))}</h2><button class="icon-button ghost" type="button" aria-label="Fechar">`);
          _push2(ssrRenderComponent(unref(X), { size: 18 }, null, _parent));
          _push2(`</button></div><label> Nome <input${ssrRenderAttr("value", unref(form).nome)} type="text" autocomplete="off" minlength="5" required></label><label> Descricao <textarea rows="4">${ssrInterpolate(unref(form).descricao)}</textarea></label><div class="modal-actions"><button class="button secondary" type="button">Cancelar</button><button class="button primary" type="submit"${ssrIncludeBooleanAttr(!unref(canSave) || __props.saving) ? " disabled" : ""}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryFormModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categorias",
  __ssrInlineRender: true,
  setup(__props) {
    const { categorias, loading, errorMessage, createCategory, updateCategory, deleteCategory } = useCategories();
    const { readApiError } = useApiError();
    const columns = [
      { key: "nome", label: "Nome" },
      { key: "descricao", label: "Descricao" },
      { key: "acoes", label: "Acoes", align: "right" }
    ];
    const modalOpen = ref(false);
    const confirmOpen = ref(false);
    const saving = ref(false);
    const selectedCategory = ref(null);
    const feedback = reactive({ message: "", tone: "success" });
    const deleteMessage = computed(
      () => selectedCategory.value ? `Confirma a exclusao da categoria "${selectedCategory.value.nome}"?` : "Confirma a exclusao desta categoria?"
    );
    function openEdit(category) {
      selectedCategory.value = category;
      modalOpen.value = true;
    }
    function closeModal() {
      modalOpen.value = false;
    }
    function askDelete(category) {
      selectedCategory.value = category;
      confirmOpen.value = true;
    }
    function closeConfirm() {
      confirmOpen.value = false;
    }
    function clearFeedback() {
      feedback.message = "";
    }
    async function saveCategory(payload) {
      saving.value = true;
      clearFeedback();
      try {
        if (selectedCategory.value) {
          await updateCategory(selectedCategory.value.id, payload);
          feedback.message = "Categoria atualizada com sucesso.";
        } else {
          await createCategory(payload);
          feedback.message = "Categoria cadastrada com sucesso.";
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
      if (!selectedCategory.value) {
        return;
      }
      clearFeedback();
      try {
        await deleteCategory(selectedCategory.value.id);
        feedback.tone = "success";
        feedback.message = "Categoria excluida com sucesso.";
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
      const _component_CategoryFormModal = _sfc_main$1;
      const _component_ConfirmDialog = _sfc_main$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}><header class="page-header"><div><p class="eyebrow">Gestao de catalogo</p><h1>Categorias</h1></div><button class="button primary" type="button">`);
      _push(ssrRenderComponent(unref(Plus), { size: 17 }, null, _parent));
      _push(` Nova categoria </button></header>`);
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
      _push(ssrRenderComponent(_component_DataGrid, {
        columns,
        loading: unref(loading),
        empty: unref(categorias).length === 0,
        "empty-text": "Nenhuma categoria cadastrada."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(categorias), (category) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(category.nome)}</td><td${_scopeId}>${ssrInterpolate(category.descricao || "-")}</td><td class="actions-cell"${_scopeId}><button class="button secondary compact" type="button"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Pencil), { size: 15 }, null, _parent2, _scopeId));
              _push2(` Editar </button><button class="button danger compact" type="button"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { size: 15 }, null, _parent2, _scopeId));
              _push2(` Excluir </button></td></tr>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(categorias), (category) => {
                return openBlock(), createBlock("tr", {
                  key: category.id
                }, [
                  createVNode("td", null, toDisplayString(category.nome), 1),
                  createVNode("td", null, toDisplayString(category.descricao || "-"), 1),
                  createVNode("td", { class: "actions-cell" }, [
                    createVNode("button", {
                      class: "button secondary compact",
                      type: "button",
                      onClick: ($event) => openEdit(category)
                    }, [
                      createVNode(unref(Pencil), { size: 15 }),
                      createTextVNode(" Editar ")
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      class: "button danger compact",
                      type: "button",
                      onClick: ($event) => askDelete(category)
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
      _push(ssrRenderComponent(_component_CategoryFormModal, {
        open: unref(modalOpen),
        category: unref(selectedCategory),
        saving: unref(saving),
        onClose: closeModal,
        onSave: saveCategory
      }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(confirmOpen),
        title: "Excluir categoria",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categorias.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=categorias-BJFWU4LK.js.map
