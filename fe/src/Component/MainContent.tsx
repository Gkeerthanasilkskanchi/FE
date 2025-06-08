

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AuthModal } from "./AuthModel";
import { Loader } from "./Loader";


export const MainContent = ({ children }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // const [navItems, setNavItems]: any = useState([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScrollToTop = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // Listen to the custom event
    window.addEventListener("scroll-main-content-top", handleScrollToTop);

    return () => {
      window.removeEventListener("scroll-main-content-top", handleScrollToTop);
    };
  }, []);

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
      <Loader loading={loading} />
      <div
        className="main-wrapper flex-grow-1 d-flex flex-column"
        style={{
          height: "100vh",
          overflow: "hidden",
          marginLeft: window.innerWidth >= 768 ? "220px" : "0px", 
          marginTop: window.innerWidth < 680 ? "50px" : "0px",     
          padding: "0 12px",
          boxSizing: "border-box",
        }}
      >
        <div className="container-fluid py-3 px-2">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 text-center text-md-start w-100">
            {/* 📍 Location */}
            <div className="d-flex justify-content-center justify-content-md-start align-items-center flex-grow-1">
              <a
                href="https://www.google.com/maps/place/Kanchipuram"
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-flex align-items-center text-decoration-none text-dark"
                style={{ fontSize: 'clamp(12px, 1.2vw, 18px)' }}
              >
                <i className="bi bi-geo-alt-fill text-danger me-2" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}></i>
                <span className="fw-semibold mobile-hide-text">Kanchipuram</span>
              </a>
            </div>

            {/* 🏷️ Title & Slogan */}
            <div className="position-relative text-center flex-grow-1">
              <h4 className="m-0 fw-bold text-clip-gradient" style={{ fontSize: 'clamp(16px, 2.5vw, 28px)' }}>
                KEERTHANA SILKS
              </h4>
              <p className="m-0 text-clip-gradient-sm" style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}>
                Elegance In Every Drape
              </p>
              <img
                src="/images/logo-flower.png"
                alt="Flower"
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                  width: "100px",
                  height: "100px",
                  opacity: 0.2,
                  objectFit: "contain",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Hamburger toggle button (Mobile Only) */}
            <div className="d-md-none d-flex justify-content-end flex-grow-1">
              <button
                className="btn"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="Toggle menu"
              >
                <i className="bi bi-list fs-3"></i>
              </button>
            </div>

            {/* ❤️ 🛒 👤 Icons (Desktop Only or toggled on Mobile) */}
            {(showMobileMenu || window.innerWidth >= 768) && (
              <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3 flex-grow-1 flex-wrap mt-2 mt-md-0">
                {/* Liked */}
                <div
                  className=" text-white d-flex justify-content-center align-items-center icon-wrapper-heart"
                  title="Liked Products"
                  onClick={() => navigate("/products/liked")}
                  style={{
                    borderRadius: "8px",
                    height: "clamp(32px, 4vw, 42px)",
                    width: "clamp(32px, 4vw, 42px)",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-heart-fill animated-heart" style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}></i>
                </div>

                {/* Cart */}
                <div
                  className="text-white d-flex justify-content-center align-items-center icon-wrapper-cart"
                  title="Cart"
                  onClick={() => navigate("/products/cart")}
                  style={{
                    borderRadius: "8px",
                    height: "clamp(32px, 4vw, 42px)",
                    width: "clamp(32px, 4vw, 42px)",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-cart animated-cart" style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}></i>
                </div>

                {/* User */}
                <div onClick={() => (userEmail ? handleSignOut() : setShowAuth(true))}>
                  {userEmail ? (
                    <div
                      title={userEmail}
                      className="d-flex align-items-center gap-2"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "50%",
                          width: "clamp(32px, 4vw, 42px)",
                          height: "clamp(32px, 4vw, 42px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "clamp(12px, 1.2vw, 16px)",
                          textTransform: "uppercase",
                        }}
                      >
                        {userEmail.slice(0, 2)}
                      </div>
                      <i
                        className="bi bi-box-arrow-right text-danger"
                        style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
                        title="Sign Out"
                      ></i>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center">
                      <i className="bi bi-person-fill" style={{ fontSize: 'clamp(16px, 2.5vw, 26px)' }}></i>
                      <span className="small">Sign Up</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Auth Modal */}
            {showAuth && (
              <AuthModal
                onClose={() => {
                  setShowAuth(false);
                  window.location.reload();
                }}
                setUserEmail={setUserEmail}
              />
            )}
          </div>
        </div>



        {/* Scrollable Content Area */}
        <div
          ref={scrollRef}
          className="p-4"
          style={{ flexGrow: 1, overflowY: "auto" }}
        >
          {children}
        </div>
      </div>


    </>

  );
};
