/* ============================================================
   BYOX-RU — main.js : русский каталог (LTR)
   ============================================================ */

const CATEGORY_ICONS = {
  "Распределённые системы": "🧵",
  "3D-рендерер": "🎨",
  "Модели ИИ": "🤖",
  "Дополненная реальность": "🥽",
  "BitTorrent-клиент": "🧲",
  "Блокчейн / Криптовалюта": "⛓️",
  "Бот": "🤖",
  "Инструмент командной строки": "⌨️",
  "База данных": "🗄️",
  "Docker": "🐳",
  "Эмулятор / Виртуальная машина": "🧮",
  "Front-end фреймворк / библиотека": "🧩",
  "Игра": "🕹️",
  "Git": "🌿",
  "Аллокатор памяти": "🧠",
  "Сетевой стек": "🌐",
  "Нейросеть": "🧬",
  "Операционная система": "💾",
  "Физический движок": "⚙️",
  "Процессор": "⚡",
  "Язык программирования": "💬",
  "Regex-движок": "🔍",
  "Поисковый движок": "🕵️",
  "Шелл": "🖥️",
  "Шаблонизатор": "🧾",
  "Текстовый редактор": "📝",
  "Система распознавания образов": "👁️",
  "Воксельный движок": "🧊",
  "Веб-браузер": "🧭",
  "Веб-сервер": "🛰️",
  "Без категории": "📦",
};

const state = { query: "", category: "all" };

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function init() {
  const data = window.TUTORIALS || [];
  const done = data.filter((t) => t.done).length;
  const fa = data.filter((t) => t.fa).length;

  document.querySelectorAll(".stat[data-stat]").forEach((s) => {
    const key = s.getAttribute("data-stat");
    if (key === "done") s.querySelector("b").textContent = done;
    if (key === "fa") s.querySelector("b").textContent = fa;
    if (key === "total") s.querySelector("b").textContent = data.length;
  });

  const fill = document.querySelector(".progress-fill");
  const label = document.querySelector(".progress-label");
  if (fill && data.length) {
    const pct = Math.round((done / data.length) * 100);
    fill.style.width = pct + "%";
    if (label) label.textContent = "Русские страницы: " + pct + "% (" + done + " из " + data.length + ")";
  }

  buildFilters(data);
  render(data);

  const input = document.getElementById("search");
  input.addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render(data);
  });
  document.getElementById("filters").addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    state.category = pill.dataset.cat;
    render(data);
  });
}

function buildFilters(data) {
  const wrap = document.getElementById("filters");
  const all = el("button", "pill active all-filter");
  all.dataset.cat = "all";
  all.textContent = "Все";
  wrap.appendChild(all);
  const cats = {};
  data.forEach((t) => { cats[t.category] = (cats[t.category] || 0) + 1; });
  Object.keys(cats).forEach((cat) => {
    const pill = el("button", "pill");
    pill.dataset.cat = cat;
    const inner = document.createElement("span");
    inner.textContent = cat;
    const count = document.createElement("span");
    count.className = "count";
    count.textContent = "(" + cats[cat] + ")";
    pill.append(inner, count);
    wrap.appendChild(pill);
  });
}

function matches(t) {
  if (state.category !== "all" && t.category !== state.category) return false;
  if (!state.query) return true;
  return (t.title + " " + t.category + " " + t.lang).toLowerCase().includes(state.query);
}

function render(data) {
  const root = document.getElementById("list");
  root.innerHTML = "";
  if (!data.length) return;

  const cats = {};
  data.forEach((t) => { (cats[t.category] = cats[t.category] || []).push(t); });
  const order = [...new Set(data.map((t) => t.category))];

  let showed = 0;
  order.forEach((cat) => {
    const items = cats[cat]
      .filter(matches)
      .sort((a, b) => b.done - a.done || b.fa - a.fa);
    if (!items.length) return;
    showed += items.length;

    const section = el("section", "category");
    const head = el("div", "category-head");
    const h2 = el("h2");
    h2.appendChild(el("span", "icon", CATEGORY_ICONS[cat] || "📚"));
    h2.appendChild(document.createTextNode(cat));
    const done = items.filter((t) => t.done).length;
    head.appendChild(h2);
    head.appendChild(el("span", "meta", "Русских страниц: " + done + " из " + items.length));
    section.appendChild(head);

    const grid = el("div", "grid");
    items.forEach((t) => grid.appendChild(card(t)));
    section.appendChild(grid);
    root.appendChild(section);
  });

  if (!showed) {
    const note = el("div", "empty-note", "Ничего не найдено — попробуйте другой запрос.");
    root.appendChild(note);
  }
}

function card(t) {
  const c = el("a", "card" + (t.done ? "" : " external"));
  if (t.done) {
    c.href = "tutorials-ru/" + t.file;
  } else {
    c.href = t.url;
    c.target = "_blank";
    c.setAttribute("rel", "noopener");
  }

  const top = el("div", "top");
  top.appendChild(el("span", "lang", t.lang));
  if (t.video) top.appendChild(el("span", "badge-status video", "Видео"));
  if (t.fa) top.appendChild(el("span", "badge-status fa", "فارسی"));
  c.appendChild(top);

  c.appendChild(el("div", "title", t.title));

  const bottom = el("div", "bottom");
  bottom.appendChild(el("span", "badge-status " + (t.done ? "done" : "wait"), t.done ? "Русская страница" : "Оригинал"));
  c.appendChild(bottom);

  const go = el("span", "go", t.done ? "Читать →" : "");
  bottom.appendChild(go);
  return c;
}

document.addEventListener("DOMContentLoaded", init);