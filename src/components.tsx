import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
//import { Todo } from ".";

export type Todo = {
  id: string;
  title: string;
  status: number;
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <title>Hono🔥 + HTMX + Web Components</title>
      </head>
      <body
        class="absolute m-auto flex w-full flex-col items-center justify-center gap-4 p-4"
      >
        ${children}
      </body>
    </html>
  `;
});

//Add a todo to the database
export const AddTodo = () => (
  <form hx-post="/jsxRender" hx-target="#uncompleted" hx-swap="outerHTML">
    <div class="mb-2 flex flex-row justify-center gap-2">
      <input
        required
        name="title"
        type="text"
        placeholder="What is there todo..."
        class="block w-full max-w-lg rounded-lg bg-gray-200 p-2.5 text-xl"
      />
      <button
        type="submit"
        class="block rounded-lg bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  </form>
);

export const EditTodo = (props: { todo: Todo }) => {
  const { id, title } = props.todo;
  return (
    <form hx-put={`/jsxRender/edit/${id}`} hx-target="this" hx-swap="outerHTML">
      <div class="mb-2 flex w-full flex-wrap content-center items-center justify-between border-b-2 border-teal-500 p-2 text-center md:max-w-72">
        <span class="flex flex-row">
          <input
            class="max-w-52 appearance-none border-none bg-transparent align-top text-xl font-semibold leading-tight text-gray-700 focus:outline-none"
            type="text"
            name="title"
            value={title}
          />
        </span>
        <span class="flex flex-row">
          <button class="cursor-pointer">✔️</button>
          <button class="cursor-pointer" hx-get={`/jsxRender/${id}`}>
            ❌
          </button>
        </span>
      </div>
    </form>
  );
};

//Iterate thorugh the todo item
export const TodoItem = (props: { todo: Todo }) => {
  const { id, title, status } = props.todo;
  const isChecked = status === 1 ? true : false;
  //Edit knapp, remove knapp och complete knapp
  return (
    <div
      name="parent"
      id={"parent" + id}
      class="border-b-1 group relative mb-2 flex w-full flex-wrap content-center items-center justify-between gap-2 rounded border-b-gray-200 p-2 text-center transition duration-150 ease-out odd:bg-gray-200 hover:ease-in hover:odd:bg-gray-50 hover:even:bg-gray-100 md:max-w-72"
    >
      <div class="flex flex-row gap-2">
        <input
          id={id}
          hx-put={`/jsxRender/check/${id}?title=${title}&status=${isChecked}`}
          checked={isChecked}
          hx-target={isChecked ? "#uncompleted" : "#completed"}
          hx-swap="outerHTML"
          type="checkbox"
          class="w-6 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
        <label
          for={id}
          class={`cursor truncate text-xl font-semibold ${
            isChecked ? "line-through" : ""
          } line-clamp-1 hover:line-clamp-none`}
        >
          {title}
        </label>
      </div>
      <div class="invisible flex flex-row gap-1 group-hover:visible">
        <button
          class={`${
            isChecked ? "hidden" : ""
          } flex w-8 cursor-pointer items-center justify-center`}
          //hx-put={`/jsxRender/edit/${id}`}
          hx-get={`/jsxRender/edit/${id}`}
          hx-target={"#parent" + id}
          hx-swap="outerHTML"
        >
          <i
            data-te-ripple-init
            title="Edit Todo"
            class="fas fa-edit text-cyan-600 transition-all hover:text-lg hover:text-cyan-700"
          ></i>
        </button>
        <button
          class="flex w-3 cursor-pointer items-center justify-center"
          hx-delete={`/jsxRender/todo/${id}`}
          hx-target={"#parent" + id}
          hx-swap="outerHTML"
        >
          <i
            data-te-ripple-init
            title="Delete Todo"
            class="fa fa-trash text-red-500 transition-all hover:text-lg hover:text-red-700"
          ></i>
        </button>
      </div>
    </div>
  );
};
