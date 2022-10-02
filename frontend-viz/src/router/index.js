import Vue from "vue";
import VueRouter from "vue-router";
import DashBoard from "../components/DashBoard";
import HomePage from "../view/HomePage";
import ViewerCanvas from "../view/ViewerCanvas";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
    meta: {
      title: () => "App: DashBoard",
    },
    props: true,
    children: [
      {
        path: "",
        name: "HomePage",
        component: HomePage,
        props: true,
      },
      {
        path: "/viewer",
        name: "ViewerCanvas",
        component: ViewerCanvas,

        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
