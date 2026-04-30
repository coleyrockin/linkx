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

export const GROUP_ORDER = ["work", "build", "social"];
export const GROUP_LABELS = {
  work: "Work",
  build: "Build",
  social: "Social",
};

export function scoreLink(link, queryTokens) {
  if (!queryTokens.length) return 1;
  const corpus = [link.name, link.tagline, ...(link.tags || []), ...(link.aliases || []), link.id]
    .join(" ")
    .toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (corpus.includes(token)) return score + (link.name.toLowerCase().includes(token) ? 3 : 1);
    return score;
  }, 0);
}

export function filterLinks(searchInput = "") {
  const query = searchInput.trim().toLowerCase();
  if (!query) return LINKS;
  const tokens = query.split(/\s+/).filter(Boolean);
  const tagTokens = tokens.filter((token) => token.startsWith("tag:")).map((token) => token.slice(4));
  const textTokens = tokens.filter((token) => !token.startsWith("tag:"));

  return LINKS
    .filter((link) => tagTokens.every((tag) => (link.tags || []).includes(tag)))
    .map((link) => ({ link, score: scoreLink(link, textTokens) }))
    .filter((item) => (textTokens.length ? item.score > 0 : true))
    .sort((a, b) => b.score - a.score || a.link.name.localeCompare(b.link.name))
    .map((item) => item.link);
}

export function groupLinks(links) {
  return GROUP_ORDER.map((group) => ({
    id: group,
    label: GROUP_LABELS[group],
    links: links.filter((link) => link.group === group),
  })).filter((group) => group.links.length > 0);
}

export default LINKS;
