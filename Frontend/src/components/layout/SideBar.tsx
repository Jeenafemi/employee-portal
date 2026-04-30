import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Files, Settings } from 'lucide-react';

const Sidebar = () => {
  const linkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors";
  const activeLinkClasses = "bg-gray-900 text-white";

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 h-screen flex flex-col p-4">
      <div className="text-white text-2xl font-bold p-4 mb-6">
       EMPLOYEE PORTAL
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <Files className="mr-3 h-5 w-5" />
          Employees
        </NavLink>
        <NavLink
          to="/department"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <Settings className="mr-3 h-5 w-5" />
          Departments
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;