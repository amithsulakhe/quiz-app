import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayot from "./RootLayot";
import HomePage from "./components/Home/HomePage";
import QuizChat from "./components/Chat/QuizChat";
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
