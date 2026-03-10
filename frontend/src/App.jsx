import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { InstallPrompt } from "./components/InstallPrompt";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <InstallPrompt />
      <Toaster />
    </>
  );
}

export default App;
