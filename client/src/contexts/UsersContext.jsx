import React, { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

export const UsersContext = createContext({
  fetchUsers: () => [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  loaded: false,
  loading: false,
  error: null,
  allForms: [],
});


export const UsersProvider = (props) => {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('users')) || [];
  });

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToasts();

  const ALL_USERS_ENDPOINT = 'http://localhost:3000/api/v1/users/';

  const fetchUsers = async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(ALL_USERS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem('users', JSON.stringify(data));
      setUsers(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  ADD_USER_ENDPOINT = "http://localhost:3000/api/v1/users/";

  const addUser = async (subData) => {
    console.log("about to add", subData);
    try {
      const response = await fetch(ADD_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(subData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedUser = await response.json();
      console.log('got new user data', savedUser);
      const newUsers = [...users, savedUser];
      localStorage.setItem("users", JSON.stringify(newUsers));
      setUsers(newUsers);
      addToast(`Saved ${savedUser.name}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: 'error',
      });
    }
  };

  const updateUser = async (id, subData) => {
    console.log("updating", id, subData);
    let updatedUser = null;
    const index = users.findIndex((user) => user._id === id);
    console.log(index);
    if (index === -1) throw new Error(`User with index ${id} not found`);
    const oldUser = users[index];
    console.log("oldUser", oldUser);


    const updates = {};
    for (const key of Object.keys(oldUser)) {
      if (key === "_id") continue;
      if (oldUser[key] !== subData[key]) {
        updates[key] = subData[key];
      }
    }

    try {
      const response = await fetch(`${ALL_USERS_ENDPOINT}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
      });

      if (response.status !== 200) {
        throw response;
      }

      updatedUser = {
        ...oldUser,
        ...subData,
      };
      console.log("updatedUser", updatedUser);
      const updatedUsers = [
        ...users.slice(0, index),
        updatedUser,
        ...users.slice(index + 1),
      ];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      // addToast(`Updated ${updatedUser.name}`, {
      //   appearance: "success",
      // });
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${oldUser ? oldUser?.name : id}`, {
        appearance: "error",
      });
    }
  };

  const deleteUser = async (id) => {
    let deletedUser = null;
    try {
      const response = await fetch(`${ALL_USERS_ENDPOINT}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = users.findIndex((user) => user._id === id);
      deletedUser = users[index];
      const updatedUsers = [...users.slice(0, index), ...users.slice(index + 1)];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      console.log(`Deleted ${deletedUser.name}`);
      // addToast(`Deleted ${deletedUser.name}`, {
      //   appearance: "success",
      // });
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${deletedUser.name}`, {
        appearance: "error",
      });
    }
  };

  return (
    <AllFormsContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {props.children}
    </AllFormsContext.Provider>
  );
};
