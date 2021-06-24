import React from "react";

function User({ user }) {
  return (
    <li>
      <h3>
        {user.name} {user.surname}
      </h3>
      <p>{user.desc}</p>
    </li>
  );
}

export default User;
