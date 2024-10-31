import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Track if it's sign-up or sign-in
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [emailError, setEmailError] = useState(false); // Track email validation error
  const [usernameError, setUsernameError] = useState(false); // Track username validation error
  const [successMessage, setSuccessMessage] = useState(""); // Track the success message
  const [errorMessage, setErrorMessage] = useState(""); // Track the error message
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  }); // Track form data

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    return username.trim() !== ""; // Check if the username is not empty
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(!validateEmail(value));
    }

    if (name === "username") {
      setUsernameError(!validateUsername(value));
    }
  };

  const displayMessage = (setMessage, message, delay = 3000) => {
    setMessage(message); // Set the success message
    setTimeout(() => {
      setMessage(""); // Clear the success message after the delay
    }, delay);
  };

  const handleSubmit = async () => {
    setSuccessMessage(""); // Reset success message
    setErrorMessage(""); // Reset error message

    if (isSignUp) {
      // Front-end validation for username
      if (!validateUsername(formData.username)) {
        setUsernameError(true); // Show username error if empty
        setErrorMessage("Username is required.");
        return; // Prevent form submission if username is invalid
      }

      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Ensure cookies (session cookies) are included
        });

        const result = await response.json();

        if (response.ok) {
          displayMessage(
            setSuccessMessage,
            `Successfully registered, welcome to Jellycat ${formData.username}!`
          );

          // Redirect to dashboard after successful registration and login
          const { user } = result;
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("email", user.email);
          sessionStorage.setItem("username", user.username);
          window.location.href = result.redirectUrl;
        } else if (response.status === 409) {
          // Handle duplicate user error
          displayMessage(
            setErrorMessage,
            "User already exists. Please try logging in."
          );
        } else {
          // Handle other errors returned from the server
          displayMessage(
            setErrorMessage,
            result.message || "Sign up failed, please try again."
          );
        }
      } catch (error) {
        // Handle network or other fetch-related errors
        displayMessage(
          setErrorMessage,
          "Error during sign-up, please try again later."
        );
      }
    } else {
      // Handle Sign In
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include", // Ensure cookies (session cookies) are included in the request
        });

        const result = await response.json();

        if (response.ok) {
          const { user } = result;
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("email", user.email);
          sessionStorage.setItem("username", user.username);
          window.location.href = result.redirectUrl;
        } else {
          displayMessage(
            setErrorMessage,
            result.message || "Sign in failed, please check your credentials."
          );
        }
      } catch (error) {
        displayMessage(
          setErrorMessage,
          "Error during sign-in, please try again later."
        );
      }
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true); // Switch to Sign Up mode
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      {/* Conditionally render login form or success message based on login status */}

      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        {/* Conditionally render success or error messages */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#333" }}
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>

        {/* Common Email Field */}
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: "#333" } }}
          InputProps={{ style: { color: "#333" } }}
          error={emailError}
          helperText={emailError ? "Invalid email format" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333",
              },
            },
          }}
        />

        {isSignUp && (
          <>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#333" } }}
              InputProps={{ style: { color: "#333" } }}
              error={usernameError}
              helperText={usernameError ? "Username is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#333",
                  },
                },
              }}
            />
          </>
        )}

        {/* Password Field with Toggle */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: "#333" } }}
          InputProps={{
            style: { color: "#333" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  sx={{ color: "#333" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333",
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit} // Attach the handleSubmit function to handle both sign in and sign up
          sx={{
            bgcolor: "#333",
            color: "white",
            padding: "12px 0",
            marginBottom: "16px",
            "&:hover": {
              bgcolor: "#555",
            },
          }}
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </Button>

        {!isSignUp ? (
          <>
            <Typography variant="body2" sx={{ color: "#333" }}>
              Don't have an account?{" "}
              <Button
                sx={{ color: "#3a82f6" }}
                size="small"
                onClick={handleSignUpClick}
              >
                Sign up
              </Button>
            </Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: "#333" }}>
            Already have an account?{" "}
            <Button
              sx={{ color: "#3a82f6" }}
              size="small"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </Button>
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Login;
