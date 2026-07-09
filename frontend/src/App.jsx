import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Navigationbar } from "./components/navbar.jsx";
import { Login } from "./components/Login.jsx";
import Products from "./components/Products.jsx";
import ContactDetails from "./components/ContactDetails.jsx";
import { Homepage } from "./components/Homepage.jsx";
import { PrivateRoute } from "./components/PrivateRoute";
import { ROLES } from "./constants/RoleConstants.js";
import Dashboard from "./components/Dashboard.jsx";
import { RegistrationForm } from "./components/RegistrationForm.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserOrders } from "./components/UserOrders.jsx";
import AboutUs from "./components/AboutUs.jsx";
import { Footer } from "./components/Footer.jsx";
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Navigationbar />
              <Homepage />
            </>
          }
        />

        <Route
          path="/contactus"
          element={
            <>
              <Navigationbar />
              <ContactDetails />
            </>
          }
        />

        <Route
          path="/aboutus"
          element={
            <>
              <Navigationbar />
              <AboutUs />
            </>
          }
        />
        <Route
          path="/add-product"
          element={
            <>
              <Navigationbar />
              <Products />
            </>
          }
        />

        {/* <Route
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.CUSTOMER]} />
          }
        >
          <Route
            path="/"
            element={
              <>
                <Navigationbar />
                <Homepage />
              </>
            }
          />
        </Route> */}

        <Route element={<PrivateRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          {/* <Route
            path="/add-product"
            element={
              <>
                <Navigationbar />
                <Products />
              </>
            }
          /> */}
          <Route
            path="/getUserOrders"
            element={
              <>
                <Navigationbar />
                <UserOrders />
              </>
            }
          />

          {/* <Route
            path="/contactus"
            element={
              <>
                <Navigationbar />
                <ContactDetails />
              </>
            }
          />

          <Route
            path="/aboutus"
            element={
              <>
                <Navigationbar />
                <AboutUs />
              </>
            }
          /> */}
        </Route>
        
        <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route
            path="/getAllOrders"
            element={
              <>
                <Navigationbar />
                <Dashboard />
              </>
            }
          />
        </Route>

        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
