import React from "react";
import { NavLink } from "react-router-dom";
import { getRole } from "../services/RoleService";

export function ProtectedLink({ allowedRoles, to, children, ...rest }) {
  const role = getRole();

  // Show link only if role is allowed
  if (allowedRoles.includes(role)) {
    return (
      <NavLink to={to} {...rest} className="nav-link">
        {children}
      </NavLink>
    );
  }

  // Otherwise, hide link completely
  return null;
}
