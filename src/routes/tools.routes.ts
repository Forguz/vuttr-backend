import { Router } from 'express';

import CreateToolService from '../services/CreateToolService';

const toolsRouter = Router();

toolsRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

toolsRouter.post('/', async (request, response) => {
  const { title, link, description, tags } = request.body;

  const createTool = new CreateToolService();

  const tool = await createTool.execute({
    title,
    link,
    description,
    tags,
  });

  return response.status(201).json(tool);
});

export default toolsRouter;
