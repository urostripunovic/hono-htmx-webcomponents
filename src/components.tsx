import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
import { Todo } from ".";

export const renderer = jsxRenderer(({ children }) => {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          charset="UTF-8"
        />
        ${import.meta.env.PROD ? (
          <>
            <script type='module' src='/dist/bundle.js'></script>
          </>
        ) : (
          <>
            <script type='module' src='src/static/index.ts'></script>
          </>
        )}
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Hono🔥 + HTMX + Web Components</title>
        </head>
        <body
        class="flex h-screen w-full flex-col items-center justify-center gap-4 p-4"
        >
        ${children}
      </body>
    </html>
  `;
});

//Add a todo to the database
export const AddTodo = () => (
  <form>
    <button class="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
      Add Todo
    </button>
  </form>
);

//Iterate thorugh the todo item
export const TodoItem = (props: { todo: Todo }) => {
  const { todoId, title, todoStatus } = props.todo;
  //Edit knapp, remove knapp och complete knapp
  return (
    <div id={todoId}>
      {title} {todoStatus}
    </div>
  );
};
