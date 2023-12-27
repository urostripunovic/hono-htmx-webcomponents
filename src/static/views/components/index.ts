//Components that are for lazy loading
const manifest: Record<string, () => Promise<any>> = {
  LazyLoad: () => import("./LearningComponents/lazyload"),
  MyComponent: () => import("./LearningComponents/MyComponent"),
  DeletedTodos: () => import("./DeletedTodos"),
};
export default manifest;
