import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Tool from '../models/Tool';

interface Request {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolService {
  public async execute({
    title,
    link,
    description,
    tags,
  }: Request): Promise<Tool> {
    const toolsRepository = getRepository(Tool);

    const checkToolExists = await toolsRepository.findOne({
      where: { title },
    });

    if (checkToolExists) {
      throw new AppError('Tool already exists.');
    }

    const tool = toolsRepository.create({
      title,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;
