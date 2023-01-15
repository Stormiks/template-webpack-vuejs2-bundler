import device from "@assets/js/device-init";
import store from '../store'; // your vuex store

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/auth')
//   } else {
//     next()
//   }
// })

export default [{
    path: "/",
    component: () => import("@pages/Home"),
    redirect: "/auth",
    meta: {
      layout: `${device.typeDevice}-layout`,
    },
  },
  {
    path: "/auth",
    component: () => import("@pages/auth"),
    meta: {
      layout: `${device.typeDevice}-layout`,
      bgColor: "#fff" // Передаём цвет фона страницы
    }
  },
  {
    path: "/404",
    component: () => import("@pages/error/404"),
    meta: {
      layout: `$ {
        device.typeDevice
      } - layout`,
      bgColor: "#f6f6f6"
    }
  },
  {
    path: "*",
    redirect: "/404",
    meta: {
      layout: `${device.typeDevice}-layout`,
    }
  },
];
