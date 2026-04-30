import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listDepartments,
  toggleDepartmentStatus,
} from "../../api/apiServices/departmentService";
import { toast } from "react-toastify";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";

const ListDepartments = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 fetch departments
  const fetchData = async () => {
    try {
      const res = await listDepartments();
      if (res.status === 1) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 DELETE (connect later)
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      // await deleteDepartment(id);
      toast.success("Deleted successfully");
      fetchData();
    }
  };

  // 🔹 VIEW
  const handleView = (item: any) => {
    navigate("/department/view", { state: { id: item._id } });
  };

  // 🔹 EDIT
  const handleEdit = (item: any) => {
    navigate("/department/upsert", { state: item });
  };

  // 🔹 CREATE
  const handleCreate = () => {
    navigate("/department/upsert");
  };

  const handleToggleStatus = async (item: any) => {
    const result = await Swal.fire({
      title: "Change Status?",
      text: `Mark as ${item.status === 1 ? "Inactive" : "Active"}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "blue",
    });

    if (result.isConfirmed) {
      try {
        const res = await toggleDepartmentStatus(item._id);

        if (res.status === 1) {
          toast.success(res.msg);
          fetchData(); // 🔥 refresh
        }
      } catch {
        toast.error("Failed to update status");
      }
    }
  };

  // 🔹 FILTER
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Department
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg">
        <table className="w-full text-sm table-fixed">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-4 text-left w-[40%]">Department Name</th>
      <th className="p-4 text-center w-[20%]">Status</th>
      <th className="p-4 text-center w-[20%]">Created</th>
      <th className="p-4 text-center w-[20%]">Actions</th>
    </tr>
  </thead>

  <tbody>
    {filtered.map((item) => (
      <tr key={item._id} className="border-b">

        {/* Name */}
        <td className="p-4 align-middle">
          {item.name}
        </td>

        {/* Status */}
        <td className="p-4 text-center align-middle">
          <span
            className={`px-2 py-1 rounded text-sm inline-block ${
              item.status === 1
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {item.status === 1 ? "Active" : "Inactive"}
          </span>
        </td>

        {/* Created */}
        <td className="p-4 text-center align-middle">
          {new Date(item.createdAt).toLocaleDateString()}
        </td>

        {/* Actions */}
        <td className="p-4 text-center align-middle relative">
          <button
            onClick={() =>
              setMenuOpenId(menuOpenId === item._id ? null : item._id)
            }
            className="inline-flex justify-center items-center w-full"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpenId === item._id && (
            <>
              <div
                className="fixed inset-0"
                onClick={() => setMenuOpenId(null)}
              />

              <div className="absolute right-0 bg-white shadow p-2 z-10 w-40">
                <button
                  onClick={() => handleView(item)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  View
                </button>

                <button
                  onClick={() => handleEdit(item)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="block w-full text-left px-2 py-1 text-red-500 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </td>

      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
};

export default ListDepartments;
