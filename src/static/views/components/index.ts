//Components that are for lazy loading
const manifest: Record<string, () => Promise<any>> = {
  DeletedTodos: () => import("./DeletedTodos"),
  TodoForm: () => import("./TodoForm"),
};
export default manifest;
