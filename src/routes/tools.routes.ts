import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

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

  try {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      link: Yup.string().required('Link is required'),
      description: Yup.string().required('Description is required'),
      tags: Yup.array().required('Tags is required'),
    });

    await schema.validate(request.body, {
      abortEarly: false,
    });
  } catch (err) {
    return response.status(400).json(err.errors);
  }

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

  const repository = toolsRepository.findOne({
    where: { id },
  });

  if (!repository) {
    return response.status(400).json({ message: 'Repository does not exists' });
  }

  toolsRepository.delete({ id });

  return response.status(204).send();
});

export default toolsRouter;
