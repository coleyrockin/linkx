import { useEffect, useState } from "react";
import { fetchRecentActivity } from "../lib/github";

export default function useGitHubActivity(username) {
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetchRecentActivity(username).then((data) => {
      if (cancelled) return;
      if (data) {
        setItems(data);
        setStatus("ready");
      } else {
        setStatus("unavailable");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { items, status };
}
