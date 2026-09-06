export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>ProjectHub — Page Error or Offline</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #f5ecec;
        color: #1b1b1b;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
        box-sizing: border-box;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        text-align: center;
        padding: 2.5rem 2rem;
        background: #ffffff;
        border-radius: 1rem;
        border: 1px solid #e3d8d8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 1rem;
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.2);
      }
      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.75rem;
        letter-spacing: -0.02em;
      }
      p {
        color: #5f5f5f;
        margin: 0 0 1.75rem;
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      a, button {
        padding: 0.65rem 1.25rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        transition: transform 0.15s ease, background 0.15s ease;
      }
      a:hover, button:hover {
        transform: translateY(-1px);
      }
      .primary {
        background: #31f787;
        color: #10261a;
      }
      .secondary {
        background: #ffffff;
        color: #1b1b1b;
        border-color: #e3d8d8;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div id="status-badge" class="badge" style="display: none;">
        <span>Offline Mode</span>
      </div>
      <h1 id="error-title">Unable to Load Page</h1>
      <p id="error-desc">We encountered an issue loading this view. If you lost internet connection, reconnecting will reload the page automatically.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try Again</button>
        <a class="secondary" href="/">Return to Home</a>
      </div>
    </div>
    <script>
      function checkNet() {
        var badge = document.getElementById('status-badge');
        var title = document.getElementById('error-title');
        var desc = document.getElementById('error-desc');
        if (!navigator.onLine) {
          if (badge) badge.style.display = 'inline-flex';
          if (title) title.innerText = "No Internet Connection";
          if (desc) desc.innerText = "Please check your network cables, Wi-Fi, or mobile data. The page will reload once reconnected.";
        }
      }
      window.addEventListener('offline', checkNet);
      window.addEventListener('online', function() { location.reload(); });
      checkNet();
    </script>
  </body>
</html>`;
}
