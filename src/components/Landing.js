import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay">
        <div className="landing-content">
          <h1>🍽️ Foodie Hub</h1>
          <p>Discover, Order & Enjoy Your Favorite Meals Anytime</p>

          <div className="buttons">
            <button onClick={() => navigate('/login')} className="btn login-btn">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn register-btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;