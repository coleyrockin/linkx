import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App smoke test", () => {
  test("renders identity and outbound links", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /three doors into my world/i })).toBeInTheDocument();

    const instagram = screen.getByRole("link", { name: /instagram/i });
    const portfolio = screen.getByRole("link", { name: /portfolio/i });
    const linkedin = screen.getByRole("link", { name: /linkedin/i });

    expect(instagram).toHaveAttribute("href", "https://www.instagram.com/coleyrockin/");
    expect(portfolio).toHaveAttribute("href", "https://coleyrockin.github.io/react-portfolio/");
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/boydcroberts/");

    [instagram, portfolio, linkedin].forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
