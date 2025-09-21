import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home"

const router = createBrowserRouter([
  { path: "/", Component: Home }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}