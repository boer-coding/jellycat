import { useRoutes } from "react-router";

import LayOut from "../components/LayOut/LayOut.jsx";
import NotFound from "../components/Shared/NotFound/NotFound.jsx";
import Home from "../components/HomePage/Home.jsx";
import Explore from "../components/ExplorePage/Explore.jsx";
import BestNew from "../components/BestNewPage/BestNew.jsx";
import Product from "../components/ProductPage/Product.jsx";
import Login from "../components/UserPage/LoginPage/Login.jsx";
import Dashboard from "../components/UserPage/Dashboard/Dashboard.jsx";

const routerList = [
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/explore",
        element: <Explore />,
        children: [{ path: ":category", element: <Explore /> }],
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/newin",
        element: (
          <BestNew
            header="NEW IN"
            text="All our newest Jellycats in one place!"
          />
        ),
      },
      {
        path: "/bestsellers",
        element: (
          <BestNew

            header="Best Sellers"
            text="As chosen by you, these are the all-time favorite friends for all occasions."
          />
        ),
      },
      {
        path: "/login",
        element: (
          <Login
          />
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Dashboard
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default function CentralizedRouter() {
  let element = useRoutes(routerList);
  return element;
}
