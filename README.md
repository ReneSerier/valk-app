# Opkomst — Scouting App v1

Een moderne web-app voor scoutingverenigingen (en andere organisaties) om opkomsten, leden en communicatie te beheren.

## 🚀 Quick Start

### Lokaal draaien (Windows)

#### 1. Node.js installeren
- Download van [nodejs.org](https://nodejs.org) (LTS versie, 18+)
- Volg de installer
- Check: `node --version` en `npm --version` in PowerShell

#### 2. Project klonen & dependencies installeren
```bash
git clone https://github.com/jouw-username/valk-app.git
cd valk-app
npm install
```

#### 3. MongoDB Atlas opzetten (gratis)
1. Ga naar [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Maak een account
3. Klik "Create a Project"
4. Klik "Create a Cluster" (kies de gratis M0 tier)
5. Klik "Database Access" → "Add Database User"
   - Username: `opkomst`
   - Password: genereer een sterke
   - Klik "Add User"
6. Klik "Network Access" → "Add IP Address"
   - Selecteer "Allow access from anywhere" (voor nu)
7. Terug naar "Databases", klik "Connect" op je cluster
   - Kies "Connect your application"
   - Copy je connection string (ziet er zo uit):
   ```
   mongodb+srv://opkomst:PASSWORD@cluster.mongodb.net/valk-app?retryWrites=true&w=majority
   ```

#### 4. `.env` bestand aanmaken
Maak een nieuw bestand `.env` in de project-root:
```
MONGODB_URI=mongodb+srv://opkomst:jouw-password@cluster.mongodb.net/valk-app
PORT=3001
FRONTEND_URL=http://localhost:3001
```

#### 5. Server starten
```bash
npm run dev
```
Je zou moeten zien:
```
✓ MongoDB connected
🚀 Opkomst API listening on http://localhost:3001
```

Open http://localhost:3001 in je browser → je bent live! 🎉

---

## 📦 Deploy naar Vercel

### 1. GitHub opzetten
```bash
git add .
git commit -m "Initial commit: Opkomst app"
git push origin main
```

### 2. Vercel verbinden
1. Ga naar [vercel.com](https://vercel.com)
2. Log in met GitHub
3. Klik "New Project"
4. Selecteer je `valk-app` repo
5. Klik "Deploy"

### 3. Environment variables toevoegen
In Vercel Dashboard:
1. Ga naar je project → "Settings" → "Environment Variables"
2. Voeg toe:
   - `MONGODB_URI`: je MongoDB connection string
   - `FRONTEND_URL`: je Vercel URL (bijv. `https://valk-app.vercel.app`)
3. Redeploy

Je app is nu live! 🌍

---

## 📋 Project Structure

```
valk-app/
├── server/
│   └── index.js              # Express backend
├── Opkomst - scouting app.html  # Main frontend
├── app.jsx                   # React root component
├── data.jsx                  # Mock data (later: DB calls)
├── theme.jsx                 # Design system
├── ui.jsx                    # UI components & icons
├── screens-*.jsx             # Screen components
├── tweaks-panel.jsx          # Design tweak controls
├── package.json              # Dependencies
├── .env.example              # Example env vars
└── README.md                 # This file
```

---

## 🔄 Next Steps

### Nu (MVP):
- [x] Express backend opzetten
- [x] MongoDB connectie
- [x] Lokaal & Vercel deployment
- [ ] Mock data → Database calls in `data.jsx`
- [ ] Login/auth toevoegen

### Later:
- [ ] API endpoints afmaken (CRUD)
- [ ] Real-time updates (WebSockets)
- [ ] Push notifications
- [ ] Offline mode

---

## 🛠️ Development

### Git workflow
```bash
git checkout -b feature/new-feature
# make changes
git add .
git commit -m "feat: describe your change"
git push origin feature/new-feature
# Create pull request on GitHub
```

### Hot reload (local)
Nodemon is al ingesteld, dus je server reloadt automatisch bij file-changes.

---

## 📞 Support

- MongoDB docs: [docs.mongodb.com](https://docs.mongodb.com)
- Express docs: [expressjs.com](https://expressjs.com)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

**Maintainer:** [Jouw naam]  
**License:** MIT
