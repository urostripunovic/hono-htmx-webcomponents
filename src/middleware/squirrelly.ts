import Sqrl from 'squirrelly';
import { MiddlewareHandler } from 'hono';
import { getFilePath } from '../utils/filepath';
import { bufferToString } from '../utils/buffer';

const EXTENSION = '.sqrl';
const DEFAULT_DOCUMENT = 'index.html'

interface Sqrl {
    render: (content: string, params: object) => string;
}

declare module 'hono' {
    interface Context {
        //@ts-ignore
        render: (
            content: string | Promise<string>, //If squirrelly doesn't use eval
            params?: object
        ) => Response | Promise<Response>;
    }
}

export type SquirrellyOptions = {
    root: string;
};

/**
 *
 * @param init provide the path of your index.html file
 * @returns
 */
export const squirrelly = (init: SquirrellyOptions = { root: '' }): MiddlewareHandler => {
    return async (c, next) => {
        const { root } = init;
        console.log(root);
        c.render = async (filename, params = {}): Promise<Response> => {
            /**
             * get file path of the template engine,
             * add som logic to maybe have them as the html extension but change them here in the middle ware to provide a better dx?
             */
            //send in the whole file path
            const path = getFilePath({
                filename: `${filename}${EXTENSION}`,
                root: root,
                defaultDocument: DEFAULT_DOCUMENT.split(".html")[0]+EXTENSION
            });
            console.log(params)
            const content = ''; //do an array buffer to get the content

            //const output = Sqrl.render(content, params);
            return c.html('output');
        };
        await next();
    };
}
