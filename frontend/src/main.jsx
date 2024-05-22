import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./store.jsx";

// React router
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home.jsx";
import AddAds from "./Pages/AddAds/AddAds.jsx";
import AdsPage from "./Pages/AdsPage/AdsPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import AddDepoiment from "./Pages/AddDepoiment/AddDepoiment.jsx";
import GetAds from "./Pages/GetAll/GetAds.jsx";
import GetDepoiments from "./Pages/GetAll/GetDepoiments.jsx";
import UpdateAds from "./Pages/AddAds/UpdateAds.jsx";
import SearchResultsPage from "./Pages/GetAll/SearchResultsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/createAds",
        element: <AddAds />,
      },
      {
        path: "/ads/:id",
        element: <AdsPage />,
      },
      {
        path: "/createDepoiment",
        element: <AddDepoiment />,
      },
      {
        path: "/Ads",
        element: <GetAds />,
      },
      {
        path: "/depoiments",
        element: <GetDepoiments />,
      },
      {
        path: "/updateAds/:id",
        element: <UpdateAds />,
      },
      {
        path: "/search/:keyword?/:methodOfSale?/:typeOfRealty?/:city?/:district?/:minPrice?/:maxPrice?/minSpace?/:maxSpace?/",
        element: <SearchResultsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
