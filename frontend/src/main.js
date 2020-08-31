import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import store from "./store/index";

import VueMaterial from "vue-material";
import "vue-material/dist/theme/black-green-light.css";
import "vue-material/dist/vue-material.css";
import Directives from "../plugin/directives";


const socket = io("http://localhost:3000");

Vue.use(VueSocketIOExt, socket, { store });

Vue.use(VueMaterial);

Vue.use(Directives);

//socket을 vue인스턴스 변수로 등록하여 컴포넌트에서 사용할 수 있음

// const options = { path: '/my-app/' }; //Options object to pass into SocketIO

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO('#', options), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );

import VModal from 'vue-js-modal'
Vue.use(VModal, {
  dialog: true,
  dynamicDefaults: {
    draggable: true
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");