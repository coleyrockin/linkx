import { FaInstagram, FaLinkedin, FaGithub, FaGlobeAmericas } from "react-icons/fa";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/coleyrockin/",
    tagline: "Behind the scenes",
    icon: FaInstagram,
    toneClass: "tone-instagram",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/boydcroberts/",
    tagline: "Professional world",
    icon: FaLinkedin,
    toneClass: "tone-linkedin",
  },
  {
    name: "Portfolio",
    href: "https://coleyrockin.github.io/react-portfolio/",
    tagline: "Projects and builds",
    icon: FaGlobeAmericas,
    toneClass: "tone-portfolio",
  },
  {
    name: "GitHub",
    href: "https://github.com/coleyrockin",
    tagline: "Code and open source",
    icon: FaGithub,
    toneClass: "tone-github",
  },
  {
    name: "X",
    href: "https://x.com/coleyrockin",
    tagline: "Thoughts and threads",
    icon: XIcon,
    toneClass: "tone-x",
  },
];

export default LINKS;
