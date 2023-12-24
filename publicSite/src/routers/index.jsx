import { createBrowserRouter } from "react-router-dom";
import Detail from "../views/detail";
import Parent from "../views/parent";
import Home2 from "../views/home2";
const router = createBrowserRouter([
  {
    element: <Parent />,
    children: [
      {
        path: "/",
        element: <Home2 />,
      },
      {
        path: "/:query",
        element: <Home2 />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
