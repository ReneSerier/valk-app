# API Integration Guide

## Overzicht

Nu je backend klaar is, ga je de mock-data in `data.jsx` vervangen door echte API calls naar je MongoDB database.

---

## Stap 1: API Endpoints uitbreiden (server/index.js)

Je server heeft al placeholders voor `/api/opkomsten`, `/api/leden` en `/api/berichten`. Voeg CRUD-operaties toe:

**Voorbeeld:** Opkomsten ophalen met filter
```javascript
// GET /api/opkomsten?speltak=welpen
app.get('/api/opkomsten', async (req, res) => {
  try {
    const collection = db.collection('opkomsten');
    const filter = {};
    if (req.query.speltak) filter.speltak = req.query.speltak;
    
    const opkomsten = await collection.find(filter).toArray();
    res.json(opkomsten);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Voorbeeld:** Opkomst bijwerken
```javascript
app.patch('/api/opkomsten/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const collection = db.collection('opkomsten');
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## Stap 2: API Helper maken (api-client.js)

Maak een centrale plek voor alle API calls:

```javascript
// api-client.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchOpkomsten(speltak) {
  const url = speltak 
    ? `${API_URL}/opkomsten?speltak=${speltak}`
    : `${API_URL}/opkomsten`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch opkomsten: ${res.statusText}`);
  return res.json();
}

export async function createOpkomst(data) {
  const res = await fetch(`${API_URL}/opkomsten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create opkomst: ${res.statusText}`);
  return res.json();
}

export async function updateOpkomst(id, data) {
  const res = await fetch(`${API_URL}/opkomsten/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update opkomst: ${res.statusText}`);
  return res.json();
}

export async function fetchLeden(speltak) {
  const url = speltak 
    ? `${API_URL}/leden?speltak=${speltak}`
    : `${API_URL}/leden`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch leden: ${res.statusText}`);
  return res.json();
}

export async function fetchBerichten() {
  const res = await fetch(`${API_URL}/berichten`);
  if (!res.ok) throw new Error(`Failed to fetch berichten: ${res.statusText}`);
  return res.json();
}

export async function sendMessage(threadId, text) {
  const res = await fetch(`${API_URL}/berichten/${threadId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, timestamp: new Date() }),
  });
  if (!res.ok) throw new Error(`Failed to send message: ${res.statusText}`);
  return res.json();
}
```

---

## Stap 3: App.jsx aanpassen voor API calls

Vervang de mock `useState` calls met `useEffect` die de API aanroept:

```javascript
// In app.jsx
import { fetchOpkomsten, fetchLeden, fetchBerichten } from './api-client.js';

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState('home');
  const [stack, setStack] = useState([]);

  // Load data from API
  const [opkomsten, setOpkomsten] = useState([]);
  const [leden, setLeden] = useState([]);
  const [berichten, setBerichten] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [opk, led, ber] = await Promise.all([
          fetchOpkomsten(),
          fetchLeden(),
          fetchBerichten(),
        ]);
        setOpkomsten(opk);
        setLeden(led);
        setBerichten(ber);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Fall back to mock data if API fails
        setOpkomsten(OPKOMSTEN);
        setLeden(MEMBERS);
        setBerichten(MESSAGES);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>;
  }

  // ... rest of component
}
```

---

## Stap 4: Database Schema

Maak collections in MongoDB Atlas met deze structuur:

### `opkomsten` collection
```json
{
  "_id": ObjectId,
  "title": "Speurtocht door het bos",
  "emoji": "🧭",
  "speltak": "welpen",
  "date": "2026-06-20",
  "start": "10:00",
  "end": "12:30",
  "location": "Blokhut De Wilgenroos",
  "address": "Boslaan 12, Bilthoven",
  "bring": ["Stevige schoenen", "Regenjas"],
  "program": [
    { "t": "10:00", "a": "Opening & spelregels" },
    { "t": "10:20", "a": "Speurtocht met opdrachten" }
  ],
  "desc": "We trekken het bos in...",
  "signups": { "m1": "yes", "m2": "no", "m3": "pending" },
  "attendance": { "m1": "present", "m2": "absent" },
  "status": "open"
}
```

### `leden` collection
```json
{
  "_id": ObjectId,
  "name": "Sara de Vries",
  "first": "Sara",
  "speltak": "welpen",
  "avatar": "#3b7ea1",
  "parent": "Anne de Vries",
  "phone": "06 12 345 678"
}
```

### `berichten` collection
```json
{
  "_id": ObjectId,
  "id": "t1",
  "who": "Esra Bakker",
  "sub": "ouder van Mila",
  "avatar": "#c25a36",
  "last": "Mila is volgende week jarig...",
  "time": "9:24",
  "unread": 2,
  "thread": [
    { "from": "them", "text": "Hoi! Mila is zondag jarig...", "time": "9:18" }
  ]
}
```

---

## Stap 5: Seed je database (eenmalig)

Voeg een `seed` endpoint toe om je database te vullen met testdata:

```javascript
// In server/index.js
app.post('/api/seed', async (req, res) => {
  try {
    const opkCollection = db.collection('opkomsten');
    const ledCollection = db.collection('leden');
    const berCollection = db.collection('berichten');
    
    // Clear existing data
    await opkCollection.deleteMany({});
    await ledCollection.deleteMany({});
    await berCollection.deleteMany({});
    
    // Insert test data
    await opkCollection.insertMany(OPKOMSTEN);
    await ledCollection.insertMany(MEMBERS);
    await berCollection.insertMany(MESSAGES);
    
    res.json({ message: 'Database seeded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

Run eenmalig:
```bash
curl -X POST http://localhost:3001/api/seed
```

---

## Stap 6: Environment Variables

Add to `.env`:
```
MONGODB_URI=mongodb+srv://opkomst:password@cluster.mongodb.net/valk-app
REACT_APP_API_URL=http://localhost:3001/api
```

Voor production (Vercel), set `REACT_APP_API_URL` naar je live domain:
```
REACT_APP_API_URL=https://valk-app.vercel.app/api
```

---

## Testing

Gebruik een tool als **Postman** of **curl** om endpoints te testen:

```bash
# Get all opkomsten
curl http://localhost:3001/api/opkomsten

# Create new opkomst
curl -X POST http://localhost:3001/api/opkomsten \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","speltak":"welpen"}'

# Update opkomst
curl -X PATCH http://localhost:3001/api/opkomsten/123 \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

---

## Deployment Checklist

Before pushing to production:
- [ ] Environment variables configured in Vercel
- [ ] API URL points to production domain
- [ ] Database user has proper permissions
- [ ] CORS configured for your Vercel domain
- [ ] Test all CRUD operations in production
- [ ] Monitor logs for errors

---

**Next:** Start converting `data.jsx` → API calls! 🚀
