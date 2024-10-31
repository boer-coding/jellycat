// src/api/loginUser.js


export const loginUser = async (formData, displayMessage, setErrorMessage, navigate) => {

    try {
      const response = await fetch("https://jellycat-backend-14f22f6178c9.herokuapp.com/login", {
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
        console.log("ser",user)
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("username", user.username);
        navigate("/dashboard"); // Redirect to dashboard or specified URL
      } else {
        displayMessage(
          setErrorMessage,
          result.message || "Sign in failed, please check your credentials."
        );
      }
    } catch (error) {
      displayMessage(setErrorMessage, "Error during sign-in, please try again later.");
    }
  };
  