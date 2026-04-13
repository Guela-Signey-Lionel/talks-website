#!/usr/bin/env node

/**
 * Script pour optimiser les images JPG/PNG en réduisant leur qualité
 * mais en gardant une bonne qualité visuelle
 * 
 * Usage: node optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGE_DIRS = [
  './src/images',
];

const QUALITY_SETTINGS = {
  jpeg: { quality: 70, progressive: true },
  png: { quality: 70, compressionLevel: 9 },
  webp: { quality: 75 },
};

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return null;
  }

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    
    let transformer = sharp(filePath);
    const metadata = await transformer.metadata();
    
    // Redimensionner si l'image est trop grande
    if (metadata.width > 2000) {
      transformer = transformer.resize(2000, 2000, { fit: 'inside', withoutEnlargement: true });
    }

    // Appliquer la qualité appropriée
    if (ext === '.jpg' || ext === '.jpeg') {
      await transformer.jpeg(QUALITY_SETTINGS.jpeg).toFile(filePath + '.optimized');
    } else if (ext === '.png') {
      await transformer.png(QUALITY_SETTINGS.png).toFile(filePath + '.optimized');
    } else {
      return null;
    }

    const optimizedStats = fs.statSync(filePath + '.optimized');
    const optimizedSize = optimizedStats.size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    fs.renameSync(filePath + '.optimized', filePath);

    return {
      file: path.relative(process.cwd(), filePath),
      originalSize: (originalSize / 1024 / 1024).toFixed(2),
      optimizedSize: (optimizedSize / 1024 / 1024).toFixed(2),
      savings,
    };
  } catch (error) {
    console.error(`Erreur avec ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Optimisation des images...\n');

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir, { recursive: true });

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const result = await optimizeImage(filePath);
        if (result) {
          console.log(`✅ ${result.file}`);
          console.log(`   ${result.originalSize}MB → ${result.optimizedSize}MB (économie: ${result.savings}%)\n`);
          totalOriginal += parseFloat(result.originalSize);
          totalOptimized += parseFloat(result.optimizedSize);
        }
      }
    }
  }

  if (totalOriginal > 0) {
    const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    console.log('📊 Résumé:');
    console.log(`   Total avant: ${totalOriginal.toFixed(2)}MB`);
    console.log(`   Total après: ${totalOptimized.toFixed(2)}MB`);
    console.log(`   Économie totale: ${totalSavings}%\n`);
  }
}

main().catch(console.error);
