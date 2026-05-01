import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listEmployees,
  toggleEmployeeStatus,
} from "../../api/apiServices/employeeService";
import { toast } from "react-toastify";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";
import { deleteEmployee } from "../../api/apiServices/employeeService";

const ListEmployees = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await listEmployees();
      if (res.status === 1) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteEmployee(id);

        if (res.status === 1) {
          toast.success(res.msg);
          fetchData();
        } else {
          toast.error(res.msg);
        }
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleView = (item: any) => {
    navigate("/employee/view", { state: { id: item._id } });
  };

  const handleEdit = (item: any) => {
    navigate("/employee/upsert", { state: item });
  };

  const handleCreate = () => {
    navigate("/employee/upsert");
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
        const res = await toggleEmployeeStatus(item._id);

        if (res.status === 1) {
          toast.success(res.msg);
          fetchData();
        }
      } catch {
        toast.error("Failed to update status");
      }
    }
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left w-[18%]">Name</th>
              <th className="p-4 text-left w-[22%]">Email</th>
              <th className="p-4 text-left w-[15%]">Phone</th>
              <th className="p-4 text-center w-[18%]">Department</th>
              <th className="p-4 text-center w-[15%]">Status</th>
              <th className="p-4 text-center w-[12%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-4 align-middle">{item.name}</td>
                <td className="p-4 align-middle">{item.email}</td>
                <td className="p-4 align-middle">{item.phone}</td>
                <td className="p-4 text-center align-middle">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs inline-block">
                    {item.departmentName || "N/A"}
                  </span>
                </td>
                <td className="p-4 text-center align-middle">
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      item.status === 1
                        ? "bg-green-200 hover:bg-green-300 text-green-800"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {item.status === 1 ? "Active" : "Inactive"}
                  </button>
                </td>

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

                      <div className="absolute right-0 bg-white shadow p-2 z-10">
                        <button
                          onClick={() => handleView(item)}
                          className="block w-full text-left"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="block w-full text-left"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="block w-full text-left text-red-500"
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

export default ListEmployees;
