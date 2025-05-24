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

        <div className="hero-text-wrapper position-relative text-center">
          <h3 className="text-clip-gradient position-relative z-1">
            KEERTHANA SILKS
          </h3>
          <p className="text-clip-gradient-sm position-relative z-1 ">
            Elegance In Every Drape
          </p>
          <img
            src="/images/logo-flower.png"
            alt="Flower behind text"
            className="flower-behind"
          />
        </div>




        {/* Cart & Liked Icons Right */}
        <div className="position-absolute top-0 end-0 mt-4 me-4 d-flex gap-3">
          <div
            className="icon-wrapper bg-danger text-white"
            title="Liked Products"
            onClick={() => navigate("/products/liked")}
          >
            <i className="bi bi-heart fs-5" />
          </div>
          <div
            className="icon-wrapper bg-primary text-white"
            title="Cart"
            onClick={() => navigate("/products/cart")}
          >
            <i className="bi bi-cart fs-5" />
          </div>
        </div>

      </div>

      {/* Scrollable content */}
      <div className="p-4" style={{ flexGrow: 1, overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
};
