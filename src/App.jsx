import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./RootLayot";
import HomePage from "./components/Home/HomePage";
import QuizPage from "./components/Quiz/QuizPage";
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
          path:"/quiz/:subjectCode",
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
