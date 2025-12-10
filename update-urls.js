const fs = require('fs');
const path = require('path');

// Function to update URLs in server.js
function updateUrls(oldUrl, newUrl, filePath) {
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all instances of the old URL with the new URL
  const updatedContent = content.replace(new RegExp(oldUrl, 'g'), newUrl);
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  console.log(`Updated URLs in ${filePath}`);
  console.log(`Replaced: ${oldUrl} -> ${newUrl}`);
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Usage: node update-urls.js <old-url> <new-url>');
  console.log('Example: node update-urls.js "https://your-vercel-app.vercel.app" "https://my-app.vercel.app"');
  process.exit(1);
}

const oldUrl = args[0];
const newUrl = args[1];

// Update the server.js file
const serverJsPath = path.join(__dirname, 'vercel-deploy', 'server.js');

try {
  updateUrls(oldUrl, newUrl, serverJsPath);
  console.log('URLs updated successfully!');
  console.log('Please redeploy your application to Vercel for changes to take effect.');
} catch (error) {
  console.error('Error updating URLs:', error.message);
  process.exit(1);
}