import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import SignIn from "./pages/signin";
import { PageRoutes } from "./lib/constants";
import Invoices from "./pages/Invoices";
import Home from "./pages/home";
import Members from "./pages/members";
import { FaOpencart, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";

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
];

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path={PageRoutes.Home}
            element={
              <Home menuItems={APP_MENU} selectedMenuId={APP_MENU[0].id} />
            }
          />
          <Route path={PageRoutes.Login} element={<SignIn />} />
          <Route
            path={PageRoutes.Invoices}
            element={
              <Invoices menuItems={APP_MENU} selectedMenuId={APP_MENU[1].id} />
            }
          />
          <Route
            path={PageRoutes.Members}
            element={
              <Members menuItems={APP_MENU} selectedMenuId={APP_MENU[2].id} />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
