// src/api/registerUser.js


export const registerUser = async (formData, displayMessage, setSuccessMessage, setErrorMessage, navigate) => {

    try {
      const response = await fetch("https://jellycat-backend-14f22f6178c9.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        displayMessage(
          setSuccessMessage,
          `Successfully registered, welcome to Jellycat ${formData.username}!`
        );
  
        const { user } = result;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("username", user.username);
        navigate("/dashboard"); // Redirect to dashboard or specified URL      } else if (response.status === 409) {
        displayMessage(setErrorMessage, "User already exists. Please try logging in.");
      } else {
        displayMessage(setErrorMessage, result.message || "Sign up failed, please try again.");
      }
    } catch (error) {
      displayMessage(setErrorMessage, "Error during sign-up, please try again later.");
    }
  };
  