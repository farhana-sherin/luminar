import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import { Home } from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Dresses from "../components/dashboard/Dresses";
import DressDetail from "../pages/DressDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dress/:id",
        element: <DressDetail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
     children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "dresses",
        element: <Dresses />
      }
     ]
  }
  
]);