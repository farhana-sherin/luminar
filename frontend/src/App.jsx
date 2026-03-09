import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { InstallPrompt } from "./components/InstallPrompt";
import { StartupSplash } from "./components/StartupSplash";

function App() {
  const [showStartupSplash, setShowStartupSplash] = useState(true);

  return (
    <>
      <RouterProvider router={router} />
      <InstallPrompt />
      {showStartupSplash && (
        <StartupSplash onComplete={() => setShowStartupSplash(false)} />
      )}
    </>
  );
}

export default App;
