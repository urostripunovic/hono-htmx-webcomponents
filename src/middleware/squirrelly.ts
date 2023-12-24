import { render } from 'squirrelly';
import { MiddlewareHandler } from 'hono';
import { getFilePath } from '../utils/filepath';
import { getContent } from '../utils/buffer';
import { resolve } from 'path';

const EXTENSION = '.html';
const DEFAULT_DOCUMENT = 'index.html';

interface Sqrl {
    render: (content: string, params: object) => string;
}

declare module 'hono' {
    interface Context {
        //@ts-ignore
        render: (
            content: string,
            params?: object
        ) => Response | Promise<Response>;
    }
}

export type SquirrellyOptions = {
    root: string;
};

/**
 * Middleware for SquirrellyJS template engine. 
 * @param init Provide a root path for your html templates to be rendered makes sure your partials are in the same root
 * @returns 
 */
export const squirrelly = (init: SquirrellyOptions = { root: '' }): MiddlewareHandler => {
    return async (c, next) => {
        const { root } = init;
        c.render = async (filename, params = {}): Promise<Response> => {
            const path = getFilePath({
                filename: `${filename}${EXTENSION}`,
                root: root,
                defaultDocument: DEFAULT_DOCUMENT,
            });

            //use the path to get the file and convert it to an array buffer
            const content = getContent(path);
            const output = render(content, params, {
                views: [resolve(root).replace(/\\/g, '/')], //proper file path for includeFile to work
            });
            return c.html(output);
        };
        await next();
    };
};
