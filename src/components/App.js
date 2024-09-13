import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Dashboard from './Dashboard';
import GoogleSignIn from './GoogleSignIn';
import LoginPage from './LoginPage';
import './index.css';
import JobAssistance from '../components/JobAssistance';
import Fundraising from '../components/Fundraising';
import CommunityChat from '../components/CommunityChat';
import Resources from '../components/Resources';
import UniversityTips from '../components/UniversityTips';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Alumni Platform</h1>
          <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/google-signin" element={<GoogleSignIn />} />
            <Route path="/job-assistance" element={<JobAssistance />} />
            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/university-tips" element={<UniversityTips />} />
          </Routes>
        </header>

        {/* Navigation Bar */}
        <nav>
          <ul>
            <li><Link to="/job-assistance">Explore Job Assistance</Link></li>
            <li><Link to="/fundraising">Support Fundraising</Link></li>
            <li><Link to="/community-chat">Join Community Chat</Link></li>
            <li><Link to="/resources">Explore Resources</Link></li>
            <li><Link to="/university-tips">Get University Tips</Link></li>
            <Link to="/dashboard">Go to Dashboard</Link>
          </ul>
        </nav>

        {/* Page Routes */}
      </div>
    </Router>
  );
}

export default App;
