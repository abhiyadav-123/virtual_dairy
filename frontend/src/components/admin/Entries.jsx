import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../api"; // ✅ Adjust path if needed

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEntry, setEditEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/entries");
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (!confirm) return;

    try {
      await api.delete(`/entries/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/entries/${editEntry._id}`, editEntry);
      setEntries((prev) =>
        prev.map((entry) => (entry._id === editEntry._id ? res.data : entry))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-4">All Entries</h1>

      {loading ? (
        <p className="text-center">Loading entries...</p>
      ) : (
        <div className="overflow-x-auto bg-base-200 rounded-xl shadow-lg">
          <table className="min-w-full table-fixed border rounded-lg">
            <thead className="bg-base-300 text-base-content">
              <tr className="table w-full table-fixed">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Content</th>
                <th className="p-3 text-left">Mood</th>
                <th className="p-3 text-left">Visibility</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody
              className="block max-h-[500px] overflow-y-auto divide-y divide-base-300"
              style={{ display: "block" }}
            >
              {entries.map((entry) => (
                <tr key={entry._id} className="table w-full table-fixed">
                  <td className="p-3 truncate">{entry.title || "No Title"}</td>
                  <td className="p-3 truncate">{entry.content}</td>
                  <td className="p-3">{entry.mood || "—"}</td>
                  <td className="p-3">{entry.visibility}</td>
                  <td className="p-3 truncate">
                    {entry.createdBy?.name || entry.createdBy?.email || "Unknown"}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setEditEntry(entry);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(entry._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {entries.length === 0 && (
            <p className="text-center py-4 text-gray-500">No entries found.</p>
          )}
        </div>
      )}

      {/* ✅ Edit Entry Modal */}
      {showModal && editEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-base-content">
            <h3 className="text-xl font-bold mb-4">Edit Entry</h3>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  value={editEntry.title}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, title: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </label>

              <label className="block mb-2">
                Mood:
                <select
                  value={editEntry.mood}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, mood: e.target.value })
                  }
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">-- Select --</option>
                  <option value="🙂">🙂 Happy</option>
                  <option value="😔">😔 Sad</option>
                  <option value="😡">😡 Angry</option>
                </select>
              </label>

              <label className="block mb-2">
                Content:
                <textarea
                  rows="4"
                  value={editEntry.content}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, content: e.target.value })
                  }
                  className="textarea textarea-bordered w-full mt-1"
                />
              </label>

              <label className="block mb-2">
                Visibility:
                <select
                  value={editEntry.visibility}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, visibility: e.target.value })
                  }
                  className="select select-bordered w-full mt-1"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
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

export default Entries;
