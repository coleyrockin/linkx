import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App smoke test", () => {
  test("renders identity and outbound links", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /boyd roberts/i })).toBeInTheDocument();

    const github = screen.getByRole("link", { name: /github/i });
    const portfolio = screen.getByRole("link", { name: /portfolio/i });
    const linkedin = screen.getByRole("link", { name: /linkedin/i });

    expect(github).toHaveAttribute("href", "https://github.com/coleyrockin");
    expect(portfolio).toHaveAttribute("href", "https://coleyrockin.github.io/react-portfolio/");
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/boydcroberts/");

    [github, portfolio, linkedin].forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
