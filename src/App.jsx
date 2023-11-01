import { RouterProvider } from "react-router-dom";
import route from "./route/route";

function App() {
  return (
    <div className="  mt-2 content-baseline w-9/12 shadow-md  mx-auto">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
