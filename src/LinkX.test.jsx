import { beforeAll, describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    expect(
      screen.getByRole("heading", { name: /boyd roberts/i })
    ).toBeInTheDocument();

    const expected = [
      { pattern: /instagram/i, href: "https://www.instagram.com/coleyrockin/" },
      { pattern: /linkedin/i, href: "https://www.linkedin.com/in/boydcroberts/" },
      { pattern: /portfolio/i, href: "https://coleyrockin.github.io/react-portfolio/" },
      { pattern: /github/i, href: "https://github.com/coleyrockin" },
      { pattern: /x\s+thoughts/i, href: "https://x.com/coleyrockin" },
    ];

    for (const { pattern, href } of expected) {
      const link = screen.getByRole("link", { name: pattern });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("supports grouped linked-tree search and tag filtering", async () => {
    const user = userEvent.setup();
    render(<LinkXPage />);

    const treeNav = screen.getByRole("navigation", { name: /external links/i });
    expect(within(treeNav).getByText("Work")).toBeInTheDocument();
    expect(within(treeNav).getByText("Build")).toBeInTheDocument();
    expect(within(treeNav).getByText("Social")).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: /search links/i });
    await user.type(searchInput, "tag:build");

    expect(screen.getByRole("link", { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /instagram/i })).not.toBeInTheDocument();
  });
});
