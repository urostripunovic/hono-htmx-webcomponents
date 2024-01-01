import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { serveStatic } from "@hono/node-server/serve-static";
import Database, { Database as db } from "better-sqlite3";
import { AddTodo, TodoItem, renderer } from "./components";
import { squirrelly } from "./middleware/squirrelly";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const db = new Database("todo.db");
db.pragma("journal_mode = WAL");

//const stm = db.prepare('SELECT * FROM todo');
//console.log(stm.all())

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
  todoId: string;
  title: string;
  todoStatus: number;
};

app.get("/jsxRender", (c) => {
  const completedTodos = db
    .prepare("SELECT * FROM todo WHERE todoStatus = 1")
    .all() as unknown[] as Todo[];
  const uncompletedTodos = db
    .prepare("SELECT * FROM todo WHERE todoStatus = 0")
    .all() as unknown[] as Todo[];
  return c.render(
    <>
      <h1 class="flex justify-between text-4xl font-bold">
        Hono🔥 + HTMX + Web Components
      </h1>
      <div>
        {/*Change to grid instead*/}

        <client-islands src="TodoForm" client:mouseover>
          <todo-form>
            <AddTodo />
          </todo-form>
        </client-islands>

        <span class="flex flex-wrap gap-2 md:grid md:grid-cols-3">
          <div class="w-full">
            <h1 class="text-xl font-thin"> Todos </h1>
            {uncompletedTodos.map((todo) => (
              <TodoItem todo={todo} type={"uncompleted"} />
            ))}
            <div id="uncompleted"></div>
          </div>
          <div class="w-full">
            <h1 class="text-xl font-thin"> Completed Todos </h1>
            {completedTodos.map((todo) => (
              <TodoItem todo={todo} type={"completed"} />
            ))}
            <div id="completed"></div>
          </div>
          <client-islands src="DeletedTodos" client:idle>
            <deleted-todos>
              <p id="cool-ptag" class="font-bold">
                Hej hej
              </p>
            </deleted-todos>
          </client-islands>
        </span>
      </div>
    </>,
  );
});

app.post(
  "/jsxRender",
  zValidator(
    "form",
    z.object({
      title: z.string().min(1),
    }),
  ),
  (c) => {
    const { title } = c.req.valid("form");
    console.log("HTMX post request works", title);
    //get the value from the form and insert it at the top
    return c.html(
      <TodoItem
        todo={{ todoId: "6", todoStatus: 0, title: "test2" }}
        type={"uncompleted"}
      />,
    );
  },
);

app.post("/jsxRender2", (c) => {
  console.log("HTMX post request works");
  //get the value from the form and insert it at the top
  return c.html(
    <TodoItem
      todo={{ todoId: "6", todoStatus: 0, title: "test2" }}
      type={"uncompleted"}
    />,
  );
});

app.put("/jsxRender/check/:id", (c) => {
  console.log("HTMX post check works");
  return c.body(null, 204);
});

app.put("/jsxRender/edit/:id", (c) => {
  console.log("HTMX post edit works");
  return c.body(null, 204);
});

app.delete("/jsxRender/todo/:id", (c) => {
  const id = c.req.param("id");
  console.log("HTMX delete edit works", id);
  return c.body(null, 204);
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
