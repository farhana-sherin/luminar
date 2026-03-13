import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import { Home } from "../pages/Home";
import Collections from "../pages/Collections";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Dresses from "../components/dashboard/Dresses";
import DressDetail from "../pages/DressDetail";
import Orders from "../pages/Orders";
import BookedDresses from "../pages/BookedDresses";
import AvailableDresses from "../pages/AvailableDresses";
import OrderDetail from "../pages/OrderDetail";

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
        path: "collections",
        element: <Collections />,
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
        element: <Dashboard />,
      },
      {
        path: "dresses",
        element: <Dresses />,
      },
      {
        path: "booked-dresses",
        element: <BookedDresses />,
      },
      {
        path: "available-dresses",
        element: <AvailableDresses />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "order/:id",
        element: <OrderDetail />,
      },
    ],
  },
]);