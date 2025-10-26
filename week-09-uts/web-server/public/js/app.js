document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const resultContainer = document.getElementById("weather-result");

  if (!form || !resultContainer) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const address = getAddressValue();
    if (!address) {
      resultContainer.innerHTML = `<div class="weather-error">Kamu harus memasukkan lokasi yang kamu cari!</div>`;
      return;
    }

    resultContainer.innerHTML = `<div class="weather-loading">Memuat data cuaca untuk <strong>${escapeHtml(
      address
    )}</strong>…</div>`;

    fetch(`/cuaca?address=${encodeURIComponent(address)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          resultContainer.innerHTML = `<div class="weather-error">${escapeHtml(
            data.error
          )}</div>`;
          return;
        }

        // Build forecast card
        const forecast = data.forecast || {};
        const location = data.location || "-";

        const description = Array.isArray(forecast.weather_descriptions)
          ? forecast.weather_descriptions.join(", ")
          : String(forecast.weather_descriptions || "-");

        resultContainer.innerHTML = `
          <div class="weather-card">
            <h4 class="weather-location">${escapeHtml(location)}</h4>
            <p class="weather-desc">${escapeHtml(description)}</p>
            <div class="weather-grid">
              <div class="weather-row"><span class="label">Suhu</span><span>${escapeHtml(
                String(forecast.temperature ?? "-")
              )} °C</span></div>
              <div class="weather-row"><span class="label">Index UV</span><span>${escapeHtml(
                String(forecast.uv_index ?? "-")
              )}</span></div>
              <div class="weather-row"><span class="label">Visibilitas</span><span>${escapeHtml(
                String(forecast.visibility ?? "-")
              )} km</span></div>
            </div>
          </div>
        `;
      })
      .catch((err) => {
        console.error(err);
        resultContainer.innerHTML = `<div class="weather-error">Terjadi kesalahan saat mengambil data cuaca.</div>`;
      });
  });
});

// Minimal HTML-escape helper
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Try multiple ways to read the address value, for compatibility with autofill widgets
function getAddressValue() {
  // 1) primary input by id
  const byId = document.getElementById("address");
  if (byId && String(byId.value || "").trim()) return String(byId.value).trim();

  // 2) try form data (in case input name differs)
  const form = document.getElementById("weather-form");
  if (form) {
    try {
      const fd = new FormData(form);
      const candidates = ["address", "query", "q", "search", "location"];
      for (const c of candidates) {
        const v = fd.get(c);
        if (v && String(v).trim()) return String(v).trim();
      }
    } catch (e) {
      // ignore
    }
  }

  // 3) inputs that mapbox or other plugins might populate: check common attributes
  const selectors = [
    "input[data-mapbox-autofill]",
    "input.mapboxsearch-autofill",
    'input[autocomplete="street-address"]',
    'input[autocomplete="address-line1"]',
    'input[autocomplete="address"]',
    'input[role="combobox"]',
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && String(el.value || "").trim()) return String(el.value).trim();
  }

  // 4) finally, any text input inside the form
  if (form) {
    const inputs = form.querySelectorAll(
      'input[type="text"], input[type="search"]'
    );
    for (const inp of inputs) {
      if (inp && String(inp.value || "").trim())
        return String(inp.value).trim();
    }
  }

  return "";
}
