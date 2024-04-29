import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainLayout from "./layout/MainLayout";
import Home from "./views/Home";
import Tables from "./views/Tables";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/tables" element={<Tables />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
