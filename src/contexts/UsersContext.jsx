import { createContext, useState, useEffect } from "react";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/userService";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await loadUsers();
    };
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    const newUser = await createUser(userData);
    setUsers((prev) => [...prev, newUser]);
  };

  const editUser = async (id, userData) => {
    const updatedUser = await updateUser(id, userData);

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loadingUsers,
        loadUsers,
        addUser,
        editUser,
        removeUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;