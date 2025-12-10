import React, { useState } from 'react';

const SmsPage = () => {
  const [emailStatus, setEmailStatus] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

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
          subject: 'University Information',
          text: `University Information
===================

Name: MD. Abdul Lotif
ID: 2222081018
Semester: Fall 2025
University: Uttara University

===================
This email contains the university information for the student.`
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

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>University Information Sender</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email">Recipient Email:</label><br />
        <input 
          type="email" 
          id="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="Enter recipient email address"
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>
      
      <button 
        onClick={handleSendEmail}
        style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white',
          padding: '10px 20px', 
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Send University Information
      </button>
      
      {emailStatus && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: emailStatus.includes('successfully') ? '#dff0d8' : '#f2dede', 
          color: emailStatus.includes('successfully') ? '#3c763d' : '#a94442'
        }}>
          {emailStatus}
        </div>
      )}
    </div>
  );
};

export default SmsPage;