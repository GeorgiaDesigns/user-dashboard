import usePagination from "../hooks/usePagination";
import { getAllUsers } from "../services/api";

const UserList = () => {
  const { prev, next, currentPage, loading, users, totalPages } = usePagination(
    getAllUsers,
    6
  );
  return (
    <div>
      <div>
        <h1>Users</h1>
        {loading && <p>Loading...</p>}
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.first_name + " " + user.last_name}</li>
          ))}
        </ul>
        <button onClick={prev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || "?"}
        </span>
        <button onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
