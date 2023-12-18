import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import Database, { Database as dbType } from 'better-sqlite3';
const db = new Database('todo.db');
db.pragma('journal_mode = WAL');

const insert = db.prepare('SELECT * FROM todo');
console.log(insert.all())

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

const port = parseInt(process.env.PORT!) || 3000;
serve({
    fetch: app.fetch,
    port: port,
});
console.log(`Running at http://localhost:${port}`);
