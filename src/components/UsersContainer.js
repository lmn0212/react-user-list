import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../app/user/userActions";
import User from "./User";
import Pagination from "./Pagination";

function UsersContainer() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [usersPerPage] = useState(5);
  const [currPage, setcurrPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const indexOfLastUser = currPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setcurrPage(pageNumber);
  return userData.loading ? (
    <h1>Loading...</h1>
  ) : userData.error ? (
    <h1>{userData.error}</h1>
  ) : (
    <div>
      <h1>Users List</h1>
      <ul className="user-list">
        {userData &&
          userData.users &&
          currentUsers.map((user) => <User key={user.id} user={user} />)}
      </ul>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={userData.users.length}
        paginate={paginate}
      />
    </div>
  );
}

export default UsersContainer;
