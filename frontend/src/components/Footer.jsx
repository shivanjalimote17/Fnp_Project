import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const location = useLocation();

  // Hide footer on login and registration pages
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer
      className="text-center py-10"
      style={{
        backgroundRepeat: "no-repeat",
      }}
    >
      <ul className="footer-links mb-6 text-sm tracking-wide">
        <li>
          <a href="#" className="hover:underline">
            FAQ
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Returns
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Shipping
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Store Finder
          </a>
        </li>
      </ul>

      <div className="text-xs space-x-3 text-gray-600">
        <span>SITE BY FERN & PETALS TEAM</span>
        <br />
        <span>© {new Date().getFullYear()} Fern & Petals</span>
        <br />
        <span>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Legal Notice
          </a>
        </span>
      </div>
    </footer>
  );
};
