const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Student information
const studentInfo = {
  name: 'MD. Abdul Lotif',
  id: '2222081018',
  department: 'CSE',
  email: '2222081018@uttarauniversity.edu.bd',
  batch: '57',
  section: 'A',
  semester: 'Fall',
  year: '2025',
  university: 'Uttara University'
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rslatif1287@gmail.com',
    pass: 'stnc cixj mnfw qdpa' // Use App Password for Gmail
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Endpoint to send email
app.post('/api/send-email', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { from, to, subject, text } = req.body;
    
    // Validate required fields
    if (!to) {
      return res.status(400).json({ message: 'Recipient email is required' });
    }
    
    // If text is not provided, create formatted student information
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`;
    const emailText = text || `UTTARA UNIVERSITY
Student Information Portal
=========================

You have received student information from Uttara University.

To view the student details, please click on the link below:
${baseUrl}/student-info.html

Alternatively, you can copy and paste this link into your web browser.

=========================
© ${new Date().getFullYear()} Uttara University. All rights reserved.
This is an automated student information email.`;

    const mailOptions = {
      from: from || 'rslatif1287@gmail.com',
      to: to,
      subject: subject || 'University Information',
      text: emailText,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%);
            }
            .header {
              background: linear-gradient(135deg, #004080 0%, #002d5c 100%);
              color: white;
              padding: 25px;
              text-align: center;
              border-radius: 10px 10px 0 0;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .content {
              background: white;
              border: 2px solid #004080;
              border-top: none;
              padding: 30px;
              text-align: center;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .view-button {
              background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
              color: white;
              padding: 18px 35px;
              text-decoration: none;
              border-radius: 50px;
              font-size: 20px;
              font-weight: bold;
              display: inline-block;
              margin: 25px 0;
              cursor: pointer;
              border: none;
              box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
              transition: all 0.3s ease;
            }
            .view-button:hover {
              background: linear-gradient(135deg, #0056b3 0%, #003d80 100%);
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
            }
            .view-button:active {
              transform: translateY(0);
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              font-size: 12px;
              color: #6c757d;
              text-align: center;
            }
            .note {
              background-color: #e7f3ff;
              border-left: 4px solid #007bff;
              padding: 15px;
              margin: 20px 0;
              border-radius: 0 4px 4px 0;
              font-size: 14px;
              text-align: left;
            }
            .university-icon {
              font-size: 48px;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="university-icon">🎓</div>
            <h1>UTTARA UNIVERSITY</h1>
            <p>Student Information Portal</p>
          </div>
          
          <div class="content">
            <p>Hello! You have received student information from Uttara University.</p>
            
            <div class="note">
              <strong>✨ Special Access Link</strong><br>
              Click the button below to securely view the confidential student details.
            </div>
            
            <a href="${baseUrl}/student-info.html" class="view-button">👁️ View Student Information</a>
            
            <div class="note">
              <strong>🔒 Secure Access</strong><br>
              If the button doesn't work, copy and paste this link in your browser:<br>
              <code>${baseUrl}/student-info.html</code>
            </div>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Uttara University. All rights reserved.</p>
            <p>This is an official, automated student information email.</p>
          </div>
        </body>
        </html>
      `
    };

    // For testing purposes, we'll skip actual email sending
    // Uncomment the following lines when you want to actually send emails
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
          
    // For testing, just return success without actually sending
    // res.status(200).json({ message: 'Email would be sent successfully to ' + to });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your Gmail credentials and ensure you are using an App Password.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. Please check your network connection.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid login credentials. Please ensure you are using a valid Gmail App Password.';
    }
    
    res.status(500).json({ message: errorMessage, error: error.toString() });
  }
});

// Serve React frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/student-info.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'student-info.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});