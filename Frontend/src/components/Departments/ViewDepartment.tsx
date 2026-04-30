import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDepartment } from "../../api/apiServices/departmentService";
import { toast } from "react-toastify";

const ViewDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.id;

  const [department, setDepartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDepartment = async () => {
    try {
      const res = await getDepartment(id);

      if (res.status === 1) {
        setDepartment(res.data);
      }
    } catch (err: any) {
      toast.error(err || "Failed to fetch department");
      navigate("/department");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/department");
      return;
    }
    fetchDepartment();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;




return (
  <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-start">
    <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8 space-y-6">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Department Details</h2>

        <button
          onClick={() => navigate("/department")}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm transition"
        >
          Back
        </button>
      </div>

      {/* 🔹 Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Department Name</p>
          <p className="text-lg font-medium">{department.name}</p>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              department.status
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {department.status ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Created */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Created At</p>
          <p className="text-md font-medium">
            {new Date(department.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Updated */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Updated At</p>
          <p className="text-md font-medium">
            {new Date(department.updatedAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  </div>
);
};

export default ViewDepartment;