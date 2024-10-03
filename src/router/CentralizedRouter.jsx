import LayOut from "../components/LayOut/LayOut.jsx";
import NotFound from "../components/LayOut/NotFound/NotFound.jsx";
import Home from "../components/LayOut/Home/Home.jsx";
import Explore from "../components/LayOut/Explore/Explore.jsx";
import Featured from "../components/LayOut/Featured/Featured.jsx";
import { useRoutes } from "react-router";
import Product from "../components/LayOut/Product/Product.jsx";

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
          <Featured
            header="NEW IN"
            text="All our newest Jellycats in one place!"
          />
        ),
      },
      {
        path: "/bestsellers",
        element: (
          <Featured
            Featured
            header="Best Sellers"
            text="As chosen by you, these are the all-time favorite friends for all occasions."
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
