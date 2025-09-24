import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/register";

const router = createBrowserRouter([
  { path: "/", Component: <PrivateRoute><Home /></PrivateRoute> },
  { path: "/login", Component: Login}
]); 

export default function AppRouter() {
  return <RouterProvider router={router} />;
}