import { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_CHAT_API_URL || "https://portfolio-chatbot-2-6nem.onrender.com").replace(/\/$/, "");
const retryDelays = [0, 3000, 5000, 10000];

export default function useBackendHealth() {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function checkBackend() {
      for (const delay of retryDelays) {
        if (delay > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, delay));
        }

        if (cancelled) return;
        setBackendStatus(delay === 0 ? "checking" : "starting");

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 15000);

        try {
          const response = await fetch(`${API_URL}/health`, { signal: controller.signal });
          if (!response.ok) throw new Error(`Health check failed: ${response.status}`);
          if (!cancelled) setBackendStatus("ready");
          window.clearTimeout(timeoutId);
          return;
        } catch {
          window.clearTimeout(timeoutId);
          if (cancelled) return;
          setBackendStatus("starting");
        }
      }

      if (!cancelled) setBackendStatus("unavailable");
    }

    checkBackend();
    return () => {
      cancelled = true;
    };
  }, []);

  return backendStatus;
}
