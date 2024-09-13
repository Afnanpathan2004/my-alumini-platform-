import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import your firebase configuration
import './LoginPage.css';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [post, setPost] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!/^\d{9}$/.test(rollNo)) {
      toast.error('Roll Number must be exactly 9 digits.');
      return;
    }

    if (!/^\d{4}$/.test(yearOfPassing)) {
      toast.error('Year of Passing must be exactly 4 digits.');
      return;
    }

    try {
      // Add the user profile data to Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        rollNo: Number(rollNo), // Store as number
        branch,
        post,
        yearOfPassing: Number(yearOfPassing) // Store as number
      });

      console.log('Document written with ID: ', docRef.id);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Error creating profile.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Roll No:
            <input 
              type="number" 
              value={rollNo} 
              onChange={(e) => setRollNo(e.target.value)} 
              min="100000000" 
              max="999999999" 
              required 
            />
          </label>
          <label>
            Branch:
            <input 
              type="text" 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)} 
              required 
            />
          </label>
          <label>
            Post:
            <input 
              type="text" 
              value={post} 
              onChange={(e) => setPost(e.target.value)} 
              required 
            />
          </label>
          <label>
            Year of Passing:
            <input 
              type="number" 
              value={yearOfPassing} 
              onChange={(e) => setYearOfPassing(e.target.value)} 
              min="1000" 
              max="9999" 
              required 
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
