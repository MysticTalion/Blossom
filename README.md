# 🌸 Blossom SSBU - Site Web

Site officiel de l'équipe/association Blossom SSBU pour Super Smash Bros Ultimate.

## 📁 Structure du projet

```
blossom-ssbu/
├── index.html          # Page principale
├── style.css           # Styles et couleurs
├── script.js           # Fonctionnalités JavaScript
├── README.md           # Documentation
└── images/             # Dossier images (à créer)
    ├── logo.png
    ├── weeklies/       # Graphiques des tournois
    │   ├── 
    │   └── 
    └── sprites/        # Images des personnages
        ├── 
        └── 
```

## 🚀 Installation sur GitHub Pages

### 1. Créer le dépôt GitHub
1. Allez sur https://github.com et connectez-vous
2. Cliquez sur le **+** en haut à droite → **New repository**
3. Nommez-le : `blossom-ssbu`
4. Cochez "Add a README file"
5. Cliquez sur **Create repository**

### 2. Upload des fichiers
1. Cliquez sur **Add file** → **Upload files**
2. Glissez-déposez tous les fichiers (index.html, style.css, script.js, README.md)
3. Cliquez sur **Commit changes**

### 3. Activer GitHub Pages
1. Allez dans **Settings**
2. Menu de gauche → **Pages**
3. Source : sélectionnez **main**
4. Cliquez sur **Save**
5. Votre site sera disponible à : `https://votre-username.github.io/blossom-ssbu/`

## 🎨 Personnalisation

### Modifier les couleurs
Dans `style.css`, lignes 2-9 :
```css
:root {
    --rose-principal: #ff69b4;
    --rose-clair: #ffb6d9;
    --rose-fonce: #db4d8f;
}
```

### Ajouter un membre
Dans `index.html`, copiez ce bloc :
```html
<div class="member-card">
    <h3>Pseudo du joueur</h3>
    <div class="member-sprites">
        <img src="images/sprites/pikachu.png" alt="Pikachu">
        <img src="images/sprites/mario.png" alt="Mario">
    </div>
    <p><strong>Personnages :</strong> Pikachu, Mario</p>
    <p><strong>Rôle :</strong> Joueur principal</p>
    <p>Description du membre...</p>
</div>
```

### Ajouter un graphique de weekly
Dans `index.html`, section graphiques :
```html
<div class="graphic-item">
    <img src="images/weeklies/weekly_1.png" alt="Résultats">
    <h3>Weekly #1</h3>
    <p>Date : 20/01/2026</p>
</div>
```

## 🐦 Twitter

✅ **Configuré automatiquement !** Les tweets de @blossom_ssbu s'affichent en temps réel grâce au widget Twitter officiel intégré.

## 🎮 Start.gg

Pour afficher automatiquement le nombre d'inscrits :
1. Créez un compte développeur sur https://developer.start.gg
2. Obtenez une clé API
3. Décommentez et configurez le code dans `script.js` (lignes 77-120)

## ⚙️ Fonctionnalités

- ✅ Affichage automatique des tweets
- ✅ Stream Twitch intégré
- ✅ Navigation multi-pages
- ✅ Formulaire de contact
- ✅ Design responsive (mobile-friendly)
- ✅ Mentions légales RGPD
- ⏳ API Start.gg (à configurer)

## 📝 Mentions légales

N'oubliez pas de remplir dans `index.html` :
- Nom de votre association
- Adresse complète
- Email de contact
- Numéro RNA
- Ville

## 🔧 Configuration post-déploiement

Une fois votre site en ligne sur GitHub Pages, modifiez dans `script.js` ligne 131 :
```javascript
// Remplacez par votre vraie URL GitHub Pages
twitchIframe.src = `https://player.twitch.tv/?channel=blossom_ssb&parent=VOTRE-USERNAME.github.io`;
```

## 📞 Support

Pour toute question :
- Twitter : [@blossom_ssbu](https://x.com/blossom_ssbu)
- Twitch : [blossom_ssb](https://twitch.tv/blossom_ssb)

## 📄 Licence

© 2026 Blossom SSBU - Tous droits réservés  
Super Smash Bros Ultimate © Nintendo Co., Ltd.
