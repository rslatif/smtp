import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UniversityInfo = () => {
  const navigate = useNavigate();
  const [emailStatus, setEmailStatus] = useState('');
  const [recipientEmail, setRecipientEmail] = useState(''); // Email to send to
  const [senderEmail] = useState('rslatif1287@gmail.com'); // Fixed sender email
  const [showInfo, setShowInfo] = useState(false); // State to control visibility of info

  const studentInfo = {
    name: "MD. Abdul Lotif",
    id: "2222081018",
    semester: "Fall 2025",
    university: "Uttara University"
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleSendEmail = async () => {
    if (!recipientEmail) {
      setEmailStatus('Please enter a recipient email address');
      return;
    }
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: recipientEmail,
          subject: 'University Information',
          text: `University Information
===================

Name: ${studentInfo.name}
ID: ${studentInfo.id}
Semester: ${studentInfo.semester}
University: ${studentInfo.university}

===================
This email contains the university information for the student.`
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response from server');
      }

      const result = await response.json();
      
      if (response.ok) {
        setEmailStatus('Email sent successfully to ' + recipientEmail + '!');
      } else {
        setEmailStatus('Failed to send email: ' + result.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('Error: ' + error.message);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="university-container">
      <h1>University Information</h1>
      
      {!showInfo ? (
        <div>
          <p>Click the button below to view university information</p>
          <button className="navigate-button" onClick={handleShowInfo} style={{ backgroundColor: '#FF9800' }}>
            Show Information
          </button>
        </div>
      ) : (
        <>
          <div className="info-item">
            <span className="info-label">Sender Email:</span>
            <span className="info-value">{senderEmail}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Recipient Email:</span>
            <input 
              type="email" 
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient email address"
              style={{ marginLeft: '10px', padding: '5px', width: '250px' }}
            />
          </div>
          
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{studentInfo.name}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">ID:</span>
            <span className="info-value">{studentInfo.id}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Semester:</span>
            <span className="info-value">{studentInfo.semester}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">University:</span>
            <span className="info-value">{studentInfo.university}</span>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button className="navigate-button" onClick={handleSendEmail} style={{ backgroundColor: '#2196F3', marginRight: '10px' }}>
              Send Email
            </button>
            <button className="navigate-button" onClick={handleBack} style={{ backgroundColor: '#f44336' }}>
              Back to SMS
            </button>
          </div>
        </>
      )}
      
      {emailStatus && (
        <div style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: emailStatus.includes('successfully') ? '#dff0d8' : '#f2dede', color: emailStatus.includes('successfully') ? '#3c763d' : '#a94442' }}>
          {emailStatus}
        </div>
      )}
    </div>
  );
};

export default UniversityInfo;