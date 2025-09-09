import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Login, Home } from "./components";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Checking if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/home" 
          element={
            isAuthenticated ? 
            <Home onLogout={handleLogout} /> : 
            <Navigate to="/auth/login" />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" /> : 
            <Navigate to="/auth/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
