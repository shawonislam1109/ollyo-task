import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";
import Example from "../component/Demo";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dnd",
    element: <Example />,
  },
]);

export default route;
