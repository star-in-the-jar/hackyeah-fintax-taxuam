import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./components/RoutesDefinition";
import "./markdown.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
