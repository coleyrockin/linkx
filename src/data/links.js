import { FaInstagram, FaLinkedin, FaGithub, FaGlobeAmericas } from "react-icons/fa";

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
    icon: FaGlobeAmericas,
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

export default LINKS;
