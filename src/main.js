import { defineAsyncComponent } from "vue";
import { createApp } from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App";

const asyncComponents = {
  BaseDialog: null,
  BaseOverlay: null,
};
for (let component of Object.keys(asyncComponents)) {
  asyncComponents[component] = defineAsyncComponent(() =>
    import("./components/base/" + component)
  );
}

import BaseCard from "./components/base/BaseCard";
import BaseButton from "./components/base/BaseButton";
import BaseBadge from "./components/base/BaseBadge";
import BaseSpinner from "./components/base/BaseSpinner";

const app = createApp(App);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", asyncComponents.BaseDialog);
app.component("base-overlay", asyncComponents.BaseOverlay);

app
  .use(router)
  .use(store)
  .mount("#app");
