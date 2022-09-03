import { Request, Response, Router } from "express";

export default function (router: Router) {
  router.get("/", (_req: Request, res: Response) => {
    res.send("typescript");
  });

  router.get("*", (_req: Request, res: Response) => {
    res.send("typescript/any");
  });
}
