import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../../helpers/userRoutes/registerUser";
import { loginUser } from "../../../helpers/userRoutes/logInUser";
import { useNavigate } from "react-router-dom";
import { setAuthState } from "../../../store/modules/userStore";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Track if it's sign-up or sign-in
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [emailError, setEmailError] = useState(false); // Track email validation error
  const [usernameError, setUsernameError] = useState(false); // Track username validation error
  const [successMessage, setSuccessMessage] = useState(""); // Track the success message
  const [errorMessage, setErrorMessage] = useState(""); // Track the error message
  const [logStatus, setLogStatus] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  }); // Track form data
  const { isLoggedIn } = useSelector(
    (state) => state.userSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if (isLoggedIn ) {
      navigate("/dashboard");
      return;
    }
  },[isLoggedIn])

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
      if (
        !validateUsername(formData.username) &&
        !validateEmail(formData.email)
      ) {
        setUsernameError(true);
        setEmailError(true);
        setErrorMessage("Username and email is required.");
        return;
      } else if (!validateUsername(formData.username)) {
        setUsernameError(true);
        setErrorMessage("Username is required.");
        return;
      } else if (!validateEmail(formData.email)) {
        setEmailError(true);
        setErrorMessage("Email is required.");
        return;
      }

      await registerUser(
        formData,
        displayMessage,
        setSuccessMessage,
        setErrorMessage
      );
    } else {
      const loginResult = await loginUser(formData);

      if (!loginResult.error) {
        sessionStorage.setItem("sessionLogIn", true)
        setLogStatus(true)
        dispatch(
          setAuthState({
            isLoggedIn: true,
            user: {
              email: loginResult.email,
              username: loginResult.username,
              userId: loginResult.userId,
            },
          })
        );
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        console.log("Setting error message:", loginResult.error); // Log the error before setting it
        setErrorMessage(loginResult.error); // Set error message
      }
    }
  };
  // UseEffect to watch errorMessage
  useEffect(() => {
    if (errorMessage) {
      console.log("Displaying error:", errorMessage);
      const timer = setTimeout(() => setErrorMessage(""), 3000); // Clear after delay
      return () => clearTimeout(timer); // Cleanup on re-render
    }
  }, [errorMessage]);

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
