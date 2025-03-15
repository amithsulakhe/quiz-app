import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "./components/theme-provider";
import OfflineOnlineProvider from "./offline-online-provider";
import { Toaster } from "./components/ui/sonner";

// main file
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OfflineOnlineProvider>
      <ThemeProvider defaultTheme="dark" storageKey="quiz-ui-theme">
        <Provider store={store}>
          <Toaster
            position="top-right"
            richColors 
            closeButton 
          />
          <App />
        </Provider>
      </ThemeProvider>
    </OfflineOnlineProvider>
   </StrictMode>
);
