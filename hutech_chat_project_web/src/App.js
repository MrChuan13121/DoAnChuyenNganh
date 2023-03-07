import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { adminRouter, staffRouter, publicRouter } from "./router/index";
import SignIn from "./pages/authen/SignIn";
import CheckRole from "./components/CheckRole";
import IsAuth from "./components/IsAuth";
import HomeAdmin from "./pages/admin/HomeAdmin";

import { useEffect } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<IsAuth />}>
          <Route element={<CheckRole role="admin" />}>
            {adminRouter.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<HomeAdmin children={<Page />} />}
                />
              );
            })}
          </Route>
          <Route element={<CheckRole role="personnel" />}>
            {staffRouter.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        </Route>
        {publicRouter.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
