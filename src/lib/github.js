const CACHE_KEY = "linkx:gh-activity:v1";
const CACHE_TTL_MS = 15 * 60 * 1000;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* quota or private mode — silent */
  }
}

function relativeTime(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.round(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

/**
 * Returns up to `limit` of the user's most recent public push commits across
 * distinct repos, formatted for the "Now" section.
 *
 * Network + cache strategy:
 *   - Reads a 15-minute localStorage cache first (same-session reloads are free).
 *   - Falls through to the GitHub REST API.
 *   - Returns `null` on any failure so the UI can gracefully fall back to static copy.
 */
export async function fetchRecentActivity(username, limit = 3) {
  const cached = readCache();
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return null;
    const events = await res.json();

    const seen = new Set();
    const items = [];
    for (const ev of events) {
      if (ev.type !== "PushEvent") continue;
      const repo = ev.repo?.name;
      const commit = ev.payload?.commits?.[ev.payload.commits.length - 1];
      if (!repo || !commit?.message || seen.has(repo)) continue;
      seen.add(repo);
      items.push({
        repo: repo.replace(`${username}/`, ""),
        message: commit.message.split("\n")[0].slice(0, 72),
        when: relativeTime(ev.created_at),
        href: `https://github.com/${repo}`,
      });
      if (items.length >= limit) break;
    }

    if (items.length === 0) return null;
    writeCache(items);
    return items;
  } catch {
    return null;
  }
}
