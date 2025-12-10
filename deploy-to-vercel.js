#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Preparing to deploy to Vercel...\n');

// Check if vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✓ Vercel CLI is installed');
} catch (error) {
  console.log('✗ Vercel CLI is not installed');
  console.log('Please install it by running: npm install -g vercel');
  process.exit(1);
}

// Check if we're in the right directory
const vercelDeployDir = path.join(__dirname, 'vercel-deploy');
if (!fs.existsSync(vercelDeployDir)) {
  console.log('✗ vercel-deploy directory not found');
  process.exit(1);
}

console.log('✓ Found vercel-deploy directory\n');

// Change to vercel-deploy directory
process.chdir(vercelDeployDir);

// Deploy to Vercel
try {
  console.log('Deploying to Vercel...');
  console.log('Follow the prompts to log in and configure your deployment.\n');
  
  // Run vercel deploy command
  execSync('vercel --confirm', { stdio: 'inherit' });
  
  console.log('\nDeployment completed successfully!');
  console.log('\nNext steps:');
  console.log('1. After deployment, note your Vercel URL');
  console.log('2. Update the URLs in your server.js file with your actual Vercel URL');
  console.log('3. Redeploy using: vercel --prod');
  
} catch (error) {
  console.log('\nDeployment failed:', error.message);
  process.exit(1);
}