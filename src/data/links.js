import { FaEnvelope, FaGithub, FaGlobeAmericas, FaInstagram, FaLinkedin } from "react-icons/fa";
import linksData from "./links.json";

const ICONS = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  portfolio: FaGlobeAmericas,
  github: FaGithub,
  email: FaEnvelope,
};

const LINKS = linksData.map((link) => ({ ...link, icon: ICONS[link.id] }));

export default LINKS;
