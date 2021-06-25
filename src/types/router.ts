export type RouterUrlObj = {
  pathname: string;
  query?: Record<string, any>;
};

export type DynamicRouter = {
  rootId: string;
  subId: string;
};
