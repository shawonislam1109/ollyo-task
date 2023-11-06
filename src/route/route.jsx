import { createBrowserRouter } from "react-router-dom";
import MainSection from "../component/MainSection";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainSection />,
  },
]);

export default route;
