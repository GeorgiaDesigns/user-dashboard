import { useState } from "react";
import usePagination from "../hooks/usePagination";
import { deleteUser, getAllUsers, updateUser } from "../services/api";
import Button from "./Button";
import { User } from "../utils/definitions";

const UserList = () => {
  const [isEditing, setIsEditing] = useState("");
  const [editableValue, setEditableValue] = useState<User>({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const { prev, next, currentPage, loading, users, setUsers, totalPages } =
    usePagination(getAllUsers, 6);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    area: string
  ) => {
    setEditableValue(
      (prev) =>
        prev && {
          ...prev,
          [area]: e.target.value,
        }
    );
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul className="grid items-center justify-items-center gap-4 max-h-screen p-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 dark:hover:bg-gray-50 max-h-16 w-8/12 bg-gray-500 hover:bg-gray-200 bg-opacity-30 dark:bg-gray-900 dark:text-gray-100 hover:text-gray-900 rounded-md px-4 cursor-pointer	"
          >
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
            {isEditing === user.id ? (
              <>
                <input
                  type="text"
                  value={editableValue.first_name}
                  onChange={(e) => handleChange(e, "first_name")}
                  className="h-[40px] bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
                />
                <input
                  type="text"
                  value={editableValue?.last_name}
                  onChange={(e) => handleChange(e, "last_name")}
                  className="h-[40px] bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
                />
              </>
            ) : (
              <p> {user.first_name + " " + user.last_name}</p>
            )}

            {isEditing === user.id ? (
              <input
                type="email"
                value={editableValue?.email}
                onChange={(e) => handleChange(e, "email")}
                className="h-[40px] bg-gray-900 border-gray-900 dark:bg-white dark:bg-opacity-10 bg-opacity-10 rounded-md px-4 text-sm placeholder-gray-950 dark:placeholder-white placeholder-opacity-70 focus:outline-none"
              />
            ) : (
              <p> {user.email}</p>
            )}
            <div className="flex gap-4">
              {isEditing === user.id ? (
                <button
                  id="confirm-edit"
                  onClick={async () => {
                    setIsEditing("");
                    await updateUser(user.id);
                    setUsers((current) =>
                      current.map((u) => (u.id === user.id ? editableValue : u))
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#1b8c1b"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
                  </svg>
                </button>
              ) : (
                <button
                  id="editButton"
                  onClick={() => {
                    setEditableValue(user);
                    setIsEditing(user.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
              )}
              <button
                id="delete-user"
                onClick={() => {
                  setUsers((current) =>
                    current.filter((u) => u.id !== user.id)
                  );
                  deleteUser(user.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <footer className="flex w-full gap-4 items-baseline justify-center inset-x-0">
        <Button label="Previous" onClick={prev} disabled={currentPage === 1} />

        <span>
          Page {currentPage} of {totalPages || "?"}
        </span>
        <Button
          label="Next"
          onClick={next}
          disabled={currentPage === totalPages}
        />
      </footer>
    </div>
  );
};

export default UserList;
