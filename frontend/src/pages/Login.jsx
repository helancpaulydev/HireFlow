import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      /*
        Our Django JWT endpoint expects "username".

        In our HireFlow signup system, the user's
        email is being used as their username.
      */

      await login(email, password);

      // Store basic user information for the frontend
      const userData = {
        email: email,
      };

      localStorage.setItem(
        "hireflowUser",
        JSON.stringify(userData)
      );

      setUser(userData);

      setMessage("Welcome back! 🌱");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {

      setMessage(
        error.message || "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="brand">
        <div className="brand-icon">H</div>
        <span>HireFlow</span>
      </div>

      <div className="login-container">

        <div className="login-card">

          <div className="welcome-section">

            <h1>Welcome back 👋</h1>

            <p className="tagline">
              <span>Track where you are.</span>
              <span>Learn from each step.</span>
              <span>Keep moving forward. 🌱</span>
            </p>

          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <div className="input-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="input-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setMessage(
                      "Password recovery will be available soon."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && <span>→</span>}

            </button>

          </form>

          {message && (
            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#a9c6af",
              }}
            >
              {message}
            </div>
          )}

          <div className="signup-section">

            <span>
              Don't have an account?
            </span>

            <Link
              to="/signup"
              className="signup-link"
            >
              Create one
            </Link>

          </div>

          <div className="bottom-message">

            Your progress matters, even when the
            outcome isn't what you hoped for.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;