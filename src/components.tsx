import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
import { Todo } from ".";

export const renderer = jsxRenderer(({ children }) => {
    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                    charset="UTF-8"
                />
                <script src="https://unpkg.com/htmx.org@1.9.3"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
                <script src="https://cdn.tailwindcss.com"></script>
                <title>Hono🔥 + HTMX + Web Components</title>
            </head>
            <body
                class="flex flex-col justify-center items-center w-full h-screen p-4 gap-4"
            >   
                ${children}   
                <script src="dist/bundle.js"></script>
            </body>
        </html>
    `;
});

//Add a todo to the database
export const AddTodo = () => (
    <form>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
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
