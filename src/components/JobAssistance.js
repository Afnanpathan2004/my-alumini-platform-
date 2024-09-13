import React, { useState } from 'react';
import { db, storage } from './firebaseConfig'; // Assuming you've configured Firebase in firebaseConfig.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { collection, addDoc } from 'firebase/firestore';

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
    <div>
      <h2>Job Assistance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume:</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required />
        </div>
        <div>
          <label>Job Requirement:</label>
          <textarea 
            value={jobRequirement} 
            onChange={handleJobRequirementChange} 
            placeholder="Enter your job requirement" 
            required 
          />
        </div>
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit'}
        </button>
        {uploadSuccess && <p>Submission successful!</p>}
      </form>
    </div>
  );
};

export default JobAssistance;
