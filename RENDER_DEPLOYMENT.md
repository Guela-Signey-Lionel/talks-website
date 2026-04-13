# TALKS Website - Guide de Déploiement sur Render.com

## 🚀 Étapes de déploiement

### 1. Préparation sur GitHub
Assurez-vous que votre code est pushé sur GitHub:
```bash
git add .
git commit -m "Add Render deployment configuration"
git push
```

### 2. Sur Render.com

#### Option A: Déploiement automatique avec `render.yaml`
1. Accédez à [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repository GitHub
4. Sélectionnez le repository `talks-website`
5. Render détectera automatiquement `render.yaml` et configurera le déploiement
6. Cliquez sur **"Deploy"**

#### Option B: Configuration manuelle
1. Créez un nouveau **Web Service** sur Render
2. Connectez votre repository GitHub
3. Configurez les paramètres suivants:
   - **Name:** `talks-website`
   - **Root Directory:** `/` (racine du repo)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server.js`
   - **Environment:** Node
   - **Region:** Frankfurt (ou votre préférence)
4. Cliquez sur **"Create Web Service"**

### 3. Vérifier le déploiement
- Une fois déployé, Render vous donnera une URL comme: `https://talks-website.onrender.com`
- Accédez à cette URL pour vérifier que le site fonctionne

### 4. Mises à jour futures
- À chaque push sur GitHub, Render redéploiera automatiquement votre site
- Vous pouvez voir l'état du déploiement dans le tableau de bord Render

## 📋 Fichiers de configuration

- **render.yaml** - Configuration de Render pour le déploiement
- **server.js** - Server Node.js qui sert les fichiers statiques
- **vite.config.ts** - Compile le code React dans le dossier `out/`

## ⚙️ Variables d'environnement (optionnel)

Si vous avez besoin de variables d'environnement (API keys, etc.):

1. Allez dans **Settings** de votre Web Service sur Render
2. Allez à la section **Environment**
3. Ajoutez vos variables:
   - `VITE_API_URL` (pour les appels API externes)
   - `NODE_ENV=production` (déjà configuré)

## 🔗 Domaine personnalisé

Pour connecter un domaine personnalisé:
1. Allez dans **Settings** → **Custom Domain**
2. Ajoutez votre domaine (ex: talks-rca.org)
3. Suivez les instructions pour les enregistrements DNS

## 📝 Notes importantes

- **Build output:** Le dossier `out/` contient les fichiers compilés
- **React Router:** Le server.js redirige toutes les routes vers `index.html` pour React Router
- **Free plan Render:** Le service peut être suspendu après 15 minutes d'inactivité
- **SSL/HTTPS:** Automatiquement inclus avec Render

## ❌ Dépannage

**Erreur "Cannot find module 'express'":**
- Exécutez: `npm install`

**Site retourne 404:**
- Vérifiez que `npm run build` génère les fichiers dans `out/`
- Vérifiez les logs dans le tableaud de bord Render

**Port non disponible:**
- Le serveur écoute sur le port défini par Render via `process.env.PORT`

## 📧 Support

Pour plus d'aide: https://render.com/docs
