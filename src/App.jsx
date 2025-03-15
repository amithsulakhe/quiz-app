import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./root-layot";
import ErrorPage from "./components/error-page";
import { lazy, Suspense } from "react";
import Loader from "./components/Quiz/loader";

// lazy loading and code splitting
const HomePage=lazy(()=>import("./components/Home/home-page"))
const QuizChat=lazy(()=>import("./components/chat/quiz-chat"))


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
