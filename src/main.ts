import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./assets/css/index.less";
import router from "./router";
import registerIcons from "./global/register-icons";
import store from "./store";

const app = createApp(App);
app.use(registerIcons);
app.use(store);
app.use(router);

app.mount("#app");
