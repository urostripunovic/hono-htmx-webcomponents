import fs from "node:fs/promises"
import { TemplateFunction } from 'squirrelly/dist/types/compile';

export const getContent =  async (path: string): Promise<string | TemplateFunction> => {
    const page = await fs.readFile(path,'utf8');
    return page;
}
