const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (formData, displayMessage, setErrorMessage, navigate) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      const { user } = result;
      return user; 
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("userId", user.userId);

      navigate("/dashboard");
    } else {
      displayMessage(setErrorMessage, result.message || "Sign in failed, please check your credentials.");
      return null;
    }
  } catch (error) {
    displayMessage(setErrorMessage, "Error during sign-in, please try again later.");
    return null;
  }
};

  