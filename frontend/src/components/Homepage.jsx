import Bestsellers from "./Bestsellers";
import { AddCarousel } from "./Carousel";
import CelebrationsCalendar from "./Celebration";
import { Navigationbar } from "./navbar";
import { useEffect, useState } from "react";
export function Homepage(){

    const [username, setUsername] = useState("");
    
      useEffect(() => {
        // Fetch user from localStorage
        const userData = localStorage.getItem("user");
        if (!userData) return;
    
        try {
          const parsed = JSON.parse(userData);
          if (parsed && parsed.username) {
            setUsername(parsed.username);
          }
        } catch (err) {
          // if parsing fails, keep username empty and log the problem
          console.error("Failed to parse user from localStorage:", err);
        }
      }, []);



    return (
        <>
          <Navigationbar />
          <AddCarousel />
          <div
            className="text-center mt-4 mb-4"
            style={{
              fontSize: "1.25rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Hi{username ? `, ${username}` : ""}. <br />
            Looking for anything?
          </div>
          <CelebrationsCalendar />
          <Bestsellers />
        </>
      );
}