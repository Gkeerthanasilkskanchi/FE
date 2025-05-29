import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModel";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAuth, setShowAuth] = useState(false);
  const [navItems, setNavItems]: any = useState([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("userEmail");
    setUserEmail(email);



    const baseNavItems: any = [
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
    sessionStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  return (
    <div
      className="text-white p-3 d-flex flex-column background-color"
      style={{ width: "220px", height: "100vh", overflowY: "auto" }}
    >
      {/* Logo */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "10%" }}
      >
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
        {navItems.map((item: any, idx: number) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={idx}
              className="mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(item.path)}
            >
              <div className="d-flex flex-column align-items-center">
                <i className={`bi ${item.icon} cornor-flower ${isActive ? 'active' : ''}`} />
                <span
                  className={`cornor-name ${isActive ? 'active' : ''} fw-semibold`}
                >
                  {item.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Sign Up / Login or Sign Out */}
      {/* <li
        className="nav-item text-center mt-auto cornor-flower"
        style={{ cursor: "pointer" }}
        onClick={() => (userEmail ? handleSignOut() : setShowAuth(true))}
      >
        <div className="d-flex flex-column align-items-center">
          <i
            className="bi bi-person-circle"
            style={{ fontSize: "1.5rem", marginBottom: "5px" }}
          ></i>
          <span
            className="black-text user-email-display"
            title={userEmail || "Sign Up"}
          >
            {userEmail ? userEmail : "Sign Up"}
          </span>

          {userEmail && (
            <small className="text-danger mt-1" style={{ fontSize: "0.75rem" }}>
              Sign Out
            </small>
          )}
        </div>
      </li> */}

      {/* Auth Modal */}
      {/* {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          setUserEmail={setUserEmail}
        />
      )} */}
    </div>
  );
};
