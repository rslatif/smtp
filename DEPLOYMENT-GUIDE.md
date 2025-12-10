# Vercel Deployment Guide

## Prerequisites
1. Create a GitHub account if you don't have one
2. Create a Vercel account at https://vercel.com/

## Deployment Steps

### 1. Prepare Your Code
Make sure your `vercel-deploy` directory contains:
- `server.js` (main application file)
- `package.json` (dependencies)
- `vercel.json` (Vercel configuration)
- `public/` directory with all HTML files

### 2. Push to GitHub
1. Create a new repository on GitHub
2. Push your `vercel-deploy` directory contents to the repository

### 3. Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: Leave empty (or specify if your files are in a subdirectory)
   - Build Command: `npm install`
   - Output Directory: Leave empty
5. Click "Deploy"

### 4. Configure Environment Variables
After deployment, go to your project settings:
1. Click on your project in the Vercel dashboard
2. Go to "Settings" > "Environment Variables"
3. Add these variables:
   - `GMAIL_USER`: your Gmail address (rslatif1287@gmail.com)
   - `GMAIL_PASS`: your Gmail App Password (stnc cixj mnfw qdpa)

### 5. Update URLs in Your Code
After deployment, update the URLs in your `server.js` file:
1. Replace `https://your-vercel-app.vercel.app` with your actual Vercel URL
2. Redeploy the application

## Troubleshooting

### Common Issues:
1. **404 Errors**: Make sure your routes are correctly defined in `server.js`
2. **Email Not Sending**: Check your Gmail credentials and App Password
3. **Styling Issues**: Ensure all CSS is inline or properly linked

### URL Structure:
- Main page: `https://your-app-name.vercel.app/`
- Student info page: `https://your-app-name.vercel.app/student-info.html`
- API endpoint: `https://your-app-name.vercel.app/api/send-email`
- Test page: `https://your-app-name.vercel.app/test-email.html`

## Testing Your Deployment
1. Visit your main page to ensure it loads correctly
2. Go to `/test-email.html` to test the email functionality
3. Send a test email to verify everything works
4. Check that the link in the email directs to the student information page

## Updating Your Deployment
To update your deployed application:
1. Make changes to your local files
2. Commit and push to GitHub
3. Vercel will automatically redeploy your application