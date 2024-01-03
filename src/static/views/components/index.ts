//Components that are for lazy loading
const manifest: Record<string, () => Promise<any>> = {
  DeletedTodos: () => import("./DeletedTodos"),
  'todo-form': () => import("./TodoForm"),
  'swap-todos': () => import("./SwapTodos"),
};
export default manifest;
