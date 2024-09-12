import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import GoogleSignIn from './GoogleSignIn';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Alumni Platform</h1>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/google-signin" element={<GoogleSignIn />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
