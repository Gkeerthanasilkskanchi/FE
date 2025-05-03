import { useNavigate } from "react-router-dom";

// Header.js
export const Header = ({ children }:any) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", icon: "bi-house-door-fill", path: "/" },
    { name: "About", icon: "bi-info-circle-fill", path: "/about" },
    { name: "Products", icon: "bi-box-seam", path: "/products" },
    { name: "Contact Us", icon: "bi-envelope-fill", path: "/contact" },
  ];

  return (
    <div className="d-flex" style={{ height: "100%" }}>
      <div className="bg-dark text-white p-3" style={{ width: "120px" }}>
        {/* Sidebar logo, slogan, nav */}
        <div className="d-flex justify-content-center align-items-center bg-danger" style={{ height: "10%" }}>
          <img src="/images/logo.png" alt="logo" className="img-fluid" style={{ maxHeight: "40px" }} />
        </div>
        <div className="bg-danger text-center mt-2 mb-4 py-2">
          <p className="text-white fst-italic mb-0">slogan</p>
        </div>
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
        </ul>
      </div>

      <div className="flex-grow-1 p-4 position-relative">
        <div className="text-center">
          <h3>GKEERTHANA SILKS</h3>
          <p className="mb-0">slogan</p>
        </div>
        <div className="position-absolute top-0 end-0 mt-4 me-4" style={{ maxWidth: "300px" }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};
