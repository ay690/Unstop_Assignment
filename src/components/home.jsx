import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css";
import profile from "../assets/profile.png";

const Home = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Getting user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    setUserData(user);
  }, [navigate]);

  const handleLogout = () => {
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
   
    if (onLogout) {
      onLogout();
    }
    
    navigate('/');
  };
  return (
    
    // This is my home page or logged in page   

    <main className="logged-in-container">
      <div className="content-wrapper">
        <header className="welcome-header">
          <span className="welcome-text">Welcome to</span>
          <span className="unstop-text">Unstop</span>
        </header>

        {userData && (
          <div className="profile-card">
            <div className="profile-content">
              <div className="avatar-container">
                <img
                  src={profile}
                  alt={`${userData.firstName || 'User'} profile`}
                  className="avatar-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = profile;
                  }}
                />
              </div>

              <div className="profile-info">
                <h2 className="profile-name">
                  {userData.firstName} {userData.lastName || ''}
                </h2>

                <div className="profile-details">
                  <p className="profile-email">{userData.email}</p>
                  {userData.gender && (
                    <p className="profile-gender">
                      {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}
                    </p>
                  )}
                </div>
              </div>

              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
