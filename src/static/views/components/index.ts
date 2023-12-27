//Components that are for lazy loading
const manifest: Record<string, () => Promise<any>> = {
  LazyLoad: () => import("./LearningComponents/lazyload"),
};
export default manifest;
