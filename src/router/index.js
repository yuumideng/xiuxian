import { createRouter, createWebHistory } from 'vue-router'
import SaveSelect from '../views/SaveSelect.vue'
import CreateCharacter from '../views/CreateCharacter.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'SaveSelect',
    component: SaveSelect
  },
  {
    path: '/create-character',
    name: 'CreateCharacter',
    component: CreateCharacter
  },
  {
    path: '/game',
    name: 'Game',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
