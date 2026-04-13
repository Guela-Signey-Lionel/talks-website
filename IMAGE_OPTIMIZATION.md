# 🖼️ Guide d'optimisation des images

## Problème
Vos images sont très volumineuses (1.6MB chacune). Vous pouvez économiser **60-80%** de leur taille sans perte visible.

## Solutions (choisir une)

### Option A: Utiliser ImageOptim (Gratuit, en ligne)
1. Allez sur https://imageoptim.com/online
2. Téléchargez toutes vos images JPG
3. Compressez-les
4. Téléchargez les versions compressées
5. Remplacez les fichiers dans `src/images/`

**Résultat attendu:** 1.6MB → 0.3-0.5MB par image

---

### Option B: Utiliser TinyPNG/TinyJPG (Gratuit, en ligne)
1. Allez sur https://tinypng.com
2. Uploadez vos images
3. Téléchargez les versions compressées
4. Remplacez les fichiers

**Résultat:** Perte de qualité imperceptible, économie ~70%

---

### Option C: Convertir en WebP (Meilleur ratio qualité/compression)
1. Utilisez https://convertio.co/fr/jpg-webp/
2. Convertissez chaque JPG en WebP
3. Remplacez les fichiers dans `src/images/`
4. Les navigateurs modernes supportent 99% WebP

**Résultat:** Meilleure compression, même qualité

---

### Option D: Redimensionner avant compression
Si vos images font plus de 2000px de large:
1. Allez sur https://imageresizer.com
2. Redimensionnez à 1920px de large (maximum)
3. Compressez ensuite avec TinyPNG

---

## 📊 Estimation de l'économie

Si chaque image passe de 1.6MB à 0.4MB:
- **Avant:** ~402.7 MB total
- **Après:** ~150 MB (en incluant node_modules si conservé)
- **Réduction:** 63% du poids total

---

## 🚀 Après optimisation

Commitez et pushez:
```bash
git add src/images/
git commit -m "Optimize images: reduce file size by 60-80%"
git push
```

Rebuild:
```bash
npm run build
```

## ⚡ Bonus: Les images optimisées aideront aussi le référencement SEO!
