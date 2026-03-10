import Boyd from "../../assets/imgs/BoydBGRM.png";
import { FaInstagram, FaLinkedin, FaGlobe, FaGithub } from "react-icons/fa";

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
    icon: FaGlobe,
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

function LinkHub() {
  return (
    <main className="linkx-page">
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />
      <div className="atmosphere atmosphere-c" aria-hidden="true" />

      <section className="linkx-card" aria-label="Boyd Roberts links">
        <header className="linkx-header">
          <div className="photo-shell">
            <span className="photo-ring" aria-hidden="true" />
            <img src={Boyd} alt="Portrait of Boyd Roberts" className="profile-photo" />
          </div>

          <p className="eyebrow">Boyd Roberts</p>
          <h1>Four doors into my world.</h1>
          <p className="subcopy">Product designer and engineer shaping expressive digital experiences.</p>
        </header>

        <nav className="link-stack" aria-label="Social and professional links">
          {LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-pill ${link.toneClass}`}
              >
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

export default LinkHub;
