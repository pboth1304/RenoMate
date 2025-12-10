import 'dotenv/config';
import app from './app.js';
import { ensureDatabaseConnection } from './db.js';

export async function startServer(port: number = Number(process.env.PORT ?? 3000)) {
  await ensureDatabaseConnection();
  return app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
