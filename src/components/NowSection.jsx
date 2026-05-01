import NOW from "../data/now.json";
import useGitHubActivity from "../hooks/useGitHubActivity";

const GH_USERNAME = "coleyrockin";

export default function NowSection() {
  const { items, status } = useGitHubActivity(GH_USERNAME);

  const formattedDate = new Date(NOW.updated).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const showLive = status === "ready" && items && items.length > 0;

  return (
    <section className="lx-activity" aria-labelledby="lx-activity-heading">
      <div className="lx-activity-head">
        <h2 id="lx-activity-heading" className="lx-activity-title">Now</h2>
        <span className="lx-activity-meta">
          {showLive ? (
            <>
              <span className="lx-activity-live" aria-hidden="true" />
              Live
            </>
          ) : (
            formattedDate
          )}
        </span>
      </div>

      {showLive ? (
        <ul className="lx-activity-list">
          {items.map((item) => (
            <li key={`${item.repo}-${item.when}`} className="lx-activity-item">
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="lx-activity-repo">
                {item.repo}
              </a>{" "}
              <span className="lx-activity-msg">{item.message}</span>{" "}
              <span className="lx-activity-when">{item.when}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="lx-activity-list">
          {NOW.items.map((item, i) => (
            <li key={i} className="lx-activity-item">{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
