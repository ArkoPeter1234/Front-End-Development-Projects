// ============================================
// Skyline — weather app logic
// Data: Open-Meteo (no API key required)
// ============================================

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

const DEFAULT_LOCATION = { name: 'Accra', country: 'Ghana', latitude: 5.6037, longitude: -0.1870 };

/* ---- Weather code → { label, icon key, sky category } ---- */
const WEATHER_CODES = {
  0:  { label: 'Clear sky',        icon: 'clear',   sky: 'clear' },
  1:  { label: 'Mainly clear',     icon: 'clear',   sky: 'clear' },
  2:  { label: 'Partly cloudy',    icon: 'partly',  sky: 'cloudy' },
  3:  { label: 'Overcast',         icon: 'cloudy',  sky: 'cloudy' },
  45: { label: 'Fog',              icon: 'fog',     sky: 'fog' },
  48: { label: 'Depositing fog',   icon: 'fog',     sky: 'fog' },
  51: { label: 'Light drizzle',    icon: 'rain',    sky: 'rain' },
  53: { label: 'Drizzle',          icon: 'rain',    sky: 'rain' },
  55: { label: 'Dense drizzle',    icon: 'rain',    sky: 'rain' },
  56: { label: 'Freezing drizzle', icon: 'rain',    sky: 'rain' },
  57: { label: 'Freezing drizzle', icon: 'rain',    sky: 'rain' },
  61: { label: 'Slight rain',      icon: 'rain',    sky: 'rain' },
  63: { label: 'Rain',             icon: 'rain',    sky: 'rain' },
  65: { label: 'Heavy rain',       icon: 'rain',    sky: 'rain' },
  66: { label: 'Freezing rain',    icon: 'rain',    sky: 'rain' },
  67: { label: 'Freezing rain',    icon: 'rain',    sky: 'rain' },
  71: { label: 'Slight snow',      icon: 'snow',    sky: 'snow' },
  73: { label: 'Snow',             icon: 'snow',    sky: 'snow' },
  75: { label: 'Heavy snow',       icon: 'snow',    sky: 'snow' },
  77: { label: 'Snow grains',      icon: 'snow',    sky: 'snow' },
  80: { label: 'Rain showers',     icon: 'rain',    sky: 'rain' },
  81: { label: 'Rain showers',     icon: 'rain',    sky: 'rain' },
  82: { label: 'Violent showers',  icon: 'rain',    sky: 'rain' },
  85: { label: 'Snow showers',     icon: 'snow',    sky: 'snow' },
  86: { label: 'Snow showers',     icon: 'snow',    sky: 'snow' },
  95: { label: 'Thunderstorm',     icon: 'storm',   sky: 'storm' },
  96: { label: 'Thunderstorm',     icon: 'storm',   sky: 'storm' },
  99: { label: 'Thunderstorm',     icon: 'storm',   sky: 'storm' },
};

function weatherInfo(code) {
  return WEATHER_CODES[code] || { label: 'Unknown', icon: 'clear', sky: 'clear' };
}

/* ---- Inline SVG icon set ---- */
const ICONS = {
  clear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>`,
  partly: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="9" r="4"/><path d="M9 2v1.6M9 14.4V16M2 9h1.6M14.4 9H16M3.9 3.9l1.1 1.1M12.1 3.9 11 5"/><path d="M13 20a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.6 1.8A3.5 3.5 0 0 0 4 20h9Z"/></svg>`,
  cloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 18a4 4 0 0 0 0-8 6 6 0 0 0-11.3 2A3.5 3.5 0 0 0 6 18h11Z"/></svg>`,
  fog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h11a3.5 3.5 0 1 0-3-5.4"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4" y1="16" x2="20" y2="16"/><line x1="6" y1="20" x2="18" y2="20"/></svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 15a4 4 0 0 0 0-8 6 6 0 0 0-11.3 2A3.5 3.5 0 0 0 6 15h11Z"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/></svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 13a4 4 0 0 0 0-8 6 6 0 0 0-11.3 2A3.5 3.5 0 0 0 6 13h11Z"/><path d="M8 18v4M12 18v4M16 18v4M6 20l4-2M10 22l2-2 2 2M14 20l4-2"/></svg>`,
  storm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 13a4 4 0 0 0 0-8 6 6 0 0 0-11.3 2A3.5 3.5 0 0 0 6 13h11Z"/><path d="M13 15l-3 5h3l-2 4"/></svg>`,
};

function iconSvg(key) { return ICONS[key] || ICONS.clear; }

/* ---- DOM refs ---- */
const els = {
  body: document.body,
  searchForm: document.getElementById('searchForm'),
  cityInput: document.getElementById('citySearch'),
  locateBtn: document.getElementById('locateBtn'),
  searchResults: document.getElementById('searchResults'),
  loadingBanner: document.getElementById('loadingBanner'),
  errorBanner: document.getElementById('errorBanner'),
  currentCard: document.getElementById('currentCard'),
  currentLocation: document.getElementById('currentLocation'),
  currentDatetime: document.getElementById('currentDatetime'),
  currentIcon: document.getElementById('currentIcon'),
  currentTemp: document.getElementById('currentTemp'),
  currentCondition: document.getElementById('currentCondition'),
  feelsLike: document.getElementById('feelsLike'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  precip: document.getElementById('precip'),
  hourlySection: document.getElementById('hourlySection'),
  hourlyStrip: document.getElementById('hourlyStrip'),
  dailySection: document.getElementById('dailySection'),
  dailyGrid: document.getElementById('dailyGrid'),
  rain: document.getElementById('rain'),
  sunMoon: document.getElementById('sunMoon'),
};

let searchDebounce = null;
let activeResultIndex = -1;

/* ============================================
   Loading / error state helpers
   ============================================ */
function setLoading(isLoading) {
  els.body.classList.toggle('weather-loading', isLoading);
}

function showError(message) {
  els.errorBanner.textContent = message;
  els.errorBanner.hidden = false;
}

function clearError() {
  els.errorBanner.hidden = true;
  els.errorBanner.textContent = '';
}

/* ============================================
   Sky / ambient background
   ============================================ */
function updateSky(category, isDay) {
  els.body.classList.remove('sky-night', 'sky-cloudy', 'sky-rain', 'sky-storm', 'sky-fog', 'sky-snow', 'sky-dusk');

  if (!isDay && category === 'clear') {
    els.body.classList.add('sky-night');
  } else if (category !== 'clear') {
    els.body.classList.add(`sky-${category}`);
  }

  const showRain = category === 'rain' || category === 'storm';
  els.rain.hidden = !showRain;
  if (showRain) buildRain(); else els.rain.innerHTML = '';
}

function buildRain() {
  if (els.rain.childElementCount > 0) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement('span');
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.6 + Math.random() * 0.6}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    frag.appendChild(drop);
  }
  els.rain.appendChild(frag);
}

/* ============================================
   Geocoding search (debounced)
   ============================================ */
els.cityInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  const query = els.cityInput.value.trim();

  if (query.length < 2) {
    hideResults();
    return;
  }

  searchDebounce = setTimeout(() => runGeocodeSearch(query), 350);
});

els.cityInput.addEventListener('keydown', (e) => {
  const items = Array.from(els.searchResults.children);
  if (!items.length || els.searchResults.hidden) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeResultIndex = Math.min(activeResultIndex + 1, items.length - 1);
    highlightResult(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeResultIndex = Math.max(activeResultIndex - 1, 0);
    highlightResult(items);
  } else if (e.key === 'Enter' && activeResultIndex >= 0) {
    e.preventDefault();
    items[activeResultIndex].click();
  } else if (e.key === 'Escape') {
    hideResults();
  }
});

function highlightResult(items) {
  items.forEach((item, i) => item.classList.toggle('is-active', i === activeResultIndex));
  items[activeResultIndex]?.scrollIntoView({ block: 'nearest' });
}

function hideResults() {
  els.searchResults.hidden = true;
  els.searchResults.innerHTML = '';
  activeResultIndex = -1;
}

async function runGeocodeSearch(query) {
  try {
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Geocoding request failed');
    const data = await res.json();
    renderResults(data.results || []);
  } catch (err) {
    hideResults();
  }
}

function renderResults(results) {
  if (!results.length) {
    els.searchResults.innerHTML = `<li>No matching cities found</li>`;
    els.searchResults.hidden = false;
    return;
  }

  els.searchResults.innerHTML = '';
  activeResultIndex = -1;

  results.forEach((place) => {
    const li = document.createElement('li');
    const region = [place.admin1, place.country].filter(Boolean).join(', ');
    li.innerHTML = `${place.name}<span class="result-sub">${region}</span>`;
    li.addEventListener('click', () => {
      hideResults();
      els.cityInput.value = place.name;
      loadWeather({ name: place.name, country: place.country, latitude: place.latitude, longitude: place.longitude });
    });
    els.searchResults.appendChild(li);
  });

  els.searchResults.hidden = false;
}

document.addEventListener('click', (e) => {
  if (!els.searchForm.contains(e.target)) hideResults();
});

els.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = els.cityInput.value.trim();
  if (!query) return;

  // If the user hits Enter without picking a dropdown item, geocode the raw text.
  (async () => {
    try {
      const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length) {
        const place = data.results[0];
        loadWeather({ name: place.name, country: place.country, latitude: place.latitude, longitude: place.longitude });
      } else {
        showError(`Couldn't find "${query}". Try a different spelling or a nearby larger city.`);
      }
    } catch {
      showError('Search failed — check your connection and try again.');
    }
  })();
});

/* ---- Use current location ---- */
els.locateBtn.addEventListener('click', () => {
  if (!('geolocation' in navigator)) {
    showError('Geolocation isn\u2019t available in this browser.');
    return;
  }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loadWeather({ name: 'Your location', country: '', latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    },
    () => {
      setLoading(false);
      showError('Location access was denied — search for a city instead.');
    }
  );
});

/* ============================================
   Fetch + render weather
   ============================================ */
async function loadWeather(location) {
  clearError();
  setLoading(true);
  els.currentCard.hidden = true;
  els.hourlySection.hidden = true;
  els.dailySection.hidden = true;

  try {
    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day,precipitation',
      hourly: 'temperature_2m,weather_code,precipitation_probability',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'auto',
      forecast_days: '7',
    });

    const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
    if (!res.ok) throw new Error('Forecast request failed');
    const data = await res.json();

    renderCurrent(location, data);
    renderHourly(data);
    renderDaily(data);

    els.currentCard.hidden = false;
    els.hourlySection.hidden = false;
    els.dailySection.hidden = false;
    els.currentCard.classList.remove('is-visible');
    els.hourlySection.classList.remove('is-visible');
    els.dailySection.classList.remove('is-visible');
    requestAnimationFrame(() => {
      els.currentCard.classList.add('is-visible');
      els.hourlySection.classList.add('is-visible');
      els.dailySection.classList.add('is-visible');
    });

  } catch (err) {
    showError('Couldn\u2019t load the forecast right now. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
}

function renderCurrent(location, data) {
  const c = data.current;
  const info = weatherInfo(c.weather_code);

  const label = [location.name, location.country].filter(Boolean).join(', ');
  els.currentLocation.textContent = label;

  const localTime = data.current.time ? new Date(data.current.time) : new Date();
  els.currentDatetime.textContent = localTime.toLocaleString(undefined, {
    weekday: 'long', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short',
  });

  els.currentIcon.innerHTML = iconSvg(info.icon);
  els.currentTemp.textContent = `${Math.round(c.temperature_2m)}°`;
  els.currentCondition.textContent = info.label;

  els.feelsLike.textContent = `${Math.round(c.apparent_temperature)}°`;
  els.humidity.textContent = `${Math.round(c.relative_humidity_2m)}%`;
  els.wind.textContent = `${Math.round(c.wind_speed_10m)} km/h`;
  els.precip.textContent = `${c.precipitation ?? 0} mm`;

  updateSky(info.sky, c.is_day === 1);
}

function renderHourly(data) {
  const now = new Date(data.current.time);
  const times = data.hourly.time;
  const startIdx = times.findIndex(t => new Date(t) >= now);
  const from = startIdx >= 0 ? startIdx : 0;

  els.hourlyStrip.innerHTML = '';
  for (let i = from; i < Math.min(from + 24, times.length); i++) {
    const time = new Date(times[i]);
    const info = weatherInfo(data.hourly.weather_code[i]);
    const card = document.createElement('div');
    card.className = 'hour-card';
    card.innerHTML = `
      <span class="hour-time">${time.toLocaleTimeString(undefined, { hour: 'numeric' })}</span>
      <span class="hour-icon">${iconSvg(info.icon)}</span>
      <span class="hour-temp">${Math.round(data.hourly.temperature_2m[i])}°</span>
    `;
    els.hourlyStrip.appendChild(card);
  }
}

function renderDaily(data) {
  const d = data.daily;
  els.dailyGrid.innerHTML = '';

  d.time.forEach((dateStr, i) => {
    const date = new Date(dateStr);
    const info = weatherInfo(d.weather_code[i]);
    const isToday = i === 0;
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <span class="day-name">${isToday ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' })}</span>
      <span class="day-icon">${iconSvg(info.icon)}</span>
      <span class="day-range"><strong>${Math.round(d.temperature_2m_max[i])}°</strong> <span class="lo">${Math.round(d.temperature_2m_min[i])}°</span></span>
    `;
    els.dailyGrid.appendChild(card);
  });
}

/* ============================================
   Scroll reveal for static sections (search panel)
   ============================================ */
document.querySelectorAll('.reveal').forEach(el => {
  requestAnimationFrame(() => el.classList.add('is-visible'));
});

/* ============================================
   Initial load
   ============================================ */
loadWeather(DEFAULT_LOCATION);
