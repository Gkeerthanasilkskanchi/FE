//sidebar

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [navItems, setNavItems] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false); // For mobile toggle

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("userEmail");
    setUserEmail(email);

    const baseNavItems = [
      { name: "Home", icon: "bi-house-door-fill", path: "/home" },
      { name: "About", icon: "bi-info-circle-fill", path: "/about" },
      { name: "Products", icon: "bi-box-seam", path: "/" },
      { name: "Contact Us", icon: "bi-envelope-fill", path: "/contact-us" },
    ];

    if (role === "admin") {
      baseNavItems.push({
        name: "Dashboard",
        icon: "bi-speedometer2",
        path: "/dashboard",
      });
    }

    setNavItems(baseNavItems);
  }, []);

  const handleSignOut = () => {
    sessionStorage.clear();
    setUserEmail(null);
    window.location.reload();
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setShowSidebar(false); // Close sidebar in mobile view
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div
        className="d-md-none position-fixed top-0 start-0 w-100 background-color text-white d-flex align-items-center justify-content-between px-3"
        style={{ height: "60px", zIndex: 1051 }}
      >
        <button
          className="btn text-white"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <i className="bi bi-list fs-3"></i>
        </button>
        <img src="/images/logo.jpg" alt="logo" style={{ height: "40px" }} />
      </div>

      {/* Sidebar */}
      <div
        className={`background-color text-white p-3 flex-column position-fixed top-0 start-0 ${
          showSidebar ? "d-flex" : "d-none"
        } d-md-flex`}
        style={{
          width: "220px",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1040,
          paddingTop: "80px", // space below mobile navbar
        }}
      >
        {/* Desktop Logo */}
        <div className="d-none d-md-flex justify-content-center align-items-center mt-3">
          <img
            src="/images/logo.jpg"
            alt="logo"
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
        </div>

        {/* Slogan */}
        <div className="text-center mt-2 mb-4 py-2">
          <p
            className="pink-flower fst-italic mb-0 fw-semibold"
            style={{ fontSize: "14px" }}
          >
            Elegance In Every Drape
          </p>
        </div>

        {/* Navigation Items */}
        <ul className="list-unstyled flex-grow-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={idx}
                className="mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavClick(item.path)}
              >
                <div className="d-flex flex-column align-items-center">
                  <i
                    className={`bi ${item.icon} cornor-flower ${
                      isActive ? "active" : ""
                    }`}
                  />
                  <span
                    className={`cornor-name ${isActive ? "active" : ""} fw-semibold text-center`}
                    style={{ fontSize: "13px" }}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Sign Out */}
        {userEmail && (
          <button className="btn btn-danger mt-auto w-100" onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1030 }}
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};
