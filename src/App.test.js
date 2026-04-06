import { render, screen } from "@testing-library/react";
import LinkXPage from "./components/LinkXPage";

describe("LinkX smoke test", () => {
  test("renders identity and outbound links", () => {
    render(<LinkXPage />);

    expect(
      screen.getByRole("heading", { name: /doors into my world/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a tiny control panel for my corner of the internet\./i)
    ).toBeInTheDocument();

    const instagram = screen.getByRole("link", { name: /instagram/i });
    const portfolio = screen.getByRole("link", { name: /portfolio/i });
    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    const github = screen.getByRole("link", { name: /github/i });
    const x = screen.getByRole("link", { name: /x\s+thoughts/i });

    expect(instagram).toHaveAttribute("href", "https://www.instagram.com/coleyrockin/");
    expect(portfolio).toHaveAttribute("href", "https://coleyrockin.github.io/react-portfolio/");
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/boydcroberts/");
    expect(github).toHaveAttribute("href", "https://github.com/coleyrockin");
    expect(x).toHaveAttribute("href", "https://x.com/coleyrockin");

    [instagram, portfolio, linkedin, github, x].forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
