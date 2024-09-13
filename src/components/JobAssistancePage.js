import React, { useState, useEffect } from 'react';
import { storage, firestore } from '../firebase'; // Import Firebase storage and Firestore

const JobAssistancePage = () => {
  const [resume, setResume] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [submissions, setSubmissions] = useState([]); // State for storing fetched submissions

  // Handle resume upload
  const handleResumeUpload = (event) => {
    setResume(event.target.files[0]);
  };

  // Handle requirements input change
  const handleRequirementsChange = (event) => {
    setRequirements(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resume) {
      alert('Please upload a resume.');
      return;
    }

    try {
      // Step 1: Upload resume to Firebase Storage
      const resumeRef = storage.ref(`resumes/${resume.name}`);
      await resumeRef.put(resume);
      const resumeUrl = await resumeRef.getDownloadURL(); // Get download URL

      // Step 2: Save job requirements and resume URL to Firestore
      await firestore.collection('jobAssistance').add({
        requirements, // Store the user's job requirements
        resumeUrl, // Store the resume URL
        timestamp: new Date() // Add a timestamp for when the form was submitted
      });

      // Success message
      alert('Resume and requirements submitted successfully.');
      
      // Reset form fields
      setResume(null);
      setRequirements('');

      // Fetch the updated submissions
      fetchSubmissions();
    } catch (error) {
      console.error('Error uploading resume or saving data:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  // Fetch submissions from Firestore
  const fetchSubmissions = async () => {
    try {
      const snapshot = await firestore.collection('jobAssistance').orderBy('timestamp', 'desc').get();
      const submissionsData = snapshot.docs.map((doc) => doc.data());
      setSubmissions(submissionsData); // Store the fetched data in state
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  // Fetch the submissions when the component mounts
  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="job-assistance-page">
      <h1>Job Assistance</h1>
      <form onSubmit={handleSubmit}> {/* Link the form to handleSubmit */}
        <div>
          <label htmlFor="resume">Upload Resume:</label>
          <input type="file" id="resume" onChange={handleResumeUpload} />
        </div>
        <div>
          <label htmlFor="requirements">Job Requirements:</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={handleRequirementsChange}
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Resumes and Requirements</h2>
      <div className="submissions">
        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <div key={index} className="submission-item">
              <p><strong>Requirements:</strong> {submission.requirements}</p>
              <p>
                <strong>Resume:</strong>{' '}
                <a href={submission.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default JobAssistancePage;
