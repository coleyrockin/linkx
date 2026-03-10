import ProfilePhoto from "../../assets/imgs/boyd26.jpeg";
import { FaInstagram, FaLinkedin, FaBriefcase, FaGithub } from "react-icons/fa";

const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/coleyrockin/",
    tagline: "Behind the scenes",
    icon: FaInstagram,
    toneClass: "tone-instagram"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/boydcroberts/",
    tagline: "Professional world",
    icon: FaLinkedin,
    toneClass: "tone-linkedin"
  },
  {
    name: "Portfolio",
    href: "https://coleyrockin.github.io/react-portfolio/",
    tagline: "Projects and builds",
    icon: FaBriefcase,
    toneClass: "tone-portfolio"
  },
  {
    name: "GitHub",
    href: "https://github.com/coleyrockin",
    tagline: "Code and open source",
    icon: FaGithub,
    toneClass: "tone-github"
  }
];

function Everything() {
  return (
    <main className="linkx-page">
      <div className="grid-lines" aria-hidden="true" />
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />
      <div className="atmosphere atmosphere-c" aria-hidden="true" />

      <section className="linkx-card" aria-label="Boyd Roberts links">
        <div className="hero-grid">
          <header className="linkx-header">
            <p className="eyebrow">Boyd Roberts</p>
            <h1>Doors into my world</h1>
            <p className="subcopy">
              A way to jump into the work, the network, and the projects I am building.
            </p>
            <div className="signal-row" aria-label="Brand themes">
              <span className="signal-pill">Creative</span>
              <span className="signal-pill">Professional</span>
              <span className="signal-pill">Builder</span>
            </div>
          </header>

          <aside className="portrait-panel" aria-label="Boyd Roberts portrait">
            <div className="portrait-glow portrait-glow-a" aria-hidden="true" />
            <div className="portrait-glow portrait-glow-b" aria-hidden="true" />
            <div className="photo-shell">
              <span className="photo-ring" aria-hidden="true" />
              <span className="photo-backdrop" aria-hidden="true" />
              <img
                src={ProfilePhoto}
                alt="Portrait of Boyd Roberts"
                className="profile-photo"
              />
            </div>
          </aside>
        </div>

        <nav className="link-stack" aria-label="Social and professional links">
          {LINKS.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-pill ${link.toneClass}`}
              >
                <span className="link-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="icon-badge" aria-hidden="true">
                  <Icon />
                </span>

                <span className="link-copy">
                  <span className="link-name">{link.name}</span>
                  <span className="link-tagline">{link.tagline}</span>
                </span>

                <span className="link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            );
          })}
        </nav>
      </section>
    </main>
  );
}

export default Everything;
