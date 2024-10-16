import React, { useState, useEffect } from 'react';
import { storage, firestore } from '../firebase'; // Adjust Firebase import as per your project structure
import {
  TextField, Button, Typography, Container, Grid, Paper, CircularProgress, Snackbar
} from '@mui/material'; // Material-UI components
import { Alert } from '@mui/material'; // Alert for feedback

const JobAssistancePage = () => {
  const [resume, setResume] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    
    if (!resume || !requirements) {
      setError('Please upload a resume and enter job requirements.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Step 1: Upload resume to Firebase Storage
      const resumeRef = storage.ref(`resumes/${resume.name}`);
      await resumeRef.put(resume);
      const resumeUrl = await resumeRef.getDownloadURL();

      // Step 2: Save job requirements and resume URL to Firestore
      await firestore.collection('jobAssistance').add({
        requirements,
        resumeUrl,
        timestamp: new Date(),
      });

      // Success message
      setSuccess(true);

      // Reset form fields
      setResume(null);
      setRequirements('');
      document.getElementById("resume-input").value = "";

      // Fetch updated submissions
      fetchSubmissions();
    } catch (error) {
      setError('Error uploading resume or saving data. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions from Firestore
  const fetchSubmissions = async () => {
    try {
      const snapshot = await firestore.collection('jobAssistance').orderBy('timestamp', 'desc').get();
      const submissionsData = snapshot.docs.map((doc) => doc.data());
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  // Fetch the submissions when the component mounts
  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Job Assistance
      </Typography>
      
      <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="requirements"
                label="Job Requirements"
                value={requirements}
                onChange={handleRequirementsChange}
                multiline
                rows={4}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                id="resume-input"
                type="file"
                onChange={handleResumeUpload}
              />
              <label htmlFor="resume-input">
                <Button variant="contained" color="primary" component="span">
                  {resume ? 'Resume Selected' : 'Upload Resume'}
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success and Error Alerts */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Submission successful!
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Display submissions */}
      <Typography variant="h5" gutterBottom>
        Submitted Resumes and Requirements
      </Typography>
      <div>
        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <Paper
              key={index}
              style={{ padding: '1rem', marginBottom: '1rem' }}
              elevation={2}
            >
              <Typography variant="body1">
                <strong>Requirements:</strong> {submission.requirements}
              </Typography>
              <Typography variant="body1">
                <strong>Resume:</strong>{' '}
                <a href={submission.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography>No submissions yet.</Typography>
        )}
      </div>
    </Container>
  );
};

export default JobAssistancePage;
NavigationPreloadManager