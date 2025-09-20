// Vercel serverless function entry point
export default async function handler(req, res) {
  try {
    const { default: app } = await import('../server/index.js');
    return app(req, res);
  } catch (error) {
    console.error('Error loading app:', error);
    res.status(500).json({ error: 'Server initialization failed' });
  }
}