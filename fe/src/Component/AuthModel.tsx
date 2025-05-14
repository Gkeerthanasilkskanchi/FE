import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../API/API";

export const AuthModal = ({ onClose, setUserEmail }: { onClose: () => void, setUserEmail: (email: string | null) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage(""); 
  
    try {
      const endpoint = await (isLogin ? login() : register());
      toast.success(endpoint.data.message);

      if (isLogin) {
        // Store email in session storage and update the Sidebar
        sessionStorage.setItem('userEmail', email);
        setUserEmail(email);
        onClose();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const register = async() => {
    const getResponse = await registerUser({email, password});
    return getResponse;
  }

  const login = async() => {
    const getResponse = await loginUser({email, password});
    return getResponse;
  }

  return (
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
                {isLogin ? "New user? Sign up" : "Already registered? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
