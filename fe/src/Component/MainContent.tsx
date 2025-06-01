//main content


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModel";
import { Loader } from "./Loader";


export const MainContent = ({ children }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  // const [navItems, setNavItems]: any = useState([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    setUserEmail(email);
  }, [userEmail]);

  const handleSignOut = () => {
    setLoading(true);
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userName");
    setUserEmail(null);
    window.location.reload();
    setLoading(false);
  };



  return (
    <>
      <Loader loading={loading}></Loader>
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

          {/* Centered Logo Text */}
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
              className="icon-wrapper-heart  text-white"
              title="Liked Products"
              onClick={() => navigate("/products/liked")}
              style={{ padding: "6px", borderRadius: "8px", height: "36px", width: "36px" }}

            >
              <i className="bi bi-heart-fill  animated-heart"></i>
            </div>
            <div
              className="icon-wrapper-cart  text-white"
              title="Cart"
              onClick={() => navigate("/products/cart")}
              style={{ padding: "6px", borderRadius: "8px", height: "36px", width: "36px" }}

            >
              <i className="bi bi-cart animated-cart" />
            </div>
            <div>
              <li
                className="nav-item text-center mt-auto"
                style={{ cursor: "pointer", padding: "6px", borderRadius: "8px", height: "36px", width: "36px", listStyle: "none" }}
                onClick={() => (userEmail ? handleSignOut() : setShowAuth(true))}
              >
                <div className="d-flex flex-column align-items-center" style={{ paddingLeft: '20px' }}>
                  {userEmail ?
                    <div
                      style={{
                        backgroundColor: "#007bff", // or any color you want
                        color: "white",
                        marginTop: '-10px',
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        className="black-text user-email-display"
                        title={userEmail}
                      >
                        {userEmail.slice(0, 2)}
                      </span>

                    </div> : <i
                      className="bi bi-person-fill"
                    // style={{ fontSize: "1.5rem", marginBottom: "5px" ,marginTop :"-6px" ,padding: "6px", borderRadius: "8px", height: "36px", width: "36px" }}
                    ></i>}
                  <span
                    className="black-text user-email-display"
                    title={userEmail ? '' : "Sign Up"}
                  >
                    {userEmail ? '' : "Sign Up"}
                  </span>
                  {userEmail && (
                    <i
                      className="bi bi-box-arrow-right text-danger"
                      style={{
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}

                      title="Sign Out"
                      onClick={handleSignOut}
                    ></i>
                  )}

                </div>
              </li>
              {/* Auth Modal */}
              {showAuth && (
                <AuthModal
                  onClose={() => { setShowAuth(false); window.location.reload() }}
                  setUserEmail={setUserEmail}

                />
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4" style={{ flexGrow: 1, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </>

  );
};
