import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModel";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(sessionStorage.getItem('userEmail'));

  const navItems = [
    { name: "Home", icon: "bi-house-door-fill", path: "/home" },
    { name: "About", icon: "bi-info-circle-fill", path: "/about" },
    { name: "Products", icon: "bi-box-seam", path: "/" },
    { name: "Contact Us", icon: "bi-envelope-fill", path: "/contact-us" },
  ];

  useEffect(() => {
    setUserEmail(sessionStorage.getItem('userEmail'));
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('userEmail');
    setUserEmail(null);
  };

  return (
    <div
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: "220px", height: "100vh", overflowY: "auto" }}
    >
      {/* Logo */}
      <div className="d-flex justify-content-center align-items-center bg-danger" style={{ height: "10%" }}>
        <img src="/images/logo.png" alt="logo" className="img-fluid" style={{ maxHeight: "40px" }} />
      </div>

      {/* Slogan */}
      <div className="bg-danger text-center mt-2 mb-4 py-2">
        <p className="text-white fst-italic mb-0">slogan</p>
      </div>

      {/* Navigation Items */}
      <ul className="nav flex-column align-items-center">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="nav-item text-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(item.path)}
          >
            <div className="d-flex flex-column align-items-center">
              <i className={`bi ${item.icon}`} style={{ fontSize: "1.5rem", marginBottom: "5px" }}></i>
              <span className="text-white">{item.name}</span>
            </div>
          </li>
        ))}

        {/* Sign Up / Login or Sign Out */}
        <li
          className="nav-item text-center mt-auto"
          style={{ cursor: "pointer" }}
          onClick={() => (userEmail ? handleSignOut() : setShowAuth(true))}
        >
          <div className="d-flex flex-column align-items-center">
            <i className="bi bi-person-circle" style={{ fontSize: "1.5rem", marginBottom: "5px" }}></i>
            <span
              className="text-white"
              style={{
                fontSize: "0.9rem",
                maxWidth: "220px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={userEmail || "Sign Up"} // Shows full email on hover
            >
              {userEmail ? userEmail : "Sign Up"}
            </span>

            {userEmail && (
              <small className="text-danger mt-1" style={{ fontSize: "0.75rem" }}>
                Sign Out
              </small>
            )}
          </div>
        </li>

      </ul>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} setUserEmail={setUserEmail} />}
    </div>
  );
};
