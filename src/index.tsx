import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import Database, { Database as db } from "better-sqlite3";
import { AddTodo, TodoItem, renderer } from "./components";
import { serveStatic } from '@hono/node-server/serve-static'
import { html } from "hono/html";
const db = new Database("todo.db");
db.pragma("journal_mode = WAL");

//const stm = db.prepare('SELECT * FROM todo');
//console.log(stm.all())

type Bindings = {
    DB: db;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", serveStatic({ root: './' }))
//middleware for att rendera html
app.use("*", renderer);
app.use("*", cors());
app.use("*", logger());

export type Todo = {
    todoId: string;
    title: string;
    todoStatus: number;
};

//Matta in html filer osv
app.get("/", (c) => {
    const completedTodos = db
        .prepare("SELECT * FROM todo WHERE todoStatus = 1")
        .all() as unknown[] as Todo[];
    const uncompletedTodos = db
        .prepare("SELECT * FROM todo WHERE todoStatus = 0")
        .all() as unknown[] as Todo[];
    return c.render(
        <>
            <h1 class="text-4xl font-bold">Hono🔥 + HTMX + Web Components</h1>
            <div>
                <span class="flex flex-row gap-4">
                    {completedTodos.map((todo) => (
                        <TodoItem todo={todo} />
                    ))}
                    {uncompletedTodos.map((todo) => (
                        <TodoItem todo={todo} />
                    ))}
                    <my-component _name="click me"></my-component>
                </span>
                <AddTodo />
                
            </div>
        </>
    );
});

const port = parseInt(process.env.PORT!) || 3000;
serve({
    fetch: app.fetch,
    port: port,
});
console.log(`Running at http://localhost:${port}`);
