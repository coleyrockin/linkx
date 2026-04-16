import { FaInstagram, FaLinkedin, FaGithub, FaGlobeAmericas } from "react-icons/fa";
import XIcon from "../components/icons/XIcon";
import linksData from "./links.json";

const ICONS = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  portfolio: FaGlobeAmericas,
  github: FaGithub,
  x: XIcon,
};

const LINKS = linksData.map((link) => ({ ...link, icon: ICONS[link.id] }));

export default LINKS;
