//Components that are for lazy loading
const manifest: Record<string, () => any> = {
  LazyLoad: () => import("./LearningComponents/lazyload-component"),
};
export default manifest;
