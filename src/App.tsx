import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'; 
import{ store} from './lib/store';
import SignIn from "./pages/signin";
import { PageRoutes } from "./lib/constants";
import Invoices from "./pages/Invoices";
import Home from "./pages/home";
import Users from "./pages/users";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* <Route path={PageRoutes.Home} element={<Dashboard />} /> */}
        <Route path={PageRoutes.Home} element={<Home />} />
        <Route path={PageRoutes.Login} element={<SignIn />} />
        <Route path={PageRoutes.Invoices} element={<Invoices />} />
        <Route path={PageRoutes.Users} element={<Users/>} />

      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
