import { RoutesLoader } from "../src/index";
import { expect } from "chai";
import { getRoutesRecursively } from "../src/utils/getRoutesRecursively";

describe("#load routes", () => {
  it("load route", () => {
    const routes = getRoutesRecursively(
      RoutesLoader("./routes", { recursive: false, dirname: __dirname })
    );

    // They must be added in this order following the ranking mechanism
    ["[GET] /typescript/", "[GET] /typescript/*", "[GET] /"].forEach(
      (route, index) => {
        expect(routes[index]).to.equal(route);
      }
    );
  });

  it("load route absolute", () => {
    const path = require("path");
    const routes = getRoutesRecursively(
      RoutesLoader(path.join(__dirname, "routes"), { recursive: false })
    );

    // They must be added in this order following the ranking mechanism
    ["[GET] /typescript/", "[GET] /typescript/*", "[GET] /"].forEach(
      (route, index) => {
        expect(routes[index]).to.equal(route);
      }
    );
  });
});

describe("#load routes recursive", () => {
  it("load route recursive", () => {
    const routes = getRoutesRecursively(
      RoutesLoader("./routes", { recursive: true, dirname: __dirname })
    );

    // They must be added in this order following the ranking mechanism
    [
      "[GET] /recursive/",
      "[GET] /typescript/",
      "[GET] /typescript/*",
      "[GET] /",
    ].forEach((route, index) => {
      expect(routes[index]).to.equal(route);
    });
  });
});
