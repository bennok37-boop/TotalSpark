// Vercel serverless function entry point
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import your Express app
import('../server/index.js').then((module) => {
  const app = module.default || module;
  
  // Export for Vercel
  export default app;
}).catch(console.error);

// Fallback export
export default async function handler(req, res) {
  try {
    const { default: app } = await import('../server/index.js');
    return app(req, res);
  } catch (error) {
    console.error('Error loading app:', error);
    res.status(500).json({ error: 'Server initialization failed' });
  }
}