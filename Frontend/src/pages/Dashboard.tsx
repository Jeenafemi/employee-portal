
import { useEffect, useState } from "react";
import { getDashboard } from "../api/apiServices/dashboardService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      if (res.status === 1) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  //  Helper for badge styles
  const getBadge = (type: string) => {
    switch (type) {
      case "EMPLOYEE_CREATED":
        return "bg-green-100 text-green-700";
      case "EMPLOYEE_UPDATED":
        return "bg-blue-100 text-blue-700";
      case "EMPLOYEE_STATUS":
        return "bg-yellow-100 text-yellow-700";
      case "DEPARTMENT_CREATED":
        return "bg-purple-100 text-purple-700";
      case "DEPARTMENT_UPDATED":
        return "bg-indigo-100 text-indigo-700";
      case "DEPARTMENT_STATUS":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "EMPLOYEE_CREATED":
        return "Created";
      case "EMPLOYEE_UPDATED":
        return "Updated";
      case "EMPLOYEE_STATUS":
        return "Status";
      case "DEPARTMENT_CREATED":
        return "Dept Created";
      case "DEPARTMENT_UPDATED":
        return "Dept Updated";
      case "DEPARTMENT_STATUS":
        return "Dept Status";
      default:
        return "Activity";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/*  SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Employees</p>
          <h2 className="text-2xl font-bold">
            {data.summary.totalEmployees}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Active</p>
          <h2 className="text-2xl font-bold text-green-600">
            {data.summary.activeEmployees}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Inactive</p>
          <h2 className="text-2xl font-bold text-red-600">
            {data.summary.inactiveEmployees}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Departments</p>
          <h2 className="text-2xl font-bold">
            {data.summary.totalDepartments}
          </h2>
        </div>
      </div>

      {/*  DEPARTMENT STATS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">Department Distribution</h3>

        {data.departmentStats?.length === 0 ? (
          <p className="text-gray-500">No data</p>
        ) : (
          data.departmentStats?.map((item: any, index: number) => (
            <div key={item.departmentId}>
              <div className="flex justify-between py-2">
                <span>{item.departmentName || "Unassigned"}</span>
                <span className="font-semibold">{item.count}</span>
              </div>

              {index !== data.departmentStats.length - 1 && (
                <hr className="border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>

      {/*  RECENT ACTIVITY */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">Recent Activities</h3>

        {data.recentActivities?.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity</p>
        ) : (
          data.recentActivities?.map((activity: any, index: number) => (
            <div key={activity._id || index}>
              <div className="flex justify-between items-center py-2">
                {/* LEFT */}
                <div className="flex flex-col">
                  <span className="text-gray-800">
                    {activity.message}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* RIGHT BADGE */}
                <span
                  className={`text-xs px-2 py-1 rounded ${getBadge(
                    activity.type
                  )}`}
                >
                  {getLabel(activity.type)}
                </span>
              </div>

              {index !== data.recentActivities.length - 1 && (
                <hr className="border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
