import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";

import InvestorsTable from "./InvestorsTable";
import { handlers } from "../mocks/handlers";

const server = setupServer(...handlers);

describe("InvestorsTable", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("fetches and displays data", async () => {
    render(
      <Router>
        <InvestorsTable />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("2670")).toBeInTheDocument();
    });
  });

  test("handles server error", async () => {
    server.use(
      rest.get("/api/investors", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <Router>
        <InvestorsTable />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
