import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./root-layot";
import ErrorPage from "./components/error-page";
import { lazy, Suspense } from "react";
import Loader from "./components/quiz/loader.jsx";
import HomePage from "./components/home/home-page.jsx";
import QuizChat from "./components/chat/quiz-chat.jsx";

// lazy loading and code splitting


const App = () => {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayot />,
      errorElement:<ErrorPage />,
      children:[
        {
          path:"/",
          element:<HomePage />
        },
        {
          path:"/quiz/:subjectCode",
          element:<QuizChat />
        }
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  );
};

export default App;
