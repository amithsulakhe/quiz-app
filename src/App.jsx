import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./root-layot";
import ErrorPage from "./components/error-page";
import { lazy, Suspense } from "react";
import Loader from "./components/quiz/loader";
import HomePage from "./components/home/home-page";
import QuizChat from "./components/chat/quiz-chat";

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
          element:<Suspense fallback={<Loader/>}><HomePage /></Suspense>
        },
        {
          path:"/quiz/:subjectCode",
          element:<Suspense fallback={<Loader/>}><QuizChat /></Suspense>
        }
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  );
};

export default App;
