import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
// import ActionCableVue from 'actioncable-vue';


axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false
// Vue.use(VueResource);


// Vue.use(ActionCableVue, {
//   debug: true,
//   debugLevel: 'error',
//   connectionUrl: 'ws://localhost:3000/api/cable'
// })


new Vue({
  router,
  render: h => h(App),

  // channels: {
  //   MessagesChannel: {
  //                 connected() {},
  //                 received(data) {},
  //                }
  // },

  // methods: {
  //   sendMessage: function() {
  //     this.$cable.perform({
  //       channel: 'ChatChannel',
  //       action: 'send_message',
  //       data: { content: this.message }
  //     });
  //   }
  // },

  // mounted() {
  //   this.$cable.subscribe({ channel: 'MessagesChannel' });
  // }
}).$mount('#app')
