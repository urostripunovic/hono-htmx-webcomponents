//Components that are for lazy loading
const manifest: Record<string, () => Promise<any>> = {
  'deleted-todos': () => import("./DeletedTodos"),
  'todo-form': () => import("./TodoForm"),
  'swap-todos': () => import("./SwapTodos"),
};
export default manifest;
