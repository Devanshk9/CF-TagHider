# CF-TagHider (Chrome Extension)

Hide **Codeforces** problem tags while you practice — focus on problem‑solving, not hints.

> Chrome Manifest V3 • Lightweight • Runs only on `codeforces.com`

---

##  Features

- Hides tag blocks on **problem pages** (e.g., `.problem-tags`, `.tag-box`).
- Removes tag hints on the **problemset list** (keeps the problem link, hides the rest).
- Works with dynamic page updates via `MutationObserver`.
- Private & minimal: no analytics, no external scripts.

---

##  Folder Structure

```
HideTags/
  ├── manifest.json
  ├── content.js
  └── popup.html
```

---

##  Install (Load Unpacked)

1. Download or clone this folder.
2. Open Chrome → go to `chrome://extensions/`.
3. Toggle **Developer mode** (top right).
4. Click **Load unpacked** and select the `HideTags/` folder.
5. Visit any Codeforces page (e.g., [https://codeforces.com/problemset](https://codeforces.com/problemset)).
6. Open DevTools → **Console** and confirm:
   ```
   [TagHider] content.js loaded
   ```

> If you edit files later, click **Reload** on the extension card, then refresh the CF page.

---

##  How It Works

- **content.js** runs on `*://*.codeforces.com/*`.
- On **problem pages**, it hides tag containers.
- On the **problemset list**, it preserves the problem link and strips trailing tag text in the “Name” column.
- A `MutationObserver` re-applies the hide logic whenever CF updates parts of the DOM dynamically.

---

##  Permissions

- `host_permissions`: `*://*.codeforces.com/*` (script runs **only** on Codeforces).
- No background service worker, no storage required for the basic version.

---

##  Manifest (MV3)

```json
{
  "manifest_version": 3,
  "name": "TagHider",
  "version": "1.0",
  "description": "Hide Tags in CF Problems during practice",
  "action": { "default_popup": "popup.html" },
  "host_permissions": ["*://*.codeforces.com/*"],
  "content_scripts": [
    {
      "matches": ["*://*.codeforces.com/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

---

##  Usage

- Install the extension and browse Codeforces normally.
- Tags will be hidden automatically on the **problemset** and **problem** pages.

> You can customize the behavior by tweaking selectors in `content.js`.

---

##  Troubleshooting

**“Could not load JavaScript 'content.js' for script.”**

- Ensure `content.js` exists, the name matches exactly (case‑sensitive), and it sits alongside `manifest.json`.
- Validate JSON (no trailing commas).

**Tags not hidden on the list page**

- Confirm the `matches` covers `*://*.codeforces.com/*`.
- Reload the extension and refresh the page.
- Check Console for `[TagHider] content.js loaded`.

**CF layout changed**

- Inspect the element and update selectors in `content.js`.

---

##  Example Selectors (used in `content.js`)

- Problem page containers: `.problem-tags`, `.tag-box`, `.roundbox .tag-box`.
- Problemset list column: `table.problems tr > td:nth-child(2)`.

---

##  Screenshots

Add your own images (optional):

- **Problemset list (tags hidden)**: `docs/problemset-list.png`
- **Problem page (tags hidden)**: `docs/problem-page.png`

```
![Problemset list](docs/problemset-list.png)
![Problem page](docs/problem-page.png)
```

---

##  Optional: Add a Toggle (future)

- Use `chrome.storage.sync` to store a `hideTags` boolean.
- Read it in `content.js` to enable/disable hiding.
- Add a checkbox in `popup.html` to toggle the value.

> Ask in Issues/PRs if you want a ready‑made toggle wiring.

---

##  Development Tips

- Keep selectors resilient; CF markup can shift.
- Prefer **querySelector**/**querySelectorAll** with specific but stable selectors.
- Use `MutationObserver` sparingly to avoid performance hits (batch updates where possible).

---

##  Contributing

PRs welcome. Keep it simple, MV3‑compliant, and privacy‑friendly.

---

##  License

MIT © 2025 Your Name

