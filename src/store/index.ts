import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  devtools: true,
  plugins: [vuexLocal.plugin]
});
