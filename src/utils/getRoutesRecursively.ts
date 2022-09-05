import { IRoute, IRouter } from "express";

type TStack = ILayer[];

export interface ICustomRouter extends IRouter {
  stack: TStack;
  __dir_path__: string; // custom property
}

interface ILayer {
  handle: ICustomRouter;
  name: string;
  regexp: RegExp;
  route: IRoute;
  method: string;
}

export function getRoutesRecursively(router: ICustomRouter): string[] {
  const path = require("path");

  const currentRoutes = router.stack.filter((layer: ILayer) => layer.route);

  const nestedRouters = router.stack.filter(
    (stack: ILayer) => stack.name === "router"
  );

  let routes: string[] = [];

  // Routes in current router
  currentRoutes.forEach((layer: ILayer) => {
    const method = layer.route.stack && layer.route.stack[0].method;
    const routePath = layer.route.path;
    routes.push(
      `[${method.toUpperCase()}] ${path.join(router.__dir_path__, routePath)}`
    );
  });

  // Unpack nested routers recursively
  nestedRouters.forEach((layer: ILayer) => {
    routes = routes.concat(getRoutesRecursively(layer.handle));
  });

  return routes;
}
