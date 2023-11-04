import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default route;
