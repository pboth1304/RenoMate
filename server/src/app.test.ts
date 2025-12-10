import { createRequest, createResponse } from "node-mocks-http";
import { healthHandler } from "./app.js";

describe("GET /health", () => {
  it("responds with ok status payload", async () => {
    const req = createRequest({
      method: "GET",
      url: "/health",
    });
    const res = createResponse();

    healthHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader("content-type")).toMatch(/application\/json/);
    expect(res._isEndCalled()).toBe(true);
    expect(res._getJSONData()).toEqual({ status: "ok" });
  });
});
