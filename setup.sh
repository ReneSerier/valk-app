#!/bin/bash
# Quick setup script for macOS/Linux

echo "🚀 Setting up Opkomst App..."

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install from nodejs.org first."
  exit 1
fi

echo "✓ Node.js found ($(node --version))"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp .env.example .env
  echo "⚠️  Edit .env with your MongoDB URI before running 'npm run dev'"
else
  echo "✓ .env already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your MongoDB connection string"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3001"
