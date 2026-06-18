import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// ── MongoDB Setup ────────────────────────────────────────
let db;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/valk-app';
const mongoClient = new MongoClient(mongoUri);

async function connectDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db('valk-app');
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// ── Routes ────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Opkomst API running' });
});

// Placeholder: Opkomsten (events)
app.get('/api/opkomsten', async (req, res) => {
  try {
    const collection = db.collection('opkomsten');
    const opkomsten = await collection.find({}).toArray();
    res.json(opkomsten);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/opkomsten', async (req, res) => {
  try {
    const collection = db.collection('opkomsten');
    const result = await collection.insertOne(req.body);
    res.json({ _id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder: Leden (members)
app.get('/api/leden', async (req, res) => {
  try {
    const collection = db.collection('leden');
    const leden = await collection.find({}).toArray();
    res.json(leden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder: Berichten (messages)
app.get('/api/berichten', async (req, res) => {
  try {
    const collection = db.collection('berichten');
    const berichten = await collection.find({}).toArray();
    res.json(berichten);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all: serve the main HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Opkomst - scouting app.html'));
});

// ── Start Server ──────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Opkomst API listening on http://localhost:${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoClient.close();
  process.exit(0);
});


export default app;