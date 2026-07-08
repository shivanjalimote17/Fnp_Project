import axios from "axios";

export async function login(data) {
  try {
    const response = await axios.post("http://localhost:5700/login", data);
    return response; // success (status 200)
  // const { token, userId, role } = response.data;

  //   // Store in localStorage
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("userId", userId);
  //   localStorage.setItem("role", role);

    
  } catch (error) {
    // forward backend error message to caller (Login.jsx)
    if (error.response) throw error;
    else throw new Error("Network error. Please try again.");
  }
}
