import HIGHLIGHTS from "../data/highlights.json";
import { trackOutbound } from "../lib/analytics";

export default function FeaturedWork() {
  return (
    <section className="lx-work" aria-labelledby="lx-work-heading">
      <div className="lx-section">
        <h2 id="lx-work-heading" className="lx-section-label">Featured Work</h2>
      </div>

      <ul className="lx-work-list">
        {HIGHLIGHTS.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`lx-work-item ${item.toneClass}`}
              data-highlight-id={item.id}
              onClick={() => trackOutbound(`work:${item.id}`, item.href)}
            >
              <span className="lx-work-main">
                <span className="lx-work-name">{item.name}</span>
                <span className="lx-work-role">{item.role}</span>
              </span>
              <span className="lx-work-summary">{item.summary}</span>
              <span className="lx-work-meta">{item.meta}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
