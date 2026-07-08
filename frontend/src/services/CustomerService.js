

export async function registerCustomer(formData) {
  try {
    const response = await fetch("http://localhost:5700/register", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}



// export async function placeOrder(formData) {
//   try {
//     const response = await fetch("http://localhost:5700/register/add", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
