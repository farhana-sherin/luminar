import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import { DashboardLayout } from "../Layouts/DashboardLayout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Dresses } from "../pages/Dresses";
import { Bookings } from "../pages/Bookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dresses",
        element: <Dresses />,
      },
      {
        path: "products/add",
        element: <Dresses />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
    ],
  },
]);