import { Navigate, Outlet } from "react-router-dom";
import { getToken, removeToken } from "../services/TokenService";
import { getRole } from "../services/RoleService";
import { AccessDenied } from "./AccessDenied";
import { Navigationbar } from "./navbar.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function PrivateRoute({ allowedRoles }) {
  const token = getToken();
  const role = getRole();

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // If no token, mark invalid (this will cause redirect)
    if (!token) {
      setIsValid(false);
      return;
    }

    let timeoutId = null;

    try {
      const decoded = jwtDecode(token);

      // decoded.exp is in seconds since epoch
      const msUntilExpiry =
        decoded && decoded.exp ? decoded.exp * 1000 - Date.now() : null;

      if (!msUntilExpiry || msUntilExpiry <= 0) {
        // already expired
        removeToken();
        setIsValid(false);
        return;
      }

      // Schedule a single timeout to run when the token expires
      timeoutId = setTimeout(() => {
        removeToken();
        setIsValid(false);
      }, msUntilExpiry);
    } catch (err) {
      // invalid token
      console.error("Invalid token in PrivateRoute:", err);
      removeToken();
      setIsValid(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token]);

  // If token missing or invalid/expired, redirect to login
  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  // If token present and role allowed, render nested routes
  if (token) {
    if (allowedRoles.includes(role)) {
      return <Outlet />;
    } else {
      // Unauthorized role — show AccessDenied WITH navbar (keeps your original UX)
      return (
        <>
          <Navigationbar />
          <AccessDenied />
        </>
      );
    }
  }

  // Fallback: redirect to login
  return <Navigate to="/" replace />;
}

//OG Code
// export function PrivateRoute({ allowedRoles }) {
//   const token = getToken();
//   const role = getRole();

//   if (token) {
//     if (allowedRoles.includes(role)) {
//       // ✅ Authorized → show requested component
//       return <Outlet />;
//     } else {
//       // ❌ Unauthorized → show AccessDenied WITH navbar
//       return (
//         <>
//           <Navigationbar />
//           <AccessDenied />
//         </>
//       );
//     }
//   } else {
//     // ⛔ No token → redirect to login or home
//     return <Navigate to="/" replace />;
//   }
// }
