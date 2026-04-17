import NOW from "../data/now.json";
import useGitHubActivity from "../hooks/useGitHubActivity";

const GH_USERNAME = "coleyrockin";

export default function NowSection() {
  const { items, status } = useGitHubActivity(GH_USERNAME);

  const formattedDate = new Date(NOW.updated).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  // Prefer live commits; fall back to the curated list in now.json.
  const showLive = status === "ready" && items && items.length > 0;

  return (
    <section className="lx-now" aria-labelledby="lx-now-heading">
      <div className="lx-now-head">
        <h2 id="lx-now-heading" className="lx-now-title">Now</h2>
        <span className="lx-now-date">
          {showLive ? (
            <>
              <span className="lx-now-pulse" aria-hidden="true" />
              live from github
            </>
          ) : (
            formattedDate
          )}
        </span>
      </div>

      {showLive ? (
        <ul className="lx-now-list">
          {items.map((item) => (
            <li key={`${item.repo}-${item.when}`} className="lx-now-item">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lx-now-repo"
              >
                {item.repo}
              </a>{" "}
              <span className="lx-now-msg">{item.message}</span>{" "}
              <span className="lx-now-when">{item.when}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="lx-now-list">
          {NOW.items.map((item, i) => (
            <li key={i} className="lx-now-item">{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
