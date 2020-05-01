import { getRepository } from 'typeorm';

import Tool from '../models/Tool';

interface Request {
  tag: string;
}

class FindToolsByTagService {
  public async execute({ tag }: Request): Promise<Tool[]> {
    const toolsRepository = getRepository(Tool);

    const parsedTools: Tool[] = [];

    const tools = await toolsRepository.find();

    // Change for something more beautiful when typeorm implement array find
    tools.map(tool => {
      tool.tags.map(tagged => {
        if (tagged === tag) {
          parsedTools.push(tool);
        }
        return 0;
      });
      return 0;
    });

    return parsedTools;
  }
}

export default FindToolsByTagService;
