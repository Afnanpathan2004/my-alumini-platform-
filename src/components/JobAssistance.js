import React, { useState } from 'react';
import { db, storage } from './firebaseConfig'; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { collection, addDoc } from 'firebase/firestore';
import './JobAssistancePage.css'; // External CSS for better styling

const JobAssistance = () => {
  const [resume, setResume] = useState(null);
  const [jobRequirement, setJobRequirement] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleJobRequirementChange = (e) => {
    setJobRequirement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobRequirement) {
      alert('Please upload a resume and provide a job requirement.');
      return;
    }

    setIsUploading(true);

    try {
      // Upload resume to Firebase Storage
      const storageRef = ref(storage, `resumes/${resume.name}`);
      await uploadBytes(storageRef, resume);
      const downloadURL = await getDownloadURL(storageRef);

      // Save job requirement and resume link to Firestore
      const docRef = await addDoc(collection(db, 'jobAssistanceSubmissions'), {
        jobRequirement,
        resumeURL: downloadURL,
        timestamp: new Date(),
      });

      setUploadSuccess(true);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error uploading document: ', error);
      alert('Error uploading, please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="job-assistance-container">
      <h2 className="job-assistance-heading">Job Assistance</h2>
      <p className="job-assistance-description">
        Upload your resume and provide details about the type of job you're looking for. 
        Our alumni network will help you find the right opportunity!
      </p>
      <form className="job-assistance-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resume" className="form-label">Upload Resume:</label>
          <input 
            type="file" 
            id="resume" 
            accept=".pdf,.doc,.docx" 
            className="form-input" 
            onChange={handleResumeChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobRequirement" className="form-label">Job Requirement:</label>
          <textarea 
            id="jobRequirement" 
            value={jobRequirement} 
            onChange={handleJobRequirementChange} 
            className="form-input textarea-input"
            placeholder="Enter your job requirement" 
            required 
          />
        </div>
        <button type="submit" className="submit-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit'}
        </button>
        {uploadSuccess && <p className="success-message">Submission successful!</p>}
      </form>
    </div>
  );
};

export default JobAssistance;
