import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home"
import Author from "../pages/Author"
import Literary from "../pages/Literary"
import LiteraryCategory from "../pages/LiteraryCategory"
import Period from "../pages/Period"
import Login from "../pages/Login"
import Register from "../pages/Register" 

const Routes = () => {

  const routesForPublic = [
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: '/register',
      element: <Register />
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
            path: "/home",
            element: <Home/>,
        },
        {
            path: "/author",
            element: <Author/>,
        },
        {
            path: "/literary",
            element: <Literary/>,
        },
        {
          path: "/literary-category",
          element: <LiteraryCategory/>
        },
        {
          path : "/period",
          element: <Period/>
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;