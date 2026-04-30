// src/components/layout/Header.tsx
import { useState, useRef, useEffect } from 'react';
import {  UserCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/apiServices/authService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  const navigate = useNavigate();

   const MySwal = withReactContent(Swal);





  

  const handleLogout = async() => {
     const result = await MySwal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to Logout this User?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Log Out',
    confirmButtonColor:"red",
    cancelButtonText: 'Cancel',
  });
    if (result.isConfirmed) {
      logout();
      navigate("/login", { replace: true });
      window.location.reload();
    }
    
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  return (
  <header className="bg-white shadow-sm p-4 flex items-center flex-shrink-0">

    <div
      className="flex items-center space-x-6 relative ml-auto"
      ref={dropdownRef}
    >
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <UserCircle className="h-8 w-8" />
        <ChevronDown className="w-4 h-4" />
      </button>

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>

  </header>
);
};

export default Header;
