import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/signup/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully! 🌱");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage(
        "Unable to connect to the server. Please try again."
      );
    }

    setLoading(false);
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

            <h1>Create your account 🌱</h1>

            <p className="tagline">
              <span>Start your journey.</span>
              <span>Track your progress.</span>
              <span>Keep moving forward.</span>
            </p>

          </div>

          <form
            className="login-form"
            onSubmit={handleSignup}
          >

            <div className="input-group">

              <label htmlFor="name">
                Full name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>

            <div className="input-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Account"}

              {!loading && <span>→</span>}
            </button>

          </form>

          {message && (
            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "13px",
                color: "#a9c6af",
              }}
            >
              {message}
            </div>
          )}

          <div className="signup-section">

            <span>
              Already have an account?
            </span>

            <Link
              to="/"
              className="signup-link"
            >
              Sign in
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;