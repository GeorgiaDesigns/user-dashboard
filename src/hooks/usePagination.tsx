import { useEffect, useState } from "react";
import { User, UserList } from "../utils/definitions";

const usePagination = (
  fetchFunc: (page: number, perPage: number) => Promise<UserList>,
  itemsPerPage: number
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserList>();
  const [users, setUsers] = useState<User[]>([]);

  function prev() {
    setCurrentPage(Math.max(currentPage - 1, 1));
  }

  function next() {
    if (!data) return;
    setCurrentPage(Math.min(currentPage + 1, data.total_pages));
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunc(currentPage, itemsPerPage);
        setUsers(response.data);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, fetchFunc, itemsPerPage]);

  return {
    prev,
    next,
    currentPage,
    loading,
    users,
    totalPages: data?.total_pages,
  };
};

export default usePagination;
