const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const deleteUser = async (id) => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteUser`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id}),
        credentials: "include",
      });

      if (response.ok) {
        alert("Your account has been deleted successfully.");
        // Redirect to home or login page
        window.location.href = "/login";
      } else {
        alert("There was an issue deleting your account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  }
};

export default deleteUser;