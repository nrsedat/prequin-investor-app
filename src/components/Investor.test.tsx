import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Investor from "./Investor";

const server = setupServer(
  rest.get("/api/investor/commitment/pe/123", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 34728,
          asset_class: "pe",
          firm_id: 2670,
          currency: "HKD",
          amount: "6M",
        },
      ])
    );
  })
);

describe("Investor component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("fetches and displays PE commitments on selection", async () => {
    render(
      <MemoryRouter initialEntries={["/investors/123"]}>
        <Routes>
          <Route path="/investors/:id" Component={Investor} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText(/Private Equity/));

    await waitFor(() => {
      expect(screen.getByText("6M HKD")).toBeInTheDocument();
    });
  });

  test("handles server error", async () => {
    server.use(
      rest.get("/api/Investor/commitment/PE/123", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter initialEntries={["/investors/123"]}>
        <Routes>
          <Route path="/investors/:id" Component={Investor} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText(/Private Equity/));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
