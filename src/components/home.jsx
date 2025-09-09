import "../css/home.css";
import profile from "../assets/profile.png";

const Home = () => {
  return (
    
    // This is my home page or logged in page   

    <main className="logged-in-container">
      <div className="content-wrapper">
        <header className="welcome-header">
          <span className="welcome-text">Welcome to</span>
          <span className="unstop-text">Unstop</span>
        </header>

        <div className="profile-card">
          <div className="profile-content">
            <div className="avatar-container">
              <img
                src={profile}
                alt="Michael Dam profile"
                className="avatar-image"
              />
            </div>

            <div className="profile-info">
              <h2 className="profile-name">Michael Dam</h2>

              <div className="profile-details">
                <p className="profile-email">example@gmail.com</p>
                <p className="profile-gender">Female</p>
              </div>
            </div>

            <button className="logout-button">Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
