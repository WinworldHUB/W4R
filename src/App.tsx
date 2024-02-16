import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import { PageRoutes } from "./lib/constants";
// import Dashboard from "./pages/dashboard";
import Invoices from "./pages/Invoices";
import Home from "./pages/home";
import UserTable from "./lib/components/userTable";
import Users from "./pages/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={PageRoutes.Home} element={<Dashboard />} /> */}
        <Route path={PageRoutes.Home} element={<Home />} />
        <Route path={PageRoutes.Login} element={<SignIn />} />
        <Route path={PageRoutes.Invoices} element={<Invoices />} />
        <Route path={PageRoutes.Users} element={<Users/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
