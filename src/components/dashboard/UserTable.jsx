import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";

import { useState } from "react";
import useUser from "../../hooks/useUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import UserFormModal from "./UserFormModal";

const tableCellStyles = {
  color: "#FFFFFF",
  borderColor: "#2A2A2A",
};

export default function UserTable() {
  const {
    users = [],
    loadingUsers,
    addUser,
    editUser,
    removeUser,
  } = useUser();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await removeUser(id);
    }
  };

  const handleSave = async (userData) => {
    if (selectedUser) {
      await editUser(selectedUser.id, userData);
    } else {
      await addUser({
        ...userData,
        role: userData.role || "user",
      });
    }

    setModalOpen(false);
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <p className="text-accent uppercase tracking-[4px] text-xs">
            Users
          </p>

          <h2 className="text-2xl font-black text-text">
            User management
          </h2>
        </div>

        <Button
          onClick={handleAdd}
          sx={{
            backgroundColor: "#C8A96A",
            color: "#111111",
            borderRadius: "16px",
            px: 3,
            py: 1.2,
            fontWeight: 800,
            textTransform: "none",
          }}
        >
          New user
        </Button>
      </div>

      <TableContainer
        sx={{
          backgroundColor: "#111111",
          border: "1px solid #2A2A2A",
          borderRadius: "24px",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#181818" }}>
              {["User", "Username", "Email", "Role", "Actions"].map((head) => (
                <TableCell
                  key={head}
                  align={head === "Actions" ? "right" : "left"}
                  sx={{
                    ...tableCellStyles,
                    color: "#C8A96A",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: "11px",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loadingUsers ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  There are no registered users.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(200,169,106,0.06)",
                    },
                  }}
                >
                  <TableCell sx={tableCellStyles}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.profilePic}
                        sx={{
                          width: 46,
                          height: 46,
                          border: "2px solid #C8A96A",
                          backgroundColor: "#181818",
                          color: "#C8A96A",
                          fontWeight: 800,
                        }}
                      >
                        {getInitial(user.name)}
                      </Avatar>

                      <div>
                        <p className="font-bold text-text">{user.name}</p>
                        <p className="text-gray-500 text-xs">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <span className="text-gray-400">
                      {user.username || "-"}
                    </span>
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <span className="text-gray-400">{user.email}</span>
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        user.role === "admin"
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-white/5 text-gray-300 border-[#2A2A2A]"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </TableCell>

                  <TableCell align="right" sx={tableCellStyles}>
                    <IconButton
                      onClick={() => handleEdit(user)}
                      sx={{
                        color: "#C8A96A",
                        border: "1px solid #2A2A2A",
                        mr: 1,
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      sx={{
                        color: "#ff6b6b",
                        border: "1px solid #2A2A2A",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <UserFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedUser}
      />
    </div>
  );
}