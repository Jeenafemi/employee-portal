
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getEmployee } from "../../api/apiServices/employeeService";
import { toast } from "react-toastify";

const ViewEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ support both state + query param
  const [params] = useSearchParams();
  const id = location.state?.id || params.get("id");

  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchEmployee = async () => {
    try {
      const res = await getEmployee(id as string);
      if (res.status === 1) {
        setEmployee(res.data);
      }
    } catch (err: any) {
      toast.error(err || "Failed to fetch employee");
      navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/employees");
      return;
    }
    fetchEmployee();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 space-y-6">

        {/* 🔹 HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Employee Details</h2>
          <button
            onClick={() => navigate("/employees")}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Back
          </button>
        </div>

        {/* 🔥 DASHBOARD CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Employee ID</p>
            <h2 className="text-lg font-semibold">
              {employee.employeeId}
            </h2>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Status</p>
            <h2 className={`text-lg font-semibold ${
              employee.status === 1 ? "text-green-600" : "text-red-600"
            }`}>
              {employee.status === 1 ? "Active" : "Inactive"}
            </h2>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Experience</p>
            <h2 className="text-lg font-semibold">
              {employee.experience || 0} yrs
            </h2>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Department</p>
            <h2 className="text-lg font-semibold">
              {employee.departmentName || "N/A"}
            </h2>
          </div>

        </div>

        {/* 🔥 TABS */}
        <div className="flex gap-6 border-b pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "job", label: "Job Details" },
            { id: "salary", label: "Salary" },
            { id: "address", label: "Address" },
            { id: "activity", label: "Activity" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔹 OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{employee.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p>{employee.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p>{employee.phone || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p>{employee.gender || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">DOB</p>
              <p>{employee.dob || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">LinkedIn</p>
              <p>{employee.linkedin || "N/A"}</p>
            </div>
          </div>
        )}

        {/* 🔹 JOB DETAILS */}
        {activeTab === "job" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Department</p>
              <p>{employee.departmentName || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Job Title</p>
              <p>{employee.jobTitle || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Employee Type</p>
              <p>{employee.employeeType || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Joining Date</p>
              <p>{employee.joiningDate || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Work Location</p>
              <p>{employee.workLocation || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Experience</p>
              <p>{employee.experience || 0} years</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Skills</p>
              <p>{employee.skills?.join(", ") || "N/A"}</p>
            </div>
          </div>
        )}

        {/* 🔹 SALARY */}
        {activeTab === "salary" && (
          <div className="space-y-3">
            <p>
              <span className="text-gray-500">Salary: </span>
              ₹{employee.salary || 0}
            </p>
            <p>
              <span className="text-gray-500">Payment Type: </span>
              {employee.paymentType || "N/A"}
            </p>
          </div>
        )}

        {/* 🔹 ADDRESS */}
        {activeTab === "address" && (
          <div className="space-y-3">
            <p><span className="text-gray-500">Current:</span> {employee.currentAddress || "N/A"}</p>
            <p><span className="text-gray-500">Permanent:</span> {employee.permanentAddress || "N/A"}</p>
            <p><span className="text-gray-500">City:</span> {employee.city || "N/A"}</p>
            <p><span className="text-gray-500">State:</span> {employee.state || "N/A"}</p>
            <p><span className="text-gray-500">Pincode:</span> {employee.pincode || "N/A"}</p>
          </div>
        )}

        {/* 🔹 ACTIVITY */}
        {activeTab === "activity" && (
          <div className="space-y-3">
            <p>
              <span className="text-gray-500">Last Updated: </span>
              {new Date(employee.updatedAt).toLocaleString()}
            </p>
            <p>
              <span className="text-gray-500">Status: </span>
              <span className={employee.status === 1 ? "text-green-600" : "text-red-600"}>
                {employee.status === 1 ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewEmployee;