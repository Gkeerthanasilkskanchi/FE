import { useNavigate } from "react-router-dom";

export const MainContent = ({ children }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex-grow-1 d-flex flex-column"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Header section */}
      <div className="p-4 position-relative" style={{ flexShrink: 0 }}>
        {/* Location Left */}
        <div className="position-absolute top-0 start-0 mt-4 ms-4">
          <a
            href="https://www.google.com/maps/place/Kanchipuram"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center text-decoration-none text-dark"
          >
            <i className="bi bi-geo-alt-fill fs-5 me-2 text-danger"></i>
            <span className="fw-semibold">Kanchipuram</span>
          </a>
        </div>

        {/* Title Center */}
        <div className="text-center">
          <h3>GKEERTHANA SILKS</h3>
          <p className="mb-0">slogan</p>
        </div>

        {/* Cart & Liked Icons Right */}
        <div className="position-absolute top-0 end-0 mt-4 me-4 d-flex gap-3">
          <i
            className="bi bi-heart fs-5 text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/products/liked")}
            title="Liked Products"
          />
          <i
            className="bi bi-cart fs-5 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/products/cart")}
            title="Cart"
          />

        </div>
      </div>

      {/* Scrollable content */}
      <div className="p-4" style={{ flexGrow: 1, overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
};
