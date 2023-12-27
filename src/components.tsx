import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
//import { Todo } from ".";

export type Todo = {
  todoId: string;
  title: string;
  todoStatus: number;
};

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
            {" "}
            <script type="module" src="/dist/bundle.js"></script>{" "}
          </>
        ) : (
          <>
            {" "}
            <script type="module" src="src/static/client.ts"></script>{" "}
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

export const Todos = (props: { todos: Todo[] }) => {
  const { todos } = props;

  return (
    <div>
      {todos.map(({ todoId, todoStatus, title }: Todo) => {
        return (
          <div id={todoId} class="flex items-center gap-4">
            <input
              id="default-checkbox"
              checked
              type="checkbox"
              value=""
              class="h-6 w-6 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
            <label for="default-checkbox" class="text-xl font-semibold">
              {title}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export const NotCompletedTodos = (props: { todos: Todo[] }) => {
  const { todos } = props;
  return (
    <div>
      {todos.map(({ todoId, todoStatus, title }: Todo) => {
        return (
          <div id={todoId} class="flex items-center gap-4">
            <input
              id="default-checkbox"
              checked
              type="checkbox"
              value=""
              class="h-6 w-6 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
            <label
              for="default-checkbox"
              class="text-xl font-semibold line-through"
            >
              {title}
            </label>
          </div>
        );
      })}
    </div>
  );
};

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
  const isChecked = todoStatus === 1 ? true : false;
  //Edit knapp, remove knapp och complete knapp
  return (
    <div
      id={todoId}
      class="border-b-1 mb-1 flex h-10 items-center gap-2 rounded border-b-gray-200 p-2 odd:bg-gray-200 hover:odd:bg-gray-50 hover:even:bg-gray-100"
    >
      <input
        id="default-checkbox"
        checked={isChecked}
        type="checkbox"
        value=""
        class="cursor-pointer h-6 w-6 rounded-md border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label
        for="default-checkbox"
        class={`cursor text-xl font-semibold ${
          isChecked ? "line-through" : ""
        } line-clamp-3`}
      >
        {title}
      </label>
      {/*add a delete input as well as a edit input*/}
    </div>
  );
};
