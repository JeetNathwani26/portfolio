# Render Cold Start: Portfolio Chatbot Wake-Up Strategy

## 1. Problem

The portfolio chatbot's first request sometimes takes longer, while
later requests respond normally.

If the Flask backend is hosted on a Render free web service, this may be
caused by a **cold start**. Free services can spin down after a period
without incoming traffic. The first request after that period can take
longer while the service starts.

## 2. Recommended approach

When a visitor opens the portfolio:

1.  React sends a request to the backend health endpoint.
2.  If the Render service is sleeping, this request triggers it to
    start.
3.  React waits for a successful health response.
4.  When the visitor sends a chatbot message, React can show whether the
    backend is ready or still starting.

This can reduce the delay when the visitor asks their first question. It
does not guarantee an instant response: the service may still be
starting, and the AI provider may also take time.

> Important: A health-check request does not keep a Render free service
> awake indefinitely. Do not send requests every 5 seconds to try to
> prevent spin-down. Use a paid always-on instance if the backend must
> remain continuously available.

## 3. Flask backend: health endpoint

Add a lightweight endpoint to your Flask application:

``` python
from flask import jsonify

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "message": "Backend is running"
    }), 200
```

Deploy the change and test this URL in a browser:

``` text
https://YOUR-BACKEND.onrender.com/health
```

Expected response:

``` json
{
  "status": "ok",
  "message": "Backend is running"
}
```

Replace `YOUR-BACKEND` with your actual Render service hostname.

## 4. React frontend: check backend when the portfolio opens

Use your existing API base URL. For a Vite project, it might be
configured as:

``` env
VITE_API_URL=https://YOUR-BACKEND.onrender.com
```

Example React hook:

``` jsx
import { useEffect, useState } from "react";

export function useBackendHealth() {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function checkBackend() {
      const delays = [0, 3000, 5000, 10000];

      for (const delay of delays) {
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        if (cancelled) return;

        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/health`
          );

          if (!response.ok) {
            throw new Error(`Health check failed: ${response.status}`);
          }

          if (!cancelled) {
            setBackendStatus("ready");
          }
          return;
        } catch (error) {
          if (cancelled) return;
          setBackendStatus("starting");
        }
      }

      if (!cancelled) {
        setBackendStatus("unavailable");
      }
    }

    checkBackend();

    return () => {
      cancelled = true;
    };
  }, []);

  return backendStatus;
}
```

Example usage:

``` jsx
function Portfolio() {
  const backendStatus = useBackendHealth();

  return (
    <>
      {backendStatus === "checking" && <p>Connecting to chatbot...</p>}
      {backendStatus === "starting" && <p>Starting the chatbot server...</p>}
      {backendStatus === "ready" && <p>Chatbot server is ready.</p>}
      {backendStatus === "unavailable" && (
        <p>Chatbot is temporarily unavailable. Please try again.</p>
      )}

      {/* Your portfolio content */}
    </>
  );
}
```

The retry delays above are an example, not a guarantee that the server
will be ready within that period. Adjust them based on observed startup
time.

## 5. Chatbot request handling

-   Keep the portfolio usable while the backend starts.
-   If the user sends a message before the backend is ready, show a
    clear message such as **"The chatbot server is starting. Please try
    again in a moment."**
-   Alternatively, queue the message and submit it once the health check
    succeeds. Prevent duplicate submissions.
-   Add a request timeout and a retry option for transient failures.
-   Do not automatically retry a chatbot POST request unless you can
    prevent duplicate processing.

## 6. Deployment checklist

-   [ ] Add the `/health` endpoint to Flask.
-   [ ] Deploy the backend to Render.
-   [ ] Verify the health endpoint returns HTTP 200.
-   [ ] Add `VITE_API_URL` in Vercel for the correct deployment
    environment.
-   [ ] Redeploy the Vercel frontend after changing environment
    variables.
-   [ ] Call the health endpoint when the portfolio loads.
-   [ ] Test after the Render service has been idle.
-   [ ] Test chatbot behavior when the backend is ready and when it is
    unavailable.

## 7. Important Render notes

-   A health endpoint is useful for checking service readiness and
    triggering a start when a request arrives.
-   It is not a supported way to keep a free service permanently awake.
-   Avoid artificial traffic every 5 seconds or other frequent
    keep-alive workarounds.
-   For reliable always-on availability, consider a paid Render
    instance.
-   A warm backend does not guarantee a fast AI response; measure
    backend startup time separately from AI provider response time.

## 8. Troubleshooting

If the chatbot is still slow:

1.  Open browser Developer Tools → Network.
2.  Find the `/health` request and record its duration and status.
3.  Find the chatbot API request and record its duration and status.
4.  Check Render service logs around the same time.
5.  If `/health` is fast but the chatbot request is slow, investigate AI
    provider latency, prompt size, database calls, and backend
    processing.

This helps identify whether the delay is caused by Render startup or by
chatbot response generation.
