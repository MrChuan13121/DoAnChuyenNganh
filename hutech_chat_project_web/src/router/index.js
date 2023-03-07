import React from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import SignIn from "../pages/authen/SignIn";
import Home from "../pages/staff/Home";
import Homeadmin from "../components/Admin/Home";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Forbidden from "../pages/Error/403";
import NotFound from "../pages/Error/404";
import Book from "../components/Admin/Book";
import Patient from "../components/Admin/Patient";
import Personnel from "../components/Admin/Personnel";
import Services from "../components/Admin/Services";

const adminRouter = [
  { path: "/admin", component: Homeadmin },
  { path: "/book", component: Book },
  { path: "/patient", component: Patient },
  { path: "/personnel", component: Personnel },
  { path: "/services", component: Services },
];

const staffRouter = [{ path: "/home", component: Home }];

const publicRouter = [
  { path: "/403", component: Forbidden },
  { path: "/404", component: NotFound },
];
export { adminRouter, staffRouter, publicRouter };
