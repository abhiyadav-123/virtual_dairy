import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../api"; // Adjust path if needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/users/${editUser._id}`, editUser);
      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? res.data : u))
      );
      setShowModal(false);
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-base-200 rounded-xl shadow-lg">
          <table className="min-w-full table-fixed border rounded-lg">
            <thead className="bg-base-300 text-base-content">
              <tr className="table w-full table-fixed">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody
              className="block max-h-[500px] overflow-y-auto divide-y divide-base-300"
              style={{ display: "block" }}
            >
              {users.map((user) => (
                <tr key={user._id} className="table w-full table-fixed">
                  <td className="p-3 truncate">{user.firstName} {user.lastName}</td>
                  <td className="p-3 truncate">{user.email}</td>
                  <td className="p-3">
                    <span className="badge badge-info">{user.role}</span>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setEditUser(user);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center py-4 text-gray-500">No users found.</p>
          )}
        </div>
      )}

      {/* ✅ Edit User Modal */}
      {showModal && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-base-content">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                First Name:
                <input
                  type="text"
                  value={editUser.firstName}
                  onChange={(e) =>
                    setEditUser({ ...editUser, firstName: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </label>

              <label className="block mb-2">
                Last Name:
                <input
                  type="text"
                  value={editUser.lastName}
                  onChange={(e) =>
                    setEditUser({ ...editUser, lastName: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </label>

              <label className="block mb-2">
                Role:
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="select select-bordered w-full mt-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
