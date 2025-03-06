import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const updateAuthState = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".nav-dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", updateAuthState);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateAuthState();
    setShowDropdown(false);
    navigate("/");

    // Use a toast notification instead of alert
    // This assumes you have a toast system; if not, you can keep the alert
    // toast.success("Logged out successfully!");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md py-4 px-6 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            {/* You can add an icon here */}
            <h1 className="text-xl font-bold tracking-tight group-hover:text-blue-200 transition-colors duration-200">
              CodingSpoon HMS
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="hidden md:block px-4 py-2 text-white hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </Link>

          {isSmallScreen ? (
            <div className="relative nav-dropdown-container">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white font-medium flex items-center transition-colors duration-200"
              >
                <span>Menu</span>
                <svg
                  className={`ml-2 w-5 h-5 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 border border-gray-200 transition-all duration-200 ease-in-out">
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-150"
                  >
                    Home
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/add-hospital"
                        className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-150"
                      >
                        Add Hospital
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-100 transition-colors duration-150 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-150"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-blue-100 transition-colors duration-150"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/add-hospital"
                className="px-4 py-2 border border-blue-300 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Add Hospital
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/signup"
                className="px-4 py-2 border border-blue-300 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
