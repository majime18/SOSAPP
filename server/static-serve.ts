import path from 'path';
import express from 'express';
import fs from 'fs';

/**
 * Sets up static file serving for the Express app
 * @param app Express application instance
 */
export function setupStaticServing(app: express.Application) {
  const publicPath = path.join(__dirname, '..', 'dist', 'public'); // Sube un nivel desde server/
  if (!fs.existsSync(publicPath)) {
    console.error(`Directorio ${publicPath} no encontrado. Asegúrate de ejecutar 'npm run build' primero.`);
    return;
  }
  app.use(express.static(publicPath));

  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}
