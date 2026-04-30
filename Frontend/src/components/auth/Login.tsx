import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/apiServices/authService';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e: any) => {
        setUser(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await login(user.email, user.password);
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 1000);
  } catch (error: any) {
    console.error(error.message || 'Login failed');
  }
};






    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-fuchsia-100 from-0% via-cyan-300 via-50% to-pink-100 to-100% ">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">LOGIN</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?
                        <button
                            onClick={() => navigate(`/signup`)}
                            className="text-blue-600 hover:underline focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default SignIn;

