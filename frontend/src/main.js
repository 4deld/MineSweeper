import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

import VueMaterial from "vue-material";
import "vue-material/dist/theme/black-green-light.css";
import "vue-material/dist/vue-material.css";
import Directives from "../plugin/directives";

import "expose-loader?$!expose-loader?jQuery!jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://localhost:3000");

Vue.use(VueSocketIOExt, socket);

Vue.use(VueMaterial);

Vue.use(Directives);

//socket을 vue인스턴스 변수로 등록하여 컴포넌트에서 사용할 수 있음
Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
