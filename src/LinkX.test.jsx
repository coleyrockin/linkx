import { beforeAll, describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import LinkXPage from "./components/LinkXPage";

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
  });
});

describe("LinkX smoke test", () => {
  test("renders identity and outbound links with safe attributes", () => {
    render(<LinkXPage />);

    expect(screen.getByRole("heading", { name: /boyd roberts/i })).toBeInTheDocument();

    const expected = [
      { pattern: /instagram/i, href: "https://www.instagram.com/coleyrockin/", external: true },
      { pattern: /linkedin/i, href: "https://www.linkedin.com/in/boydcroberts/", external: true },
      { pattern: /portfolio/i, href: "https://coleyrockin.github.io/react-portfolio/", external: true },
      { pattern: /github/i, href: "https://github.com/coleyrockin", external: true },
      { pattern: /x.*thoughts/i, href: "https://x.com/coleyrockin", external: true },
      { pattern: /email.*direct contact/i, href: "mailto:coleyrockin@aol.com", external: false },
    ];

    const nav = screen.getByRole("navigation", { name: /external links/i });

    for (const { pattern, href, external } of expected) {
      const link = within(nav).getByRole("link", { name: pattern });
      expect(link).toHaveAttribute("href", href);
      if (external) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        expect(link).not.toHaveAttribute("target");
        expect(link).not.toHaveAttribute("rel");
      }
    }
  });

  test("renders single-page panel with Now and terminal affordance", async () => {
    render(<LinkXPage />);

    expect(screen.getByRole("article", { name: /profile and links/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkx.*personal hub/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open terminal/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /^now$/i })).toBeInTheDocument();
  });
});
