import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/Mainlayout';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
// import OpenPositions from './components/Dashboard/OpenPositions';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import ListEmployee from './components/Employees/ListEmployees';
import UpsertEmployee from './components/Employees/UpserEmployees';
import ViewEmployee from './components/Employees/ViewEmployee';
import UpsertDepartment from './components/Departments/UpsertDepartment';
import ListDepartments from './components/Departments/ListDepartments';
import ViewDepartment from './components/Departments/ViewDepartment';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/login" replace /> : <SignUp />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<ListEmployee />} />
            <Route path="employee/upsert" element={<UpsertEmployee />} />
            <Route path="employee/view" element={<ViewEmployee />} />
            <Route path="department" element={<ListDepartments />} />
            <Route path="department/upsert" element={<UpsertDepartment/>} />
            <Route path="department/view" element={<ViewDepartment />} />

          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </>
  );
}

export default App;


