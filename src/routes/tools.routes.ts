import { Router } from 'express';
import { getRepository } from 'typeorm';

import Tool from '../models/Tool';
import CreateToolService from '../services/CreateToolService';
import FindToolsByTagService from '../services/FindToolsByTagService';

const toolsRouter = Router();

toolsRouter.get('/', async (request, response) => {
  if (request.query.tag) {
    const findTools = new FindToolsByTagService();

    const tools = await findTools.execute({
      tag: request.query.tag.toString(),
    });

    return response.json(tools);
  }

  const toolsRepository = getRepository(Tool);
  const tools = await toolsRepository.find();

  return response.json(tools);
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

toolsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const toolsRepository = getRepository(Tool);
  toolsRepository.delete({ id });

  return response.status(204).send();
});

export default toolsRouter;
