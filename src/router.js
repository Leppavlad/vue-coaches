import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList";
import RequestReceived from "./pages/requests/RequestReceived";
import WrongPage from "./pages/WrongPage";
import store from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      name: "coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      name: "coach-details",
      component: () => import("./pages/coaches/CoachDetails"),
      props: true,
      children: [
        {
          path: "contact",
          name: "contact-coach",
          component: () => import("./pages/requests/ContactCoach"),
        },
      ],
    },
    {
      path: "/auth",
      name: "autorization",
      component: () => import("./pages/auth/UserAuth"),
      meta: {
        requiresNotAuth: true,
      },
    },
    {
      path: "/register",
      name: "coach-registration",
      component: () => import("./pages/coaches/CoachRegistration"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/requests",
      name: "send-request",
      component: RequestReceived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:anything(.*)",
      component: WrongPage,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("auth");
  } else if (to.meta.requiresNotAuth && store.getters.isAuthenticated) {
    next("coaches");
  } else next();
});

export default router;
