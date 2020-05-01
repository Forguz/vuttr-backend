import { Router } from 'express';

const toolsRouter = Router();

toolsRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default toolsRouter;
