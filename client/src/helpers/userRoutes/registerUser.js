// src/api/registerUser.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (
  formData,
  displayMessage,
  setSuccessMessage,
  setErrorMessage,
  navigate
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      displayMessage(setSuccessMessage, `Successfully registered!`);

      // const { user } = result;
      // sessionStorage.setItem("isLoggedIn", "true");
      // sessionStorage.setItem("email", user.email);
      // sessionStorage.setItem("username", user.username);
      // navigate("/dashboard"); // Redirect to dashboard or specified URL
    } else if (response.status === 409) {
      displayMessage(
        setErrorMessage,
        "User already exists. Please try logging in."
      );
    } else {
      displayMessage(
        setErrorMessage,
        result.message || "Sign up failed, please try again."
      );
    }
  } catch (error) {
    displayMessage(
      setErrorMessage,
      "Error during sign-up, please try again later."
    );
  }
};
