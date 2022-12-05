import { render, screen } from "@testing-library/react";
import App from "./App.js";
import jestConfig from "./jest.config";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
