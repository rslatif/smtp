import React, { useState } from 'react';
import './SmsPage.css';

const SmsPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const studentInfo = {
    name: "MD. Abdul Lotif",
    id: "2222081018",
    department: "CSE",
    email: "2222081018@uttarauniversity.edu.bd",
    batch: "57",
    section: "A",
    semester: "Fall",
    year: "2025",
    university: "Uttara University"
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
          to: recipientEmail,
          subject: 'Student Information - Uttara University'
        }),
      });

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

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleHideInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="sms-container">
      <div className="header-section">
        <h1>📧 University Information Sender</h1>
        <p>Send student information via email in professional format</p>
      </div>
      
      <div className="email-input-section">
        <div className="input-group">
          <label htmlFor="email">📨 Recipient Email Address:</label>
          <input 
            type="email" 
            id="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Enter recipient email address"
            className="email-input"
          />
        </div>
        
        <button 
          onClick={handleSendEmail}
          className="send-button"
        >
          📤 Send Student Information
        </button>
        
        {emailStatus && (
          <div className={`status-message ${emailStatus.includes('successfully') ? 'success' : 'error'}`}>
            {emailStatus}
          </div>
        )}
      </div>
      
      <div className="preview-section">
        <h2>👁️ Preview Student Information</h2>
        
        {!showInfo ? (
          <div className="preview-hidden">
            <p>Click the button below to preview the information that will be sent:</p>
            <button 
              onClick={handleShowInfo}
              className="view-button"
            >
              👁️ View Student Information
            </button>
          </div>
        ) : (
          <div className="preview-content">
            <div className="student-card">
              <div className="card-header">
                <div className="university-badge">
                  <span className="uni-abbr">UU</span>
                  <span className="uni-name">Uttara University</span>
                </div>
                <div className="academic-badge">Fall 2025</div>
              </div>
              
              <div className="student-name-large">{studentInfo.name}</div>
              
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Student ID:</span>
                  <span className="info-value id-highlight">{studentInfo.id}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Department:</span>
                  <span className="info-value">{studentInfo.department}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value email-text">{studentInfo.email}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Batch:</span>
                  <span className="info-value batch-tag">Batch {studentInfo.batch}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Section:</span>
                  <span className="info-value section-tag">Section {studentInfo.section}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Semester:</span>
                  <span className="info-value semester-tag">{studentInfo.semester}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Year:</span>
                  <span className="info-value year-display">{studentInfo.year}</span>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="timestamp">Generated on: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
            
            <button 
              onClick={handleHideInfo}
              className="hide-button"
            >
              🔒 Hide Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmsPage;