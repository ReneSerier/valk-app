@echo off
REM Quick setup script for Windows

echo.
echo 🚀 Setting up Opkomst App...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js not found. Install from nodejs.org first.
  pause
  exit /b 1
)

echo ✓ Node.js found
node --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Create .env if it doesn't exist
if not exist .env (
  echo.
  echo 📝 Creating .env file from .env.example...
  copy .env.example .env
  echo ⚠️  Edit .env with your MongoDB URI before running 'npm run dev'
) else (
  echo ✓ .env already exists
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit .env with your MongoDB connection string
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3001
echo.
pause
