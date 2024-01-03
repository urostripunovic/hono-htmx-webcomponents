import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { serveStatic } from "@hono/node-server/serve-static";
import Database, { Database as db } from "better-sqlite3";
import {
  AddTodo,
  DeletedTodo,
  EditTodo,
  TodoItem,
  renderer,
} from "./components";
import { squirrelly } from "./middleware/squirrelly";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const db = new Database("todo.db");
db.pragma("journal_mode = WAL");

//const stm = db.prepare('SELECT * FROM todo');
//console.log(stm.all())
//db.prepare('INSERT INTO todo (id, title, status) VALUES (?, ?, ?)').run(crypto.randomUUID(), "test clear done", 1);

type Bindings = {
  DB: db;
};

const app = new Hono<{ Bindings: Bindings }>();
//app.use('*', serveStatic({ root: './' })) //undvik att använda * för att servera filer för de har tillgång till databasen på detta sätt
app.use("/dist/*", serveStatic({ root: "./" }));
app.use("*", cors(), logger(), secureHeaders());
//JSX template engine render middleware
app.use("/jsxRender/*", renderer);

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: {},
    ): Response | Promise<Response>;
  }
}

export type Todo = {
  id: string;
  title: string;
  status: number;
};

app.get("/jsxRender", (c) => {
  const completedTodos = db
    .prepare("SELECT * FROM todo WHERE status = 1")
    .all() as unknown[] as Todo[];
  const uncompletedTodos = db
    .prepare("SELECT * FROM todo WHERE status = 0")
    .all() as unknown[] as Todo[];
  return c.render(
    <>
      <h1 class="flex justify-between text-4xl font-bold">
        Hono🔥 + HTMX + Web Components
      </h1>
      <div>
        <client-islands src="todo-form" client:mouseover>
          <todo-form>
            <AddTodo />
          </todo-form>
        </client-islands>

        <client-islands src="swap-todos" client:mouseover>
          <swap-todos>
            <span class="flex flex-wrap gap-2 md:grid md:grid-cols-3">
              <div id="NotCompletedParent" class="w-full">
                <h1 class="text-xl font-thin"> Todos </h1>
                {uncompletedTodos.map((todo) => (
                  <TodoItem todo={todo} />
                ))}
                <div id="uncompleted"></div>
              </div>

              <div id="CompletedParent" class="w-full">
                <h1 class="text-xl font-thin"> Completed Todos </h1>
                {completedTodos.map((todo) => (
                  <TodoItem todo={todo} />
                ))}
                <div id="completed"></div>
              </div>
              <div id="DeletedParent" class="w-full">
                <client-islands src="deleted-todos" client:load>
                  <deleted-todos>
                    <h1 class="text-xl font-thin"> Deleted Todos </h1>
                    <div id="deletedtodo"></div>
                  </deleted-todos>
                </client-islands>
              </div>
            </span>
          </swap-todos>
        </client-islands>
      </div>
    </>,
  );
});

app.put("/jsxRender/check/:id", (c) => {
  const { id } = c.req.param();
  const { title, status } = c.req.query();
  const newStatus = status === "true" ? 0 : 1; //ska bli noll
  const outerHTML = Boolean(newStatus) ? "completed" : "uncompleted";
  db.prepare("UPDATE todo SET status = ? WHERE id = ?").run(newStatus, id);
  console.log(status, newStatus, outerHTML);
  //return c.body(null, 200);
  return c.html(
    <>
      <TodoItem todo={{ id: id, title: title, status: newStatus }} />
      <div id={outerHTML}></div>
    </>,
  );
});

export const schema = z.object({
  title: z.string().min(3),
});

app.put("/jsxRender/edit/:id", zValidator("form", schema), (c) => {
  const id = c.req.param("id");
  const { title } = c.req.valid("form");
  db.prepare("UPDATE todo SET title = ? WHERE id = ?").run(title, id);
  return c.html(<TodoItem todo={{ id: id, title: title, status: 0 }} />);
});

app.get("/jsxRender/edit/:id", (c) => {
  const id = c.req.param("id");
  const { title, status } = db
    .prepare("SELECT title, status FROM todo WHERE id = ?")
    .get(id) as unknown as any;
  return c.html(<EditTodo todo={{ id: id, title: title, status: status }} />);
});

app.get("/jsxRender/:id", (c) => {
  const param_id = c.req.param("id");
  const { id, title, status } = db
    .prepare("SELECT * FROM todo WHERE id = ?")
    .get(param_id) as unknown as any;
  return c.html(<TodoItem todo={{ id: id, title: title, status: status }} />);
});

app.post("/jsxRender", zValidator("form", schema), (c) => {
  const { title } = c.req.valid("form");
  const id = crypto.randomUUID();
  //get the value from the form and insert it at the top
  db.prepare("INSERT INTO todo (id, title, status) VALUES (?, ?, ?)").run(
    id,
    title,
    0,
  );
  return c.html(
    <>
      <TodoItem todo={{ id: id, title: title, status: 0 }} />
      <div id="uncompleted"></div>
    </>,
  );
});

app.delete("/jsxRender/todo/:id", (c) => {
  const id = c.req.param("id");
  const { title, status } = c.req.query();
  //db.prepare("DELETE FROM todo WHERE id = ?").run(id);
  //return c.body(null, 200);
  const newStatus = status === "true" ? 1 : 0;
  console.log(newStatus);
  return c.html(
    <>
      <DeletedTodo todo={{ id: id, title: title, status: newStatus }} />
      <div id="deletedtodo"></div>
    </>,
  );
});

//Template engine middleware
app.use(
  "/template/*",
  squirrelly({
    root: "src/static/views/",
  }),
);

app.get("/template", (c) => {
  return c.render("index");
});

export default app;
