import { defineComponent, withAsyncContext, useSSRContext } from "vue";
import { n as navigateTo } from "../server.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/ProjetosC/teste/frontend/node_modules/hookable/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/unctx/dist/index.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/ProjetosC/teste/frontend/node_modules/defu/dist/defu.mjs";
import "D:/ProjetosC/teste/frontend/node_modules/ufo/dist/index.mjs";
import "vue/server-renderer";
import "@lucide/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => navigateTo("/categorias", { replace: true })), await __temp, __restore();
    return () => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CMMVxCnP.js.map
