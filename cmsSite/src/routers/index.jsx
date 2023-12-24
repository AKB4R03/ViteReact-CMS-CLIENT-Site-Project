import { createBrowserRouter, redirect } from "react-router-dom";
import AddCuisine from "../views/addCuisine";
import AddUser from "../views/AddUser";
import Home from "../views/home";
import Login from "../views/login";
import Parent from "../views/parent";
import UpdateCuisine from "../views/updateCuisine";
import UploadImg from "../views/uploadImg";

const router = createBrowserRouter([
  {
    element: <Parent />,
    children: [
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/addCuisine",
        element: <AddCuisine />,
      },
      {
        path: "/updateCuisine/:id",
        element: <UpdateCuisine />,
      },
      {
        path: "/uploadImage/:id",
        element: <UploadImg />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
]);

export default router;
