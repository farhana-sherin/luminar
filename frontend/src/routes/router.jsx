import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import { Home } from "../pages/Home";
<<<<<<< HEAD
import DashboardLayout from "../Layouts/DashboardLayout";
 
=======
>>>>>>> 14195bcf37cabaf03f660fe1c81df120fb6df481

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
<<<<<<< HEAD
        path: "/",   
        element: <Home />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />
  }
=======
        index: true,
        element: <Home />,
      },
    ],
  },
  
>>>>>>> 14195bcf37cabaf03f660fe1c81df120fb6df481
]);