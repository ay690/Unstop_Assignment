import "../css/login.css";
import illustration from "../assets/illustration.png";
import googleIcon from "../assets/google.svg";
import facebookIcon from "../assets/facebook.svg";
import accountCircleIcon from "../assets/account_circle.png";
import mailIcon from "../assets/mail.png";
import keyIcon from "../assets/key.png";
import visbilityIcon from "../assets/visibility.png";

const Login = () => {
  return (
    <div className="container">
      <div className="illustration-section">
        <img src={illustration} alt="Illustration" className="illustration" />
      </div>

      <div className="login-card">
        <div className="card-content">
          <div className="welcome-text">
            <span className="welcome-normal">Welcome to<br /></span>
            <span className="welcome-brand">Unstop </span>
          </div>

          <div className="social-buttons">
            <button className="social-btn" id="google-btn">
              <img src={googleIcon} alt="Google" className="social-icon google-icon" />
              <span>Login with Google</span>
            </button>
            <button className="social-btn" id="facebook-btn">
              <img src={facebookIcon} alt="Facebook" className="social-icon facebook-icon" />
              <span>Login with Facebook</span>
            </button>
          </div>

          <div className="separator-section">
            <div className="separator-line"></div>
            <span className="separator-text">OR</span>
            <div className="separator-line"></div>
          </div>

          <div className="input-fields">
  {/* ************************************ username *************************************************************************/}
            <div className="input-group">
              <div className="input-content">
                <img src={accountCircleIcon} alt="User" className="input-icon" />
                <div className="input-text">
                  <label className="input-label">User name</label>
                  <input type="text" className="input-value" defaultValue="username" />
                </div>
              </div>
            </div>
  {/* ******************************************* email ******************************************************************/}
            <div className="input-group">
              <div className="input-content">
                <img src={mailIcon} alt="Email" className="input-icon" />
                <div className="input-text">
                  <label className="input-label">Email</label>
                  <input type="email" className="input-value" defaultValue="username@gmail.com" />
                </div>
              </div>
            </div>
 {/* ***************************************** password *************************************************************/}
            <div className="input-group password-group">
              <div className="input-content">
                <img src={keyIcon} alt="Password" className="input-icon" />
                <div className="input-text">
                  <label className="input-label">Password</label>
                  <input
                    type="password"
                    className="input-value"
                    defaultValue="password123"
                    id="password-input"
                  />
                </div>
              </div>
              <button className="visibility-btn" id="toggle-password">
                <img src={visbilityIcon} alt="Toggle visibility" className="visibility-icon" />
              </button>
            </div>
          </div>

          <div className="options-row">
            <div className="remember-me">
              <input type="checkbox" id="remember" className="checkbox" />
              <label htmlFor="remember" className="checkbox-label">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button className="login-btn" id="login-btn">
            <span>Login</span>
          </button>

          <div className="register-link">
            <span className="register-text">Don't have an account? </span>
            <a href="#" className="register-link-text">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
