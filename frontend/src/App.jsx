import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { InstallPrompt } from "./components/InstallPrompt";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <InstallPrompt />
    </>
  );
}

export default App;
