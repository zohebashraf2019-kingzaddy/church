/* =========================================================
   St. Michael Catholic Church — site script
   - EN / ES language switch (remembered per visitor)
   - Weekly schedule + "Next Mass" countdown
   - Parish calendar with add-to-calendar (Google + .ics)
   - Contact / prayer request form (opens email to the office)

   ✏️  TO UPDATE CONTENT: edit SCHEDULE and EVENTS below.
   ========================================================= */

const PARISH_EMAIL = "stmreno@stmichaelreno.org";
const ADDRESS = "St. Michael Catholic Church, 14075 Mt. Vida St, Reno, NV 89506";

/* ---------- Weekly schedule (day: 0 = Sunday … 6 = Saturday) ---------- */
const SCHEDULE = [
  { day: 0, start: "08:00", type: "mass", lang: "en" },
  { day: 0, start: "09:30", type: "mass", lang: "en" },
  { day: 0, start: "11:00", type: "mass", lang: "es" },
  { day: 0, start: "12:00", type: "mass", lang: "es" },
  { day: 0, start: "14:00", type: "mass", lang: "es" },
  { day: 2, start: "09:00", type: "communion", lang: "en" },
  { day: 2, start: "10:00", end: "13:00", type: "office", lang: "all" },
  { day: 3, start: "10:00", end: "13:00", type: "office", lang: "all" },
  { day: 4, start: "09:00", type: "mass", lang: "en" },
  { day: 4, start: "10:00", end: "13:00", type: "office", lang: "all" },
  { day: 4, start: "13:00", end: "18:00", type: "pantry", lang: "all" },
  { day: 5, start: "09:00", type: "mass", lang: "en" },
  { day: 5, start: "10:00", end: "13:00", type: "office", lang: "all" },
  { day: 6, start: "12:00", end: "16:00", type: "office", lang: "all" },
  { day: 6, start: "15:30", type: "confession", lang: "all" },
  { day: 6, start: "16:30", type: "vigil", lang: "en" },
];

/* First Friday of each month (added on top of the regular Friday Mass) */
const FIRST_FRIDAY = [
  { start: "10:00", end: "13:00", type: "adoration", lang: "all" },
  { start: "19:00", type: "mass", lang: "es" },
];

/* ---------- Special parish events (YYYY-MM-DD, 24h times) ---------- */
const EVENTS = [
  {
    date: "2026-11-08", start: "13:00",
    en: { title: "Our Lady of Guadalupe Committee Meeting", desc: "Planning the parish celebration of the Feast of Our Lady of Guadalupe." },
    es: { title: "Reunión del Comité de Nuestra Señora de Guadalupe", desc: "Planeación de la celebración parroquial de la Fiesta de Nuestra Señora de Guadalupe." },
  },
  {
    date: "2026-12-01", start: "13:30",
    en: { title: "CSA Pledge Deadline & Raffle Entry", desc: "Last day to complete Catholic Services Appeal pledges with Betty for the year-end raffle." },
    es: { title: "Fecha límite de promesas CSA y rifa", desc: "Último día para completar su promesa a la Campaña de Servicios Católicos (con Betty) y entrar a la rifa de fin de año." },
  },
  {
    date: "2026-12-04",
    en: { title: "Bazaar Donation Drop-off Deadline", desc: "Drop Christmas crafts and gently used Christmas treasures at Father Wright Hall (no clothing, please). Baked goods accepted starting today." },
    es: { title: "Último día para donaciones del Bazar", desc: "Deje manualidades navideñas y artículos navideños en buen estado en el Salón Father Wright (no ropa, por favor). Se reciben postres desde hoy." },
  },
  {
    date: "2026-12-05", endDate: "2026-12-06",
    en: { title: "Marthas & Marys Christmas Bazaar & Bake Sale", desc: "Father Wright Hall. CSA raffle winners announced Sunday afternoon. Info: Kathy, (775) 224-8020." },
    es: { title: "Bazar Navideño y Venta de Postres de Martas y Marías", desc: "Salón Father Wright. Los ganadores de la rifa CSA se anuncian el domingo por la tarde. Info: Kathy, (775) 224-8020." },
  },
  {
    date: "2026-12-12",
    en: { title: "Feast of Our Lady of Guadalupe", desc: "Parish celebration. See the bulletin and Facebook for times." },
    es: { title: "Fiesta de Nuestra Señora de Guadalupe", desc: "Celebración parroquial. Consulte el boletín y Facebook para los horarios." },
  },
];

/* ---------- Spanish translations (English lives in the HTML) ---------- */
const ES = {
  skip: "Saltar al contenido",
  brandSub: "Iglesia Católica · Reno, NV",
  navMass: "Horarios de Misa", navCalendar: "Calendario", navSacraments: "Sacramentos",
  navMinistries: "Ministerios", navVisit: "Visítenos", navContact: "Contacto", menu: "Menú",
  heroEyebrow: "North Valleys · Stead · Reno, Nevada",
  heroTitle: "Una familia parroquial,<br><em>dos idiomas,</em> una sola fe.",
  heroLead: "Bienvenidos a casa, a la Iglesia Católica San Miguel. Ya sea su primera visita o lleve años orando aquí, hay un lugar para usted en nuestra mesa.",
  heroCta1: "Ver horarios de Misa", heroCta2: "Planee su visita",
  nextMassLabel: "Próxima Misa",
  qCall: "Llame a la oficina", qDirections: "Cómo llegar", qPrayer: "Petición de oración",
  qPrayerSub: "Oramos con usted", qFacebook: "Síganos en Facebook", qFacebookSub: "Noticias y avisos",
  iconCaption: "San Miguel Arcángel, ruega por nosotros.",
  welcomeEyebrow: "Bienvenidos a la Parroquia San Miguel",
  welcomeTitle: "Continuando la presencia sanadora de Cristo en los North Valleys",
  mission: "Llamados al ministerio colaborativo en virtud del Santo Bautismo, el pueblo de Dios en la Comunidad Católica San Miguel continúa la presencia sanadora de Nuestro Señor y Salvador Jesucristo en las comunidades de los North Valleys, celebrando y compartiendo la Divina Voluntad con todos los pueblos.",
  missionCite: "— Nuestra declaración de misión",
  welcomeBody: "Somos una parroquia diversa y bilingüe de la Diócesis de Reno, a dos cuadras del Aeropuerto de Stead. Bajo el cuidado pastoral del Rev. Elberto Meléndez, nos reunimos cada semana en inglés y en español para adorar, servir a nuestros vecinos y crecer juntos en la fe.",
  register: "Regístrese en la parroquia", bulletin: "Lea el boletín de esta semana →",
  massEyebrow: "Horario semanal", massTitle: "Misa, Confesión y Oración",
  massLead: "El día de hoy aparece resaltado. Use el filtro para ver solo servicios en inglés o en español.",
  fAll: "Todos", fEn: "English", fEs: "Español",
  ffTitle: "Primer Viernes de cada mes",
  ffBody: "Misa 9:00 AM (inglés) · Adoración Eucarística 10:00 AM – 1:00 PM · Misa 7:00 PM (español)",
  holyTitle: "Días de precepto y festividades",
  holyBody: "Los horarios especiales de Navidad, Semana Santa y días de precepto se anuncian en el boletín semanal y en Facebook.",
  calEyebrow: "Calendario parroquial", calTitle: "Lo que está pasando en San Miguel",
  calLead: "Toque cualquier día para ver detalles y agregar un evento a su propio calendario.",
  legSpecial: "Evento parroquial", legPantry: "Despensa de alimentos", legDevotion: "Primer Viernes",
  upcoming: "Próximamente",
  sacEyebrow: "Sacramentos", sacTitle: "Momentos de gracia",
  sacLead: "Para cualquier sacramento, llame a la oficina parroquial con algunas semanas de anticipación para ayudarle a prepararse.",
  s1t: "Bautismo", s1b: "Reciba a su hijo en la familia de Dios. Los padres y padrinos completan una breve plática de preparación.",
  s2t: "Reconciliación", s2b: "Confesiones los sábados a las 3:30 PM, o con cita con el Padre.",
  s3t: "Primera Comunión y Confirmación", s3b: "Niños y jóvenes se preparan en nuestro programa de Educación Religiosa. Directora: Susan Walker, (775) 737-9337.",
  s4t: "Matrimonio", s4b: "Comuníquese con la oficina al menos seis meses antes de su boda para iniciar la preparación matrimonial.",
  s5t: "Unción de los Enfermos", s5b: "Para personas gravemente enfermas, de edad avanzada o antes de una cirugía. En una emergencia, llame a la oficina de inmediato.",
  s6t: "Hacerse Católico (OICA)", s6b: "Adultos interesados en la fe católica, o que buscan el Bautismo, la Comunión o la Confirmación, son bienvenidos.",
  minEyebrow: "Involúcrese", minTitle: "Ministerios y comunidad",
  minLead: "La fe crece cuando se comparte. Encuentre un grupo para usted y venga a saludar.",
  pantryEyebrow: "Sirviendo a nuestros vecinos", pantryTitle: "Despensa de Alimentos Comunitaria",
  pantryBody: "En colaboración con el Food Bank of Northern Nevada, repartimos alimentos a familias locales cada jueves de 1:00 a 6:00 PM. Todos son bienvenidos. Siempre necesitamos voluntarios.",
  pantryDay: "Jueves", pantryCta: "Sea voluntario",
  m1t: "Caballeros de Colón", m1b: "Hombres católicos al servicio de la parroquia y la comunidad por medio de la caridad, la unidad y la fraternidad.",
  m2t: "Grupo de Jóvenes", m2b: "Un lugar para que los adolescentes crezcan en la fe, la amistad y el servicio.",
  m3t: "Educación Religiosa", m3b: "Clases de catecismo para niños que se preparan para los sacramentos.",
  m4t: "Estudio Bíblico", m4b: "Abramos juntos las Escrituras y descubramos cómo la Palabra de Dios habla a la vida diaria.",
  m5t: "Martas y Marías", m5b: "Organizan tradiciones parroquiales muy queridas, como el Bazar Navideño y Venta de Postres anual.",
  m6t: "Comité de Nuestra Señora de Guadalupe", m6b: "Prepara la celebración parroquial de la Fiesta de Nuestra Señora de Guadalupe cada 12 de diciembre.",
  m7t: "Ministros Litúrgicos", m7b: "Lectores, ministros de la Eucaristía y monaguillos. Consulte el calendario de servicio actual.", m7l: "Ver calendario →",
  visitEyebrow: "Planee su visita", visitTitle: "Aquí es bienvenido",
  visitBody: "Estamos a dos cuadras del Aeropuerto de Stead, en los North Valleys de Reno. Busque la gran cruz blanca sobre las puertas principales. Si es su primera visita, preséntese después de Misa — nos encantará conocerle.",
  addr: "Dirección", hours: "Horario de oficina",
  hoursVal: "Mar – Vie: 10:00 AM – 1:00 PM<br>Sábado: 12:00 – 4:00 PM",
  phone: "Teléfono", fax: "Fax: (775) 972-9373", email: "Correo",
  staffEyebrow: "Personal parroquial", staffTitle: "Para servirle",
  rPastor: "Párroco", rSec: "Secretaria / Coordinadora de Liturgia", rRE: "Directora de Educación Religiosa", rBook: "Contadora",
  pcc: "Consejo Pastoral Parroquial", pfc: "Consejo de Finanzas Parroquial", pres: "Presidenta",
  contactEyebrow: "Manténgase conectado", contactTitle: "¿Cómo podemos ayudarle?",
  contactLead: "Envíe una pregunta, solicite un sacramento, ofrézcase como voluntario o comparta una intención de oración. La oficina parroquial le responderá en horario de oficina.",
  cwCall: "Llame", cwEmail: "Escriba", cwMessenger: "Envíenos un mensaje en Facebook",
  giveTitle: "Apoye a su parroquia",
  giveBody: "Ofrende en la canasta semanal o apoye en línea la Campaña de Servicios Católicos (seleccione St. Michael).",
  giveCta: "Donar a la CSA",
  fType: "Me gustaría…", o1: "Hacer una pregunta general", o2: "Compartir una petición de oración",
  o3: "Preguntar sobre un sacramento", o4: "Ser voluntario (despensa, ministerios)", o5: "Registrarme en la parroquia",
  fName: "Nombre", fPhone: "Teléfono", fEmail: "Correo electrónico", fMsg: "Mensaje",
  fPrivate: "Mantener mi petición de oración en privado (no publicarla en el boletín)",
  fSend: "Enviar mensaje",
  ftLinks: "Recursos", ftBulletin: "Boletines semanales", ftReg: "Formulario de registro parroquial",
  ftMin: "Calendario de ministros y lectores", ftDio: "Diócesis de Reno", ftFollow: "Síganos",
  ftPrayer: "San Miguel Arcángel, defiéndenos en la batalla.",
  ftDioc: "Una parroquia de la Diócesis de Reno", toTop: "Volver arriba ↑",
};

/* Labels used by rendered pieces */
const L = {
  en: {
    mass: "Holy Mass", vigil: "Saturday Vigil Mass", communion: "Communion Service", confession: "Confession",
    adoration: "Eucharistic Adoration", pantry: "Food Pantry", office: "Parish Office open",
    tagEn: "EN", tagEs: "ES", none: "No scheduled services", today: "Today",
    firstFriday: "First Friday", ffMassEs: "First Friday Mass (Spanish)", pantryLong: "Food Pantry Distribution",
    pantryDesc: "With the Food Bank of Northern Nevada. All are welcome.", ffDesc: "Eucharistic Adoration 10 AM – 1 PM · Spanish Mass 7 PM",
    google: "Google Calendar", ics: "Download (.ics)", allDay: "All day", noEvents: "Nothing special on the calendar this day — see the weekly schedule above.",
    inMin: (m) => `in ${m} min`, inHrs: (h, m) => `in ${h} h ${m} min`, inDays: (d) => `in ${d} day${d > 1 ? "s" : ""}`,
    langName: { en: "English", es: "Spanish", all: "" },
    officeOpen: "Office open now", officeClosed: "Office closed now",
    formOk: "Your email app is opening with your message. If nothing opens, email " + PARISH_EMAIL + " or call (775) 972-7462.",
    formErr: "Please add your name and a message.",
    subjects: { general: "Question", prayer: "Prayer Request", sacrament: "Sacrament Inquiry", volunteer: "Volunteer", register: "Parish Registration" },
    privateLine: "Please keep this prayer request private.",
  },
  es: {
    mass: "Santa Misa", vigil: "Misa de Vigilia", communion: "Servicio de Comunión", confession: "Confesiones",
    adoration: "Adoración Eucarística", pantry: "Despensa de Alimentos", office: "Oficina parroquial abierta",
    tagEn: "EN", tagEs: "ES", none: "Sin servicios programados", today: "Hoy",
    firstFriday: "Primer Viernes", ffMassEs: "Misa de Primer Viernes (español)", pantryLong: "Reparto de la Despensa de Alimentos",
    pantryDesc: "Con el Food Bank of Northern Nevada. Todos son bienvenidos.", ffDesc: "Adoración Eucarística 10 AM – 1 PM · Misa en español 7 PM",
    google: "Google Calendar", ics: "Descargar (.ics)", allDay: "Todo el día", noEvents: "No hay eventos especiales este día — consulte el horario semanal arriba.",
    inMin: (m) => `en ${m} min`, inHrs: (h, m) => `en ${h} h ${m} min`, inDays: (d) => `en ${d} día${d > 1 ? "s" : ""}`,
    langName: { en: "inglés", es: "español", all: "" },
    officeOpen: "Oficina abierta ahora", officeClosed: "Oficina cerrada ahora",
    formOk: "Se está abriendo su aplicación de correo con su mensaje. Si no se abre, escriba a " + PARISH_EMAIL + " o llame al (775) 972-7462.",
    formErr: "Por favor escriba su nombre y un mensaje.",
    subjects: { general: "Pregunta", prayer: "Petición de oración", sacrament: "Consulta de sacramento", volunteer: "Voluntariado", register: "Registro parroquial" },
    privateLine: "Por favor mantenga esta petición de oración en privado.",
  },
};

/* =========================================================
   Language switch
   ========================================================= */
let lang = "en";
const EN = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

function setLang(next) {
  lang = next === "es" ? "es" : "en";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = lang === "es" ? ES[key] : EN[key];
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll(".lang-btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  document.title = lang === "es" ? "Iglesia Católica San Miguel · Reno, NV" : "St. Michael Catholic Church · Reno, NV";
  try { localStorage.setItem("stm-lang", lang); } catch (e) {}
  renderWeek(); renderCalendar(); updateNextMass(); updateOffice();
}
document.querySelectorAll(".lang-btn").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* =========================================================
   Helpers
   ========================================================= */
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const locale = () => (lang === "es" ? "es-US" : "en-US");
function fmtTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(locale(), { hour: "numeric", minute: "2-digit" });
}
function isFirstFriday(d) { return d.getDay() === 5 && d.getDate() <= 7; }
function atTime(date, hhmm) { const [h, m] = hhmm.split(":").map(Number); const d = new Date(date); d.setHours(h, m, 0, 0); return d; }
function addMinutes(hhmm, mins) { const [h, m] = hhmm.split(":").map(Number); const t = h * 60 + m + mins; return `${pad(Math.floor(t / 60) % 24)}:${pad(t % 60)}`; }

/* =========================================================
   Weekly schedule grid
   ========================================================= */
let filter = "all";
function serviceLabel(s) {
  const t = L[lang];
  return t[s.type] || s.type;
}
function renderWeek() {
  const grid = document.getElementById("weekGrid");
  if (!grid) return;
  const todayIdx = new Date().getDay();
  // Start on Sunday, the Lord's Day
  const order = [0, 1, 2, 3, 4, 5, 6];
  const ref = new Date(2026, 10, 8); // a Sunday, used only for weekday names
  grid.innerHTML = order.map((day) => {
    const name = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() + day).toLocaleDateString(locale(), { weekday: "long" });
    const items = SCHEDULE.filter((s) => s.day === day && s.type !== "office").sort((a, b) => a.start.localeCompare(b.start));
    const rows = items.map((s) => {
      const hide = filter !== "all" && s.lang !== "all" && s.lang !== filter;
      const end = s.end ? ` – ${fmtTime(s.end)}` : "";
      const tag = s.lang === "all" ? "" : `<em class="tag ${s.lang}">${s.lang.toUpperCase()}</em>`;
      return `<div class="svc${hide ? " hidden" : ""}"><time>${fmtTime(s.start)}${end}</time><span>${serviceLabel(s)}</span>${tag}</div>`;
    }).join("");
    const isToday = day === todayIdx;
    return `<div class="day${isToday ? " today" : ""}">
      <h3><span style="text-transform:capitalize">${name}</span>${isToday ? `<small>${L[lang].today}</small>` : ""}</h3>
      ${rows || `<p class="empty">${L[lang].none}</p>`}
    </div>`;
  }).join("");
}
document.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach((x) => x.classList.remove("active"));
  c.classList.add("active");
  filter = c.dataset.filter;
  renderWeek();
}));

/* =========================================================
   Next Mass countdown
   ========================================================= */
function massesOn(date) {
  const list = SCHEDULE.filter((s) => s.day === date.getDay() && (s.type === "mass" || s.type === "vigil"));
  if (isFirstFriday(date)) list.push(...FIRST_FRIDAY.filter((s) => s.type === "mass"));
  return list.map((s) => ({ ...s, at: atTime(date, s.start) }));
}
function updateNextMass() {
  const now = new Date();
  let next = null;
  for (let i = 0; i < 9 && !next; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    next = massesOn(d).filter((m) => m.at > now).sort((a, b) => a.at - b.at)[0] || null;
  }
  const whenEl = document.getElementById("nmWhen");
  const cdEl = document.getElementById("nmCountdown");
  if (!next || !whenEl) return;
  const t = L[lang];
  const day = next.at.toLocaleDateString(locale(), { weekday: "long" });
  const langTxt = t.langName[next.lang] ? ` · ${t.langName[next.lang]}` : "";
  whenEl.textContent = `${day[0].toUpperCase() + day.slice(1)}, ${fmtTime(next.start)}${langTxt}`;
  const mins = Math.round((next.at - now) / 60000);
  cdEl.textContent = mins < 60 ? t.inMin(mins) : mins < 1440 ? t.inHrs(Math.floor(mins / 60), mins % 60) : t.inDays(Math.floor(mins / 1440));
}

/* =========================================================
   Office open/closed indicator
   ========================================================= */
function updateOffice() {
  const el = document.getElementById("officeStatus");
  if (!el) return;
  const now = new Date();
  const hhmm = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const open = SCHEDULE.some((s) => s.type === "office" && s.day === now.getDay() && hhmm >= s.start && hhmm < s.end);
  el.classList.toggle("open", open);
  el.textContent = open ? L[lang].officeOpen : L[lang].officeClosed;
}

/* =========================================================
   Calendar
   ========================================================= */
let view = new Date(); view.setDate(1);
let selected = null;

function eventsOn(date) {
  const key = ymd(date);
  const t = L[lang];
  const out = [];
  EVENTS.forEach((e) => {
    const end = e.endDate || e.date;
    if (key >= e.date && key <= end) {
      out.push({ kind: "special", date: key, start: e.start, end: e.end, allDay: !e.start, title: e[lang].title, desc: e[lang].desc, multi: e.endDate ? e : null });
    }
  });
  if (isFirstFriday(date)) {
    out.push({ kind: "devotion", date: key, start: "10:00", end: "13:00", title: `${t.firstFriday}: ${t.adoration}`, desc: t.ffDesc });
    out.push({ kind: "devotion", date: key, start: "19:00", end: "20:00", title: t.ffMassEs, desc: t.ffDesc });
  }
  if (date.getDay() === 4) {
    out.push({ kind: "pantry", date: key, start: "13:00", end: "18:00", title: t.pantryLong, desc: t.pantryDesc });
  }
  return out;
}

function renderCalendar() {
  const grid = document.getElementById("calGrid");
  if (!grid) return;
  document.getElementById("calMonth").textContent = view.toLocaleDateString(locale(), { month: "long", year: "numeric" });
  const ref = new Date(2026, 10, 8);
  document.getElementById("calDow").innerHTML = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => `<div>${new Date(2026, 10, 8 + i).toLocaleDateString(locale(), { weekday: "short" }).replace(".", "")}</div>`).join("");

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const start = new Date(first); start.setDate(1 - first.getDay());
  const todayKey = ymd(new Date());
  let html = "";
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const evs = eventsOn(d);
    const kinds = [...new Set(evs.map((e) => e.kind))];
    const cls = ["cal-cell", d.getMonth() !== view.getMonth() ? "out" : "", ymd(d) === todayKey ? "today" : "", selected === ymd(d) ? "selected" : ""].join(" ");
    const label = d.toLocaleDateString(locale(), { weekday: "long", month: "long", day: "numeric" });
    html += `<button class="${cls}" data-date="${ymd(d)}" aria-label="${label}${evs.length ? ` (${evs.length})` : ""}">
      <span>${d.getDate()}</span><span class="dots">${kinds.map((k) => `<i class="dot ${k}"></i>`).join("")}</span></button>`;
  }
  grid.innerHTML = html;
  grid.querySelectorAll(".cal-cell").forEach((b) => b.addEventListener("click", () => { selected = b.dataset.date; renderCalendar(); }));
  renderEventPanel();
}

function renderEventPanel() {
  const list = document.getElementById("eventList");
  const title = document.getElementById("dayTitle");
  const t = L[lang];
  let items = [];
  if (selected) {
    const d = parseYmd(selected);
    title.textContent = d.toLocaleDateString(locale(), { weekday: "long", month: "long", day: "numeric" });
    title.style.textTransform = "capitalize";
    items = eventsOn(d);
    if (!items.length) { list.innerHTML = `<li class="event"><p>${t.noEvents}</p></li>`; return; }
  } else {
    title.textContent = lang === "es" ? ES.upcoming : EN.upcoming;
    // Next 5 items: special events first priority, plus upcoming pantry/first Friday
    const now = new Date();
    const seen = new Set();
    for (let i = 0; i < 60 && items.length < 5; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      eventsOn(d).forEach((e) => {
        const k = e.title + (e.multi ? "" : e.date);
        if (items.length < 5 && !seen.has(k) && !(e.kind === "pantry" && items.some((x) => x.kind === "pantry"))) { seen.add(k); items.push(e); }
      });
    }
  }
  list.innerHTML = items.map((e, i) => {
    const d = parseYmd(e.date);
    const dateTxt = e.multi
      ? `${parseYmd(e.multi.date).toLocaleDateString(locale(), { month: "short", day: "numeric" })} – ${parseYmd(e.multi.endDate).toLocaleDateString(locale(), { month: "short", day: "numeric" })}`
      : d.toLocaleDateString(locale(), { weekday: "short", month: "short", day: "numeric" });
    const timeTxt = e.allDay ? t.allDay : `${fmtTime(e.start)}${e.end ? " – " + fmtTime(e.end) : ""}`;
    return `<li class="event ${e.kind}">
      <span class="when">${dateTxt} · ${timeTxt}</span>
      <h4>${e.title}</h4>
      <p>${e.desc}</p>
      <div class="event-actions">
        <a href="${googleLink(e)}" target="_blank" rel="noopener">+ ${t.google}</a>
        <button type="button" data-ics="${i}">${t.ics}</button>
      </div>
    </li>`;
  }).join("");
  list.querySelectorAll("[data-ics]").forEach((b) => b.addEventListener("click", () => downloadIcs(items[+b.dataset.ics])));
}

document.getElementById("calPrev").addEventListener("click", () => { view.setMonth(view.getMonth() - 1); selected = null; renderCalendar(); });
document.getElementById("calNext").addEventListener("click", () => { view.setMonth(view.getMonth() + 1); selected = null; renderCalendar(); });

/* ---------- Add to calendar ---------- */
function eventRange(e) {
  const s = e.multi ? e.multi.date : e.date;
  const endDay = e.multi ? e.multi.endDate : e.date;
  if (e.allDay) {
    const after = parseYmd(endDay); after.setDate(after.getDate() + 1);
    return { allDay: true, start: s.replace(/-/g, ""), end: ymd(after).replace(/-/g, "") };
  }
  const end = e.end || addMinutes(e.start, 60);
  return { allDay: false, start: `${s.replace(/-/g, "")}T${e.start.replace(":", "")}00`, end: `${endDay.replace(/-/g, "")}T${end.replace(":", "")}00` };
}
function googleLink(e) {
  const r = eventRange(e);
  const p = new URLSearchParams({ action: "TEMPLATE", text: e.title, dates: `${r.start}/${r.end}`, details: e.desc, location: ADDRESS });
  if (!r.allDay) p.set("ctz", "America/Los_Angeles");
  return `https://calendar.google.com/calendar/render?${p}`;
}
function downloadIcs(e) {
  const r = eventRange(e);
  const esc = (s) => s.replace(/[,;\\]/g, (m) => "\\" + m);
  const dt = r.allDay ? `DTSTART;VALUE=DATE:${r.start}\r\nDTEND;VALUE=DATE:${r.end}` : `DTSTART;TZID=America/Los_Angeles:${r.start}\r\nDTEND;TZID=America/Los_Angeles:${r.end}`;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//St Michael Reno//Parish Calendar//EN", "BEGIN:VEVENT",
    `UID:${r.start}-${Math.random().toString(36).slice(2)}@stmichaelreno.org`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    dt, `SUMMARY:${esc(e.title)}`, `DESCRIPTION:${esc(e.desc)}`, `LOCATION:${esc(ADDRESS)}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "st-michael-event.ics";
  document.body.appendChild(a); a.click(); a.remove();
}

/* =========================================================
   Contact / prayer form → opens the visitor's email app
   (swap for Formspree / Supabase later if the parish wants
   messages delivered without an email app)
   ========================================================= */
const form = document.getElementById("contactForm");
const typeSel = document.getElementById("fType");
const privateRow = document.getElementById("fPrivate").closest("label");
function syncPrivate() { privateRow.hidden = typeSel.value !== "prayer"; }
typeSel.addEventListener("change", syncPrivate); syncPrivate();

document.querySelectorAll("[data-prayer]").forEach((a) => a.addEventListener("click", () => { typeSel.value = "prayer"; syncPrivate(); }));
document.querySelectorAll("[data-volunteer]").forEach((a) => a.addEventListener("click", () => { typeSel.value = "volunteer"; syncPrivate(); }));

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const t = L[lang];
  const data = new FormData(form);
  const msg = document.getElementById("formMsg");
  if (!data.get("name").trim() || !data.get("message").trim()) { msg.textContent = t.formErr; return; }
  const subject = `${t.subjects[data.get("type")]} — ${data.get("name")}`;
  const body = [
    data.get("message"), "",
    data.get("type") === "prayer" && data.get("private") ? t.privateLine : "",
    `— ${data.get("name")}`,
    data.get("phone") ? `${lang === "es" ? "Tel" : "Phone"}: ${data.get("phone")}` : "",
    data.get("email") ? `Email: ${data.get("email")}` : "",
    `(${lang === "es" ? "Enviado desde el sitio web · Español" : "Sent from the website · English"})`,
  ].filter(Boolean).join("\n");
  window.location.href = `mailto:${PARISH_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  msg.textContent = t.formOk;
});

/* =========================================================
   Mobile menu, reveal animations, init
   ========================================================= */
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".section-head, .card, .person, .pantry-banner, .icon-frame, .visit-photo, .note-card").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

document.getElementById("year").textContent = new Date().getFullYear();

let saved = null;
try { saved = localStorage.getItem("stm-lang"); } catch (e) {}
if (!saved && (navigator.language || "").toLowerCase().startsWith("es")) saved = "es";
setLang(saved || "en");
setInterval(() => { updateNextMass(); updateOffice(); }, 60000);
