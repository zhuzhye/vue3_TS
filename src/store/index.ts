import { createPinia } from "pinia";
import useLoginStore from "./login/login";
import type { App } from "vue";
const pinia = createPinia();

function registerStore(app: App<Element>) {
  app.use(pinia);
  const useLoginStores = useLoginStore();
  useLoginStores.loadLocalCacheAction();
}
export default registerStore;
