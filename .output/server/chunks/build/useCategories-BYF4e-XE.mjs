globalThis.__timing__.logStart('Load chunks/build/useCategories-BYF4e-XE');import { ref, defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrRenderTeleport } from 'vue/server-renderer';
import { CircleAlert, CircleCheck, X, Trash2 } from '@lucide/vue';
import { u as useRuntimeConfig } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ToastMessage",
  __ssrInlineRender: true,
  props: {
    message: {},
    tone: {}
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["toast", __props.tone],
          role: "status"
        }, _attrs))}>`);
        if (__props.tone === "danger") {
          _push(ssrRenderComponent(unref(CircleAlert), { size: 18 }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(CircleCheck), { size: 18 }, null, _parent));
        }
        _push(`<span>${ssrInterpolate(__props.message)}</span><button class="icon-button ghost" type="button" aria-label="Fechar mensagem">`);
        _push(ssrRenderComponent(unref(X), { size: 16 }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToastMessage.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DataGrid",
  __ssrInlineRender: true,
  props: {
    columns: {},
    loading: { type: Boolean },
    empty: { type: Boolean },
    emptyText: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid-shell" }, _attrs))}><table><thead><tr><!--[-->`);
      ssrRenderList(__props.columns, (column) => {
        _push(`<th class="${ssrRenderClass(column.align)}">${ssrInterpolate(column.label)}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody>`);
      if (__props.loading) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length)} class="empty-cell">Carregando dados...</td></tr>`);
      } else if (__props.empty) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length)} class="empty-cell">${ssrInterpolate(__props.emptyText)}</td></tr>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</tbody></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DataGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {},
    message: {}
  },
  emits: ["cancel", "confirm"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="modal-backdrop"><section class="modal confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><div class="modal-header"><h2 id="confirm-title">${ssrInterpolate(__props.title)}</h2><button class="icon-button ghost" type="button" aria-label="Fechar">`);
          _push2(ssrRenderComponent(unref(X), { size: 18 }, null, _parent));
          _push2(`</button></div><p class="muted">${ssrInterpolate(__props.message)}</p><div class="modal-actions"><button class="button secondary" type="button">Cancelar</button><button class="button danger" type="button">`);
          _push2(ssrRenderComponent(unref(Trash2), { size: 16 }, null, _parent));
          _push2(` Excluir </button></div></section></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConfirmDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useApiError() {
  function readApiError(error) {
    const response = error;
    const data = response.data;
    if (data == null ? void 0 : data.errors) {
      return Object.values(data.errors).flat().join(" ");
    }
    return (data == null ? void 0 : data.detail) || (data == null ? void 0 : data.title) || response.message || "Nao foi possivel concluir a operacao.";
  }
  return { readApiError };
}
function useCategories() {
  const config = useRuntimeConfig();
  const categorias = ref([]);
  const loading = ref(false);
  const errorMessage = ref("");
  const sortByName = (items) => [...items].sort((left, right) => left.nome.localeCompare(right.nome, "pt-BR"));
  async function fetchCategories() {
    loading.value = true;
    errorMessage.value = "";
    try {
      categorias.value = await $fetch(`${config.public.apiBase}/categorias`);
    } catch (error) {
      errorMessage.value = useApiError().readApiError(error);
    } finally {
      loading.value = false;
    }
  }
  async function createCategory(payload) {
    const created = await $fetch(`${config.public.apiBase}/categorias`, {
      method: "POST",
      body: payload
    });
    categorias.value = sortByName([...categorias.value, created]);
    return created;
  }
  async function updateCategory(id, payload) {
    const updated = await $fetch(`${config.public.apiBase}/categorias/${id}`, {
      method: "PUT",
      body: payload
    });
    categorias.value = sortByName(categorias.value.map((item) => item.id === id ? updated : item));
    return updated;
  }
  async function deleteCategory(id) {
    await $fetch(`${config.public.apiBase}/categorias/${id}`, { method: "DELETE" });
    categorias.value = categorias.value.filter((item) => item.id !== id);
  }
  return {
    categorias,
    loading,
    errorMessage,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}

export { _sfc_main$2 as _, _sfc_main$1 as a, _sfc_main as b, useApiError as c, useCategories as u };;globalThis.__timing__.logEnd('Load chunks/build/useCategories-BYF4e-XE');
//# sourceMappingURL=useCategories-BYF4e-XE.mjs.map
