const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const updateUser = async (newUsername, email) => {
  try {
    const response = await fetch("http://localhost:8080/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername, email }),
    });

    if (!response.ok) {
      throw new Error("Error updating username");
    }

    return "Username updated successfully";
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate error for handling by calling function
  }
};

export default updateUser;
