# Stap-voor-stap setup op Windows

## Doel
Je hebt straks:
- De Opkomst-app lokaal draaiend
- Een MongoDB database in de cloud
- Klaar om naar Vercel te deployen

---

## Stap 1: Node.js installeren

1. Download Node.js LTS van [nodejs.org](https://nodejs.org)
   - Kies de "LTS" (Long Term Support) versie
   
2. Run the installer
   - Standard installation is fine
   - Check "Automatically install necessary tools"
   
3. Sluit alles af, start een **NIEUWE PowerShell** en test:
   ```powershell
   node --version
   npm --version
   ```
   Je zou versies moeten zien (bijv. `v18.16.0`)

---

## Stap 2: Project setup

1. **Open PowerShell** in je project-folder (of navigeer er heen)

2. Installeer dependencies:
   ```powershell
   npm install
   ```
   Dit duurt 1-2 minuten. Je krijgt een `node_modules/` folder.

---

## Stap 3: MongoDB Atlas (gratis database in de cloud)

1. Ga naar [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. Klik "Try Free" → Sign up
   - Email: je email
   - Password: sterke password
   - Click "Create My Atlas Account"

3. In de "Deploy your database" scherm:
   - Kies "M0 Sandbox" (free)
   - Region: kies dicht bij je (bijv. Frankfurt)
   - Cluster Name: "valk-app"
   - Klik "Create Deployment"

4. **Database User aanmaken:**
   - Linkermenú: "Database Access"
   - Klik "Add New Database User"
   - Username: `opkomst`
   - Password: Generate secure → Copy & save het ergens!
   - Click "Add User"

5. **IP Whitelist:**
   - Linkermenú: "Network Access"
   - Klik "Add IP Address"
   - Klik "Allow access from anywhere" (0.0.0.0/0)
   - Confirm

6. **Connection String ophalen:**
   - Linkermenú: "Databases"
   - Klik "Connect" op je cluster
   - Kies "Connect your application"
   - Copy de connection string (ziet er zo uit):
   ```
   mongodb+srv://opkomst:PASSWORD@cluster.mongodb.net/valk-app?retryWrites=true&w=majority
   ```
   - **Vervang `PASSWORD` met je echte wachtwoord!**

---

## Stap 4: `.env` bestand aanmaken

1. **Open de project-root in Notepad** of VS Code

2. Maak een NIEUW bestand: `.env` (ja, met een punt ervoor!)
   ```
   MONGODB_URI=mongodb+srv://opkomst:JOUW_PASSWORD@cluster.mongodb.net/valk-app?retryWrites=true&w=majority
   PORT=3001
   FRONTEND_URL=http://localhost:3001
   ```
   - Vervang `JOUW_PASSWORD` met je echte MongoDB wachtwoord
   
3. Save het bestand

---

## Stap 5: Server lokaal starten

1. **PowerShell in project-root**, run:
   ```powershell
   npm run dev
   ```

2. Je zou moeten zien:
   ```
   ✓ MongoDB connected
   🚀 Opkomst API listening on http://localhost:3001
   ```

3. **Open je browser:** http://localhost:3001
   - Je ziet de Opkomst-app! 🎉

4. **Stoppen:** Ctrl+C in PowerShell

---

## Stap 6: GitHub opzetten

1. Ga naar [github.com](https://github.com)
   - Sign up / Log in
   
2. Klik "New repository"
   - Name: `valk-app`
   - Description: "Opkomst — scouting app"
   - Public (zodat je Vercel het kan zien)
   - Click "Create repository"

3. **In je PowerShell (project-root):**
   ```powershell
   git config --global user.name "Jouw Naam"
   git config --global user.email "jouw@email.com"
   
   git init
   git add .
   git commit -m "Initial commit: Opkomst app"
   git branch -M main
   git remote add origin https://github.com/jouw-username/valk-app.git
   git push -u origin main
   ```
   - Vul je username en password in als gevraagd (of use GitHub token)

---

## Stap 7: Vercel Deploy

1. Ga naar [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Kies "Continue with GitHub"
   - Authorize Vercel

2. Klik "New Project"
   - Selecteer je `valk-app` repository
   - Click "Import"

3. **Environment Variables:**
   - Klik in het "Environment Variables" field
   - Voeg toe:
     - `MONGODB_URI`: je MongoDB connection string
     - `FRONTEND_URL`: (leave empty voor nu, of `https://valk-app.vercel.app`)
   - Click "Deploy"

4. Wacht ~2 minuten
   - Je zou "Deployment successful" moeten zien
   - Klik je domain (bijv. `valk-app.vercel.app`)
   - Je app is LIVE! 🚀

---

## ✅ Je bent klaar!

- ✓ MongoDB in de cloud
- ✓ Server lokaal draaiend
- ✓ App gedeployed op Vercel
- ✓ Klaar om te developpen

### Nu kan je:
- **Lokaal:** `npm run dev` → http://localhost:3001
- **Live:** https://valk-app.vercel.app
- **Code:** Push naar GitHub, Vercel deployed automatisch

Veel plezier! 🎉
