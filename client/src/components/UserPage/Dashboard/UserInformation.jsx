import React from "react";
const email = sessionStorage.getItem("email");
const username = sessionStorage.getItem("username");
const UserInformation = () => {
  return (
    <div>
      <h2>User Information</h2>
      {/* Example content */}
      <p>Name: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserInformation;
