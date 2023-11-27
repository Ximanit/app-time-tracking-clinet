import MainLayout from "layouts/MainLayout.vue";
import AuthLayout from "src/layouts/AuthLayout.vue";

import IndexPage from "pages/IndexPage.vue";
import TaskPage from "src/pages/TaskPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: IndexPage,
      },
      {
        path: "/task/:id",
        component: TaskPage,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    name: "auth",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
