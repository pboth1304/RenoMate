import express, { type RequestHandler } from 'express';

export const healthHandler: RequestHandler = (_req, res) => {
  res.json({ status: 'ok' });
};

const app = express();

app.get('/health', healthHandler);

export default app;
