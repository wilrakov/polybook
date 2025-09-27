import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Register from "../pages/register";
import Login from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  { path: "/register", Component: Register },
  { path: "/login", Component: Login },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
