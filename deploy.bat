@echo off
echo Preparing to deploy to Vercel...
echo.

REM Change to vercel-deploy directory
cd /d "d:\8TH semester\smtp\vercel-deploy"

REM Check if vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI is not installed.
    echo Please install it by running: npm install -g vercel
    pause
    exit /b 1
)

echo Vercel CLI is installed.
echo.

echo Deploying to Vercel...
echo Follow the prompts to log in and configure your deployment.
echo.

vercel --confirm

if %errorlevel% equ 0 (
    echo.
    echo Deployment completed successfully!
    echo.
    echo Next steps:
    echo 1. After deployment, note your Vercel URL
    echo 2. Update the URLs in your server.js file with your actual Vercel URL
    echo 3. Redeploy using: vercel --prod
) else (
    echo.
    echo Deployment failed.
)

pause