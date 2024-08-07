import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import { PageRoutes } from "./lib/constants";
import Invoices from "./pages/Invoices";
import Home from "./pages/home";
import Members from "./pages/members";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaOpencart, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import Products from "./pages/products";
import TestPage from "./pages/test";
import { useContext } from "react";
import { AppContext } from "./lib/contexts/appcontext";

export const APP_MENU: MenuItem[] = [
  {
    id: 1,
    label: "Orders",
    icon: <FaOpencart />,
    route: "/",
  },
  {
    id: 2,
    label: "Invoices",
    icon: <FaFileInvoiceDollar />,
    route: "/invoices",
  },
  {
    id: 3,
    label: "Members",
    icon: <FaUsers />,
    route: "/members",
  },
  {
    id: 4,
    label: "Products",
    icon: <MdOutlineProductionQuantityLimits />,
    route: "/products",
  },
];

function App() {
  const { appState } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoutes.Login}
          element={
            appState?.isUserLoggedIn ? (
              <Home
                menuItems={APP_MENU}
                selectedMenuId={APP_MENU[0].id}
                username={appState.username}
              />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path={PageRoutes.Home}
          element={
            <Home
              menuItems={APP_MENU}
              selectedMenuId={APP_MENU[0].id}
              username={appState.username}
            />
          }
        />
        <Route
          path={PageRoutes.Invoices}
          element={
            <Invoices
              menuItems={APP_MENU}
              selectedMenuId={APP_MENU[1].id}
              username={appState.username}
            />
          }
        />
        <Route
          path={PageRoutes.Members}
          element={
            <Members
              menuItems={APP_MENU}
              selectedMenuId={APP_MENU[2].id}
              username={appState.username}
            />
          }
        />
        <Route
          path={PageRoutes.Products}
          element={
            <Products
              menuItems={APP_MENU}
              selectedMenuId={APP_MENU[3].id}
              username={appState.username}
            />
          }
        />
        <Route
          path={PageRoutes.Test}
          element={
            <TestPage
              menuItems={APP_MENU}
              selectedMenuId={APP_MENU[0].id}
              username={appState.username}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
