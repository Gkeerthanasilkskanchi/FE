import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../API/API";
import { Loader } from "./Loader";

export const AuthModal = ({
  onClose,
  setUserEmail,
}: {
  onClose: () => void;
  setUserEmail: (email: string | null) => void;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = isLogin ? await login() : await register();
      toast.success(response.data.message);

      if (isLogin) {
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userName", response?.data?.userName);
        sessionStorage.setItem("role", response?.data?.role);
        setUserEmail(email);
        onClose();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    return await registerUser({ email, password, userName });
  };

  const login = async () => {
    const response = await loginUser({ email, password });
    return response;
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {message && <div className="alert alert-info">{message}</div>}
                {!isLogin && (
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                )}
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
                <button type="button" className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "New user / Sign up" : "Already have account / Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
