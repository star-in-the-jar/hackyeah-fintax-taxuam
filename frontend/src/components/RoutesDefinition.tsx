import HomeView from "./views/Home";
import DocumentView from "./views/Document";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<HomeView />} />
      <Route path="/document/:id" element={<DocumentView />} />
    </>
  )
);

export default router;
