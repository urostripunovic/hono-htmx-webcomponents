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
            <script type="module" src="/dist/bundle.js"></script>
          </>
        ) : (
          <>
            <script type="module" src="src/static/client.ts"></script>
          </>
        )}
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
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
    <div class="flex flex-row gap-2">
      <input
        type="text"
        placeholder="What is there todo..."
        class="block w-full rounded-lg bg-gray-200 p-2.5 text-xl"
      />
      <button class="block rounded-lg bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700">
        Add
      </button>
    </div>
  </form>
);

//Iterate thorugh the todo item
export const TodoItem = (props: { todo: Todo, type: string }) => {
  const { todoId, title, todoStatus } = props.todo;
  const isChecked = todoStatus === 1 ? true : false;
  //Edit knapp, remove knapp och complete knapp
  return (
    <div
      id={props.type+todoId}
      class="border-b-1 group relative mb-2 flex h-10 items-center justify-between gap-2 flex-wrap rounded border-b-gray-200 p-2 transition duration-150 ease-out odd:bg-gray-200 hover:ease-in hover:odd:bg-gray-50 hover:even:bg-gray-100"
    >
      <div class="flex flex-row items-center gap-2">
        <input
          id={"default-checkbox"+todoId}
          checked={isChecked}
          type="checkbox"
          value=""
          class="h-6 w-6 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
        <label
          for={"default-checkbox"+todoId}
          class={`cursor text-xl font-semibold ${
            isChecked ? "line-through" : ""
          } line-clamp-3`}
        >
          {title}
        </label>
      </div>
      {/*add a delete input as well as a edit input*/}
      <div class="invisible flex flex-row gap-1 group-hover:visible">
        <button
          class={`${
            isChecked ? "hidden" : ""
          } flex h-8 w-8 cursor-pointer items-center justify-center`}
        >
          <i class="fas fa-edit text-cyan-600 transition-all hover:text-lg hover:text-cyan-700"></i>
        </button>
        <button class="flex w-3 cursor-pointer items-center justify-center">
          <i class="fa fa-trash text-red-500 transition-all hover:text-lg hover:text-red-700"></i>
        </button>
      </div>
    </div>
  );
};
