const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (formData) => {
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
    } else {
      return {
        error:
          result.message || "Sign in failed, please check your credentials.",
      };
    }
  } catch (error) {
    return { error: "Error during sign-in, please try again later." };
  }
};
