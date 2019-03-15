import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Signup from './views/Signup.vue'
import ConversationsId from './views/ConversationsId.vue'
import ConversationsIndex from './views/ConversationsIndex.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/conversations/:id', name: 'messages-index', component: ConversationsId },
    { path: '/conversations', name: 'conversations-index', component: ConversationsIndex }

  ]
})
