import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import { Home } from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",   
        element: <Home />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />
  }
]);