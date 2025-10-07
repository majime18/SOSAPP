import path from 'path';
import express from 'express';

/**
 * Sets up static file serving for the Express app
 * @param app Express application instance
 */
export function setupStaticServing(app: express.Application) {
  // Sirve archivos estáticos desde dist/public en producción
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // Para cualquier otra ruta, sirve index.html
  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
  });
}
