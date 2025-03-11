import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./RootLayot";
import HomePage from "./pages/home/HomePage";
import QuizPage from "./pages/quiz/QuizPage";
import ErrorPage from "./components/error-page";

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
          path:"/quiz/:subjectId",
          element:<QuizPage />
        }
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  );
};

export default App;
