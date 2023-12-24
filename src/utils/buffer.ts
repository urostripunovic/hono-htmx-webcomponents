import fs from "node:fs"
import { TemplateFunction } from 'squirrelly/dist/types/compile';

export const getContent =  (path: string): string | TemplateFunction => {
    const page = fs.readFileSync(path,'utf8');
    return page;
}
