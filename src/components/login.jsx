import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import illustration from "../assets/illustration.png";
import googleIcon from "../assets/google.svg";
import facebookIcon from "../assets/facebook.svg";
import accountCircleIcon from "../assets/account_circle.png";
import mailIcon from "../assets/mail.png";
import keyIcon from "../assets/key.png";
import visbilityIcon from "../assets/visibility.png";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Checking if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Validate username must be 'emilys'
    if (formData.username.trim() !== "emilys") {
      newErrors.username = 'Username must be "emilys"';
    }

    // Validating email format if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Validating password length
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparing the API payload
      const payload = {
        username: formData.username.trim(),
        password: formData.password,
        expiresInMins: 30,
      };

      // Adding email if provided
      if (formData.email.trim()) {
        payload.email = formData.email.trim();
      }

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }

      localStorage.setItem("user", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (onLogin) {
        onLogin(data);
      }

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message || "Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      {apiError && (
        <div
          className="error-message"
          style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
        >
          {apiError}
        </div>
      )}
      <div className="illustration-section">
        <img src={illustration} alt="Illustration" className="illustration" />
      </div>

      <div className="login-card">
        <div className="card-content">
          <div className="welcome-text">
            <span className="welcome-normal">
              Welcome to
              <br />
            </span>
            <span className="welcome-brand">Unstop </span>
          </div>

          <div className="social-buttons">
            <button className="social-btn" id="google-btn">
              <img
                src={googleIcon}
                alt="Google"
                className="social-icon google-icon"
              />
              <span>Login with Google</span>
            </button>
            <button className="social-btn" id="facebook-btn">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="social-icon facebook-icon"
              />
              <span>Login with Facebook</span>
            </button>
          </div>

          <div className="separator-section">
            <div className="separator-line"></div>
            <span className="separator-text">OR</span>
            <div className="separator-line"></div>
          </div>

          <form onSubmit={handleSubmit} className="input-fields">
            {/* ************************************ username *************************************************************************/}
            <div className="input-group">
              <div className="input-content">
                <img
                  src={accountCircleIcon}
                  alt="User"
                  className="input-icon"
                />
                <div className="input-text">
                  <label className="input-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className={`input-value ${
                      errors.username ? "input-error" : ""
                    }`}
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              {errors.username && (
                <div className="error-text">{errors.username}</div>
              )}
            </div>
            {/* ******************************************* email ******************************************************************/}
            <div className="input-group">
              <div className="input-content">
                <img src={mailIcon} alt="Email" className="input-icon" />
                <div className="input-text">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`input-value ${
                      errors.email ? "input-error" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            {/* ***************************************** password *************************************************************/}
            <div className="input-group password-group">
              <div className="input-content">
                <img src={keyIcon} alt="Password" className="input-icon" />
                <div className="input-text">
                  <label className="input-label">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`input-value ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                className="visibility-btn"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={visbilityIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="visibility-icon"
                />
              </button>
              {errors.password && (
                <div className="error-text">{errors.password}</div>
              )}
            </div>

            <div className="options-row">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  className="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="login-btn"
              id="login-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Logging in..." : "Login"}</span>
            </button>
          </form>

          <div className="register-link">
            <span className="register-text">Don't have an account? </span>
            <a href="#" className="register-link-text">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
