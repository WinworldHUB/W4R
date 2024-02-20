import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import { PageRoutes } from "./lib/constants";
import Invoices from "./pages/Invoices";
import Home from "./pages/home";
import Members from "./pages/members";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaOpencart, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import Products from "./pages/products";
import CreateOrder from "./lib/components/create-order";

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
  return (
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
        <Route
          path={PageRoutes.Products}
          element={
            <Products menuItems={APP_MENU} selectedMenuId={APP_MENU[3].id} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
