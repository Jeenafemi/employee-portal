import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { upsertDepartment } from "../../api/apiServices/departmentService";
import { toast } from "react-toastify";

const UpsertDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state;

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    status: true
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await upsertDepartment(formData);

      toast.success(res.msg);

      setTimeout(() => {
        navigate("/department");
      }, 1000);

    } catch (err: any) {
      toast.error(err || "Failed");
    }
  };
  return (
  <div className="flex justify-center items-start p-6 bg-gray-50 min-h-screen">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white p-8 rounded-xl shadow space-y-6"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-center">
        {formData._id ? "Update Department" : "Create Department"}
      </h2>

      {/* 🔹 Department Name */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Department Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter department name"
          required
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🔹 Status */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Status</label>
        <select
          name="status"
          value={String(formData.status)}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* 🔹 Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
        {formData._id ? "Update Department" : "Create Department"}
      </button>
    </form>
  </div>
);
};

export default UpsertDepartment;