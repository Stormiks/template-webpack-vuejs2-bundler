import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

const router = createVueRouter()
// router.afterEach(function (to,from){
//   $('.navigation-drawer.active').removeClass('active')
//   $('.navigation-drawer-overlay.active').removeClass('active')
// })
export default router

function createVueRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  return router
}
