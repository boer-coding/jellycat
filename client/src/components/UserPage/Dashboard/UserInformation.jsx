import React from "react";

const UserInformation = (props) => {
  const {email, username} = props;
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
