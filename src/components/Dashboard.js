import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; // Ensure you have a logo image
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import backgroundVideo from './background.mp4'; // Add your video file

function Dashboard() {
  const navigate = useNavigate(); // React Router's hook for navigation

  return (
    <div className="dashboard-container">
      {/* Background Video */}
      <video autoPlay loop muted id="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="logo" onError={(e) => e.target.style.display = 'none'} />
        <nav className="navbar">
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /> YouTube</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a></li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-main">
        {/* Job Assistance Section */}
        <section id="job-assistance" className="dashboard-section">
          <h2>Job Assistance</h2>
          <p className="section-description">Get support in finding your next job with our resources and network.</p>
          <button className="action-button" onClick={() => navigate('/job-assistance')}>Explore Job Assistance</button>
        </section>

        {/* Fundraising Section */}
        <section id="fundraising" className="dashboard-section">
          <h2>Fundraising</h2>
          <p className="section-description">Contribute to or receive funds through our community efforts.</p>
          <button className="action-button" onClick={() => navigate('/fundraising')}>Support Fundraising</button>
        </section>

        {/* Community Chat Section */}
        <section id="community-chat" className="dashboard-section">
          <h2>Community Chat</h2>
          <p className="section-description">Connect with alumni and share experiences in real-time.</p>
          <button className="action-button" onClick={() => navigate('/community-chat')}>Join Community Chat</button>
        </section>

        {/* Resources & Knowledge Transfer Section */}
        <section id="resources" className="dashboard-section">
          <h2>Resources & Knowledge Transfer</h2>
          <p className="section-description">Access valuable documents, guides, and mentorship from experts.</p>
          <button className="action-button" onClick={() => navigate('/resources')}>Explore Resources</button>
        </section>

        {/* University Tips Section */}
        <section id="university-tips" className="dashboard-section">
          <h2>University Tips</h2>
          <p className="section-description">Learn the best practices for excelling at university from past students.</p>
          <button className="action-button" onClick={() => navigate('/university-tips')}>Get University Tips</button>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Alumni Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
