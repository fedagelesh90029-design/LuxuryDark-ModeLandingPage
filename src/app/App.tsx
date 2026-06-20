import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const GOLD = "#C6A86B";

const heroSlides = [
  {
    url: "https://images.unsplash.com/photo-1717857539947-9db9a70d9fe5?w=1920&h=1080&fit=crop&auto=format",
    alt: "Чёрный металлический забор перед зданием",
  },
  {
    url: "https://images.unsplash.com/flagged/photo-1479802378300-8575687266bf?w=1920&h=1080&fit=crop&auto=format",
    alt: "Элегантный металлический забор у дороги",
  },
  {
    url: "https://images.unsplash.com/photo-1649657858673-50802c2eae9f?w=1920&h=1080&fit=crop&auto=format",
    alt: "Роскошная беседка с освещением вечером",
  },
  {
    url: "https://images.unsplash.com/photo-1757439402342-976f4e0733ec?w=1920&h=1080&fit=crop&auto=format",
    alt: "Открытая зона с навесом ночью",
  },
];

const catalogModels = [
  {
    name: "Лаконичный минимализм",
    category: "Заборы",
    img: "https://images.unsplash.com/photo-1717857539947-9db9a70d9fe5?w=600&h=400&fit=crop&auto=format",
    tags: ["Глухой"],
    price: "от 8 900 ₽/п.м.",
  },
  {
    name: "Ритм горизонталей",
    category: "Заборы",
    img: "https://images.unsplash.com/flagged/photo-1479802378300-8575687266bf?w=600&h=400&fit=crop&auto=format",
    tags: ["Полузакрытый"],
    price: "от 11 200 ₽/п.м.",
  },
  {
    name: "Японский сад",
    category: "Заборы",
    img: "https://images.unsplash.com/photo-1755853949781-16d2cc547757?w=600&h=400&fit=crop&auto=format",
    tags: ["Открытый"],
    price: "от 9 500 ₽/п.м.",
  },
  {
    name: "Садовая комната",
    category: "Навесы",
    img: "https://images.unsplash.com/photo-1644491629308-95a9084733ac?w=600&h=400&fit=crop&auto=format",
    tags: ["Пристенный"],
    price: "от 185 000 ₽",
  },
  {
    name: "Стеклянный павильон",
    category: "Навесы",
    img: "https://images.unsplash.com/photo-1649657858673-50802c2eae9f?w=600&h=400&fit=crop&auto=format",
    tags: ["Отдельностоящий"],
    price: "от 320 000 ₽",
  },
  {
    name: "Брутальный металл",
    category: "Заборы",
    img: "https://images.unsplash.com/photo-1611072337226-1140ab367200?w=600&h=400&fit=crop&auto=format",
    tags: ["Глухой"],
    price: "от 14 900 ₽/п.м.",
  },
  {
    name: "Лесной периметр",
    category: "Заборы",
    img: "https://images.unsplash.com/photo-1619976553860-b7ffbe9a093b?w=600&h=400&fit=crop&auto=format",
    tags: ["Полузакрытый"],
    price: "от 7 800 ₽/п.м.",
  },
  {
    name: "Пергола Nord",
    category: "Навесы",
    img: "https://images.unsplash.com/photo-1757439402342-976f4e0733ec?w=600&h=400&fit=crop&auto=format",
    tags: ["Пергола"],
    price: "от 210 000 ₽",
  },
];

const constructionTypes = [
  { id: "shtaketnık", label: "Штакетник", sub: "вертикальный / горизонтальный" },
  { id: "zhalyuzi", label: "Жалюзи", sub: "регулируемые ламели" },
  { id: "rancho", label: "Ранчо", sub: "горизонтальные доски с зазором" },
  { id: "glass", label: "Стеклянные панели", sub: "прозрачные / тонированные" },
  { id: "composite", label: "Композитный щит", sub: "глухой" },
];

const materialOptions = [
  { id: "alu", label: "Алюминий", sub: "порошковая покраска", color: "#888" },
  { id: "wood", label: "Термодерево", sub: "ясень, дуб, тик", color: "#7C5C2E" },
  { id: "corten", label: "Кортеновская сталь", sub: "ржавый эффект", color: "#8B4A2A" },
  { id: "glass", label: "Стекло", sub: "триплекс", color: "#4a7a8a" },
  { id: "composite", label: "Композит", sub: "древесно-полимерный", color: "#4a4a40" },
];

const colorPresets = [
  { label: "Чёрный глубокий матовый", value: "#111111" },
  { label: "Антрацит", value: "#3a3a3a" },
  { label: "Графит", value: "#555" },
  { label: "Шампань металлик", value: "#c8b89a" },
  { label: "Бронза", value: "#8B6914" },
  { label: "Патинированная медь", value: "#7a9a7a" },
];

const slatTypes = ["Широкая (150мм)", "Узкая (80мм)", "Комбинированная"];
const topEdgeOptions = ["Прямой срез", "Арочный", "Волна", "Со стеклянной вставкой сверху"];
const lightingOptions = ["Без подсветки", "LED по верхнему краю", "Встроенные столбы"];

const canopyStyles = [
  {
    name: "Пристенный навес",
    sub: "Плоская кровля",
    img: "https://images.unsplash.com/photo-1644491629308-95a9084733ac?w=400&h=260&fit=crop&auto=format",
  },
  {
    name: "Арочный навес",
    sub: "Поликарбонат",
    img: "https://images.unsplash.com/photo-1570596649822-69c52927bf5b?w=400&h=260&fit=crop&auto=format",
  },
  {
    name: "Пергола с тентом",
    sub: "Раздвижной тент",
    img: "https://images.unsplash.com/photo-1649657858673-50802c2eae9f?w=400&h=260&fit=crop&auto=format",
  },
  {
    name: "Стеклянный козырек",
    sub: "На пилонах",
    img: "https://images.unsplash.com/photo-1757439402342-976f4e0733ec?w=400&h=260&fit=crop&auto=format",
  },
  {
    name: "Отдельностоящий павильон",
    sub: "Автономная конструкция",
    img: "https://images.unsplash.com/photo-1611072337226-1140ab367200?w=400&h=260&fit=crop&auto=format",
  },
  {
    name: "Терраса с барбекю-зоной",
    sub: "Комплексное решение",
    img: "https://images.unsplash.com/photo-1619976553860-b7ffbe9a093b?w=400&h=260&fit=crop&auto=format",
  },
];

const portfolioItems = [
  {
    url: "https://images.unsplash.com/photo-1717857539947-9db9a70d9fe5?w=800&h=600&fit=crop&auto=format",
    label: "Кортен в пейзаже",
    sub: "Ограждение по периметру",
    cat: "Заборы",
    size: "wide",
  },
  {
    url: "https://images.unsplash.com/photo-1755853949781-16d2cc547757?w=500&h=700&fit=crop&auto=format",
    label: "Чёрный алюминий",
    sub: "Лазерная резка",
    cat: "Ворота",
    size: "tall",
  },
  {
    url: "https://images.unsplash.com/photo-1611072337226-1140ab367200?w=500&h=400&fit=crop&auto=format",
    label: "Кедровое дерево",
    sub: "Скрытые крепления",
    cat: "Фурнитура",
    size: "square",
  },
  {
    url: "https://images.unsplash.com/photo-1649657858673-50802c2eae9f?w=500&h=400&fit=crop&auto=format",
    label: "Стеклянный навес",
    sub: "LED подсветка",
    cat: "Навесы",
    size: "square",
  },
  {
    url: "https://images.unsplash.com/photo-1619976553860-b7ffbe9a093b?w=800&h=400&fit=crop&auto=format",
    label: "Лесной периметр",
    sub: "Панорамный вид",
    cat: "Заборы",
    size: "wide",
  },
  {
    url: "https://images.unsplash.com/photo-1757439402342-976f4e0733ec?w=500&h=400&fit=crop&auto=format",
    label: "Пергола с подсветкой",
    sub: "Вечернее освещение",
    cat: "Перголы",
    size: "square",
  },
];

const portfolioFilters = ["Все", "Заборы", "Навесы", "Ворота", "Перголы", "Фурнитура"];

// ─── Utility Components ───────────────────────────────────────────────────────

function GoldSlider({
  min, max, step, value, onChange, label, display,
}: {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; label: string; display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <span style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ color: GOLD, fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 300 }}>
          {display}
        </span>
      </div>
      <div className="relative" style={{ height: 2, background: "#222", borderRadius: 1 }}>
        <div className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, #4a3010, ${GOLD})`, transition: "width 0.05s" }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer"
          style={{ height: 20, top: -9, left: 0 }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
          style={{
            left: `calc(${pct}% - 7px)`,
            background: GOLD,
            boxShadow: `0 0 10px rgba(198,168,107,0.7), 0 0 24px rgba(198,168,107,0.3)`,
            transition: "left 0.05s",
          }} />
      </div>
    </div>
  );
}

function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border ${className}`}
      style={{ background: "rgba(20,20,20,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: "#2a2a2a" }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="h-px w-10" style={{ background: GOLD }} />
      <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

// ─── Fence SVG Preview ────────────────────────────────────────────────────────

function FencePreview({ construction, material, height, colorIdx, transparency }: {
  construction: string; material: string; height: number; colorIdx: number; transparency: number;
}) {
  const fc = colorPresets[colorIdx].value;
  const hr = (height - 0.8) / 2.7;
  const svgH = 120 + hr * 100;
  const totalW = 360;
  const railY1 = 18;
  const railY2 = svgH - 8;
  const innerH = railY2 - railY1 - 10;
  const solidOpacity = 0.15 + (1 - transparency / 100) * 0.85;

  let bars: React.ReactNode = null;

  if (construction === "shtaketnık" || construction === "shtaketnik") {
    const count = material === "wood" ? 9 : 14;
    const bw = material === "wood" ? 28 : 7;
    bars = Array.from({ length: count }).map((_, i) => {
      const x = 12 + (i * (totalW - 24)) / count + (count > 10 ? 2 : 4);
      return (
        <g key={i}>
          <rect x={x} y={railY1 + 5} width={bw} height={innerH} fill={fc} opacity={solidOpacity * 0.95} rx={1} />
          {material === "wood" && (
            <line x1={x + bw * 0.4} y1={railY1 + 8} x2={x + bw * 0.38} y2={railY2 - 5} stroke="#00000025" strokeWidth={0.7} />
          )}
        </g>
      );
    });
  } else if (construction === "zhalyuzi") {
    const rows = 8;
    bars = Array.from({ length: rows }).map((_, i) => {
      const slotH = innerH / rows;
      const y = railY1 + 5 + i * slotH;
      const tilt = (transparency / 100) * 8;
      return (
        <g key={i}>
          <rect x={12} y={y + tilt} width={totalW - 24} height={slotH - 3 - tilt * 2}
            fill={fc} opacity={solidOpacity} rx={0.5} />
        </g>
      );
    });
  } else if (construction === "rancho") {
    const rows = 5;
    bars = Array.from({ length: rows }).map((_, i) => {
      const slotH = innerH / rows;
      const gap = (transparency / 100) * 12;
      const y = railY1 + 5 + i * slotH + gap / 2;
      return (
        <g key={i}>
          <rect x={12} y={y} width={totalW - 24} height={slotH - 3 - gap}
            fill={fc} opacity={solidOpacity} rx={1} />
          {material === "wood" && (
            <line x1={14} y1={y + (slotH - gap) * 0.5} x2={totalW - 2} y2={y + (slotH - gap) * 0.5}
              stroke="#ffffff08" strokeWidth={0.5} />
          )}
        </g>
      );
    });
  } else if (construction === "glass") {
    const panels = 3;
    const pw = (totalW - 36) / panels;
    bars = Array.from({ length: panels }).map((_, i) => {
      const x = 14 + i * (pw + 8);
      return (
        <g key={i}>
          <rect x={x} y={railY1 + 5} width={pw} height={innerH}
            fill={fc} opacity={Math.max(0.04, (1 - transparency / 100) * 0.15)} rx={2} />
          <rect x={x} y={railY1 + 5} width={pw} height={innerH}
            fill="none" stroke={fc} strokeWidth={0.8} strokeOpacity={0.3} rx={2} />
          <line x1={x + pw * 0.2} y1={railY1 + 10} x2={x + pw * 0.12} y2={railY2 - 6}
            stroke="#ffffff18" strokeWidth={1.5} />
        </g>
      );
    });
  } else {
    // Composite — solid panel with subtle texture lines
    bars = (
      <g>
        <rect x={12} y={railY1 + 5} width={totalW - 24} height={innerH}
          fill={fc} opacity={solidOpacity} rx={1} />
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i}
            x1={14} y1={railY1 + 8 + i * (innerH / 4)}
            x2={totalW - 2} y2={railY1 + 8 + i * (innerH / 4)}
            stroke="#ffffff06" strokeWidth={0.6} />
        ))}
      </g>
    );
  }

  const mat = materialOptions.find((m) => m.id === material);

  return (
    <div className="relative w-full h-full bg-[#080808] rounded-xl overflow-hidden flex items-end">
      <div className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 20%, #151515 0%, #050505 70%)" }} />
      <svg viewBox={`0 0 400 ${svgH + 55}`} className="w-full relative z-10">
        <rect x={0} y={svgH + 14} width={400} height={42} fill="#101010" />
        <rect x={0} y={svgH + 14} width={400} height={2} fill={GOLD} opacity={0.12} />
        {/* Landscape suggestion */}
        <ellipse cx={80} cy={svgH + 14} rx={60} ry={12} fill="#141a12" opacity={0.8} />
        <ellipse cx={310} cy={svgH + 14} rx={45} ry={9} fill="#141a12" opacity={0.6} />

        <rect x={10} y={railY1} width={totalW} height={7} fill={fc} rx={2} opacity={0.96} />
        <rect x={10} y={railY2} width={totalW} height={7} fill={fc} rx={2} opacity={0.96} />
        {bars}
        <rect x={6} y={10} width={11} height={svgH + 6} fill={fc} rx={2} opacity={0.98} />
        <rect x={383} y={10} width={11} height={svgH + 6} fill={fc} rx={2} opacity={0.98} />
        <rect x={3} y={8} width={17} height={5} fill={GOLD} rx={1} opacity={0.55} />
        <rect x={380} y={8} width={17} height={5} fill={GOLD} rx={1} opacity={0.55} />

        {/* Height ruler */}
        <line x1={396} y1={railY1} x2={396} y2={railY2 + 7} stroke={GOLD} strokeWidth={0.8}
          strokeDasharray="3 2" opacity={0.45} />
        <text x={399} y={(railY1 + railY2) / 2 + 4} fill={GOLD} fontSize={9}
          fontFamily="JetBrains Mono, monospace" opacity={0.65}>{height.toFixed(1)}м</text>
      </svg>

      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full border border-current opacity-60"
          style={{ background: mat?.color || fc, borderColor: GOLD }} />
        <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.6 }}>
          {mat?.label}
        </span>
      </div>
    </div>
  );
}

// ─── Canopy Top-Down View ─────────────────────────────────────────────────────

function CanopyTopView({ width, depth, type }: { width: number; depth: number; type: string }) {
  const vw = 300;
  const vh = 240;
  const scale = Math.min((vw - 70) / width, (vh - 70) / depth, 36);
  const rw = width * scale;
  const rd = depth * scale;
  const ox = (vw - rw) / 2;
  const oy = (vh - rd) / 2;
  const isPergola = type.includes("Пергола") || type.includes("тент");
  const isGlass = type.includes("Стекл") || type.includes("козырек");
  const isAttached = type.includes("Пристен");
  const beamCount = Math.ceil(width / 1.5);

  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full h-full">
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 20} x2={vw} y2={i * 20} stroke="#ffffff05" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={vh} stroke="#ffffff05" strokeWidth={0.5} />
      ))}
      {isAttached && <rect x={ox - 10} y={oy} width={10} height={rd} fill="#2a2a2a" rx={1} />}
      <rect x={ox + 4} y={oy + 4} width={rw} height={rd} fill="#000" opacity={0.45} rx={3} />
      <rect x={ox} y={oy} width={rw} height={rd}
        fill={isGlass ? "rgba(198,168,107,0.04)" : "#181818"} stroke={GOLD} strokeWidth={1.5} rx={3} />
      {isPergola && Array.from({ length: beamCount + 1 }).map((_, i) => (
        <line key={`b${i}`} x1={ox + (i * rw) / beamCount} y1={oy}
          x2={ox + (i * rw) / beamCount} y2={oy + rd} stroke={GOLD} strokeWidth={1.5} opacity={0.4} />
      ))}
      {isGlass && (
        <line x1={ox + rw * 0.2} y1={oy + 4} x2={ox + rw * 0.12} y2={oy + rd - 4}
          stroke="#ffffff" strokeWidth={2} opacity={0.05} />
      )}
      {[[ox, oy], [ox + rw, oy], [ox, oy + rd], [ox + rw, oy + rd]].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={4.5} fill={GOLD} opacity={0.9} />
      ))}
      <text x={ox + rw / 2} y={oy - 10} fill={GOLD} fontSize={10}
        fontFamily="JetBrains Mono, monospace" textAnchor="middle" opacity={0.75}>{width.toFixed(1)} м</text>
      <text x={ox + rw + 12} y={oy + rd / 2 + 4} fill={GOLD} fontSize={10}
        fontFamily="JetBrains Mono, monospace" textAnchor="start" opacity={0.75}>{depth.toFixed(1)} м</text>
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Готовые решения", "Конструктор", "Навесы", "Портфолио", "Контакты"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(198,168,107,0.08)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: GOLD }}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="2" y="2" width="4" height="12" fill={GOLD} />
              <rect x="10" y="2" width="4" height="12" fill={GOLD} />
              <rect x="2" y="7" width="12" height="2" fill={GOLD} />
            </svg>
          </div>
          <span style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: 16, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Ограда
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <button key={item}
              className="transition-colors duration-200"
              style={{ color: "rgba(232,226,217,0.55)", fontFamily: "Inter, sans-serif", fontSize: 12, letterSpacing: "0.12em", fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,226,217,0.55)")}>
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          className="hidden lg:block transition-all duration-300"
          style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px 22px" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0C0C0C"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}>
          Заказать звонок
        </button>
      </div>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {heroSlides.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0 }}>
          <img src={s.url} alt={s.alt} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.65) 50%, rgba(12,12,12,0.92) 100%)" }} />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-16" style={{ background: GOLD }} />
          <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Премиум ограждения — с 2008
          </span>
          <div className="h-px w-16" style={{ background: GOLD }} />
        </div>

        <h1 className="mb-7"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 0.95, color: GOLD, letterSpacing: "-0.01em" }}>
          Искусство
          <br />
          <span style={{ fontStyle: "italic" }}>ограждения</span> и уюта
        </h1>

        <p className="mb-10 max-w-xl"
          style={{ color: "rgba(232,226,217,0.7)", fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.7 }}>
          Создайте ваш идеальный забор или навес
          <br />в нашем 3D-конфигураторе
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="transition-all duration-300"
            style={{ border: "1px solid rgba(232,226,217,0.25)", color: "rgba(232,226,217,0.7)", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,226,217,0.55)"; e.currentTarget.style.color = "#E8E2D9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,226,217,0.25)"; e.currentTarget.style.color = "rgba(232,226,217,0.7)"; }}>
            Смотреть модели
          </button>
          <button className="transition-all duration-300"
            style={{ background: GOLD, color: "#0C0C0C", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", fontWeight: 600, boxShadow: `0 0 24px rgba(198,168,107,0.3)` }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 40px rgba(198,168,107,0.55)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 24px rgba(198,168,107,0.3)`; }}>
            Создать свой проект
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} className="transition-all duration-300"
            style={{ width: i === slide ? 28 : 5, height: 2, background: i === slide ? GOLD : "rgba(255,255,255,0.2)", borderRadius: 1 }} />
        ))}
      </div>

      <div className="absolute bottom-10 right-10 z-20"
        style={{ color: "rgba(198,168,107,0.45)", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>
        0{slide + 1} / 0{heroSlides.length}
      </div>
    </section>
  );
}

// ─── Catalog Section ──────────────────────────────────────────────────────────

function CatalogSection() {
  return (
    <section className="py-24" style={{ background: "#0C0C0C" }}>
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto">
        <SectionLabel>Готовые решения</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8E2D9", lineHeight: 1.1 }}>
            Выберите готовый стиль
          </h2>
          <p className="max-w-sm" style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.7 }}>
            Проверенные архитектурные решения, которые мы адаптируем под ваш участок
          </p>
        </div>
      </div>

      {/* Scrollable card row */}
      <div className="px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1400px] mx-auto">
          {catalogModels.map((model) => (
            <CatalogCard key={model.name} model={model} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-14 px-8">
        <button className="transition-all duration-300 flex items-center gap-3"
          style={{ border: `1px solid rgba(198,168,107,0.25)`, color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 12, letterSpacing: "0.14em", padding: "14px 32px" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = `0 0 20px rgba(198,168,107,0.15)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(198,168,107,0.25)"; e.currentTarget.style.boxShadow = "none"; }}>
          Не нашли подходящее? Соберите своё в конструкторе →
        </button>
      </div>
    </section>
  );
}

function CatalogCard({ model }: { model: typeof catalogModels[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col cursor-pointer transition-all duration-300"
      style={{
        background: "#141414",
        borderRadius: 10,
        border: `1px solid ${hovered ? "rgba(198,168,107,0.35)" : "#222"}`,
        boxShadow: hovered ? `0 0 20px rgba(198,168,107,0.08), inset 0 0 30px rgba(0,0,0,0.3)` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden" style={{ borderRadius: "10px 10px 0 0", aspectRatio: "4/3", background: "#111" }}>
        <img src={model.img} alt={model.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.1) 50%)" }} />
        {/* Category badge */}
        <div className="absolute top-3 left-3"
          style={{ background: "rgba(198,168,107,0.15)", border: `1px solid rgba(198,168,107,0.3)`, borderRadius: 3, padding: "3px 8px" }}>
          <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {model.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <p style={{ color: "#E8E2D9", fontFamily: "Cormorant Garamond, serif", fontSize: 15, fontWeight: 400 }}>
          {model.name}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {model.tags.map((tag) => (
            <span key={tag} style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, background: "#1e1e1e", borderRadius: 3, padding: "3px 7px", letterSpacing: "0.05em" }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: 14, fontWeight: 300 }}>
            {model.price}
          </span>
          <span className="transition-colors duration-200"
            style={{ color: "rgba(198,168,107,0.5)", fontFamily: "Inter, sans-serif", fontSize: 11 }}>
            Подробнее →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Customizer Section ───────────────────────────────────────────────────────

function CustomizerSection() {
  const [activeTab, setActiveTab] = useState("Забор");
  const [construction, setConstruction] = useState("shtaketnık");
  const [material, setMaterial] = useState("alu");
  const [height, setHeight] = useState(2.2);
  const [colorIdx, setColorIdx] = useState(1);
  const [transparency, setTransparency] = useState(25);
  const [slatType, setSlatType] = useState(0);
  const [topEdge, setTopEdge] = useState(0);
  const [lighting, setLighting] = useState(0);

  const tabs = ["Забор", "Ворота", "Калитка"];

  const basePrices: Record<string, number> = { alu: 14500, wood: 11000, corten: 17000, glass: 22000, composite: 13500 };
  const hMult = 0.7 + ((height - 0.8) / 2.7) * 0.6;
  const price = Math.ceil((basePrices[material] * hMult * (colorIdx >= 3 ? 1.2 : 1)) / 500) * 500;

  const mat = materialOptions.find((m) => m.id === material);
  const configSummary = `${mat?.label}, высота ${height.toFixed(1)}м, ${colorPresets[colorIdx].label.toLowerCase()}`;

  return (
    <section style={{ background: "#121212", minHeight: "100vh" }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-24 pb-6">
        <SectionLabel>Конструктор</SectionLabel>
        <h2 className="mb-10"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8E2D9" }}>
          Конструктор забора
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-[2fr_3fr] gap-6 pb-28">
        {/* Left — Controls (40%) */}
        <GlassPanel className="flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "#222" }}>
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 py-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  color: activeTab === tab ? GOLD : "#6b6b6b",
                  fontFamily: "Inter, sans-serif",
                  borderBottom: `2px solid ${activeTab === tab ? GOLD : "transparent"}`,
                  background: "transparent",
                  marginBottom: -1,
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Controls scroll area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6"
            style={{ maxHeight: "calc(100vh - 280px)" }}>

            {/* Construction type */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Тип конструкции
              </p>
              <div className="flex flex-col gap-2">
                {constructionTypes.map((ct) => (
                  <button key={ct.id} onClick={() => setConstruction(ct.id)}
                    className="flex items-center gap-3 px-4 py-3 text-left transition-all duration-200"
                    style={{
                      border: `1px solid ${construction === ct.id ? GOLD : "rgba(255,255,255,0.06)"}`,
                      background: construction === ct.id ? "rgba(198,168,107,0.05)" : "transparent",
                      borderRadius: 6,
                    }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: construction === ct.id ? GOLD : "#333" }} />
                    <div>
                      <p style={{ color: construction === ct.id ? GOLD : "rgba(232,226,217,0.6)", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
                        {ct.label}
                      </p>
                      <p style={{ color: "#4a4a4a", fontFamily: "Inter, sans-serif", fontSize: 10 }}>
                        {ct.sub}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(198,168,107,0.08)" }} />

            {/* Material */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Материал
              </p>
              <div className="flex flex-col gap-2">
                {materialOptions.map((m) => (
                  <button key={m.id} onClick={() => setMaterial(m.id)}
                    className="flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200"
                    style={{
                      border: `1px solid ${material === m.id ? GOLD : "rgba(255,255,255,0.06)"}`,
                      background: material === m.id ? "rgba(198,168,107,0.05)" : "transparent",
                      borderRadius: 6,
                    }}>
                    <div className="w-5 h-5 rounded flex-shrink-0"
                      style={{ background: m.color, border: material === m.id ? `1.5px solid ${GOLD}` : "1px solid #333" }} />
                    <div>
                      <p style={{ color: material === m.id ? GOLD : "rgba(232,226,217,0.6)", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
                        {m.label}
                      </p>
                      <p style={{ color: "#4a4a4a", fontFamily: "Inter, sans-serif", fontSize: 10 }}>{m.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(198,168,107,0.08)" }} />

            {/* Height slider */}
            <GoldSlider min={0.8} max={3.5} step={0.1} value={height} onChange={setHeight}
              label="Высота" display={`${height.toFixed(1)} м`} />

            <div className="h-px" style={{ background: "rgba(198,168,107,0.08)" }} />

            {/* Color */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Цвет
              </p>
              <div className="flex flex-wrap gap-2.5 mb-2">
                {colorPresets.map((c, i) => (
                  <button key={c.label} onClick={() => setColorIdx(i)} title={c.label}
                    className="transition-all duration-200"
                    style={{
                      width: 36, height: 36, background: c.value,
                      border: `2px solid ${i === colorIdx ? GOLD : "transparent"}`,
                      borderRadius: 4,
                      boxShadow: i === colorIdx ? `0 0 12px rgba(198,168,107,0.4)` : "none",
                    }} />
                ))}
              </div>
              <p style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 11, opacity: 0.65 }}>
                {colorPresets[colorIdx].label}
              </p>
            </div>

            <div className="h-px" style={{ background: "rgba(198,168,107,0.08)" }} />

            {/* Transparency */}
            <GoldSlider min={0} max={100} step={5} value={transparency} onChange={setTransparency}
              label="Заполнение / Прозрачность"
              display={transparency <= 15 ? "Панорамный" : transparency >= 85 ? "Глухой" : `${transparency}%`} />

            <div className="h-px" style={{ background: "rgba(198,168,107,0.08)" }} />

            {/* Slat type */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Тип ламелей
              </p>
              <div className="flex gap-2">
                {slatTypes.map((s, i) => (
                  <button key={s} onClick={() => setSlatType(i)}
                    className="flex-1 py-2.5 text-[10px] transition-all duration-200"
                    style={{
                      border: `1px solid ${slatType === i ? GOLD : "rgba(255,255,255,0.06)"}`,
                      color: slatType === i ? GOLD : "#6b6b6b",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.08em",
                      borderRadius: 4,
                      background: slatType === i ? "rgba(198,168,107,0.05)" : "transparent",
                    }}>
                    {s.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Top edge */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Декор верхнего края
              </p>
              <div className="grid grid-cols-2 gap-2">
                {topEdgeOptions.map((opt, i) => (
                  <button key={opt} onClick={() => setTopEdge(i)}
                    className="py-2.5 px-3 text-[10px] text-left transition-all duration-200"
                    style={{
                      border: `1px solid ${topEdge === i ? GOLD : "rgba(255,255,255,0.06)"}`,
                      color: topEdge === i ? GOLD : "#6b6b6b",
                      fontFamily: "Inter, sans-serif",
                      borderRadius: 4,
                      background: topEdge === i ? "rgba(198,168,107,0.05)" : "transparent",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting */}
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                Встроенное освещение
              </p>
              <div className="flex flex-col gap-2">
                {lightingOptions.map((opt, i) => (
                  <button key={opt} onClick={() => setLighting(i)}
                    className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200"
                    style={{
                      border: `1px solid ${lighting === i ? GOLD : "rgba(255,255,255,0.06)"}`,
                      background: lighting === i ? "rgba(198,168,107,0.05)" : "transparent",
                      borderRadius: 6,
                    }}>
                    <div className="w-1.5 h-1.5 rounded-full"
                      style={{ background: lighting === i ? GOLD : "#333" }} />
                    <span style={{ color: lighting === i ? GOLD : "rgba(232,226,217,0.5)", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Right — Preview (60%) */}
        <div className="flex flex-col gap-4">
          <div className="relative flex-1" style={{ minHeight: 460 }}>
            <FencePreview
              construction={construction} material={material}
              height={height} colorIdx={colorIdx} transparency={transparency} />
            {/* Refresh hint */}
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-40">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7A5 5 0 0 1 2.5 10" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2 7A5 5 0 0 1 11.5 4" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2 4l.5 3L5 6" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.14em" }}>
                Обновить 3D-вид
              </span>
            </div>
          </div>

          {/* Sticky bottom bar */}
          <div className="rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ background: "rgba(20,20,20,0.9)", border: `1px solid rgba(198,168,107,0.12)`, backdropFilter: "blur(12px)" }}>
            <div>
              <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>
                Выбранная конфигурация
              </p>
              <p className="capitalize" style={{ color: "rgba(232,226,217,0.75)", fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.5 }}>
                Забор из {configSummary}
              </p>
              <p className="mt-1" style={{ color: "#4a4a4a", fontFamily: "Inter, sans-serif", fontSize: 10 }}>
                Индивидуальный проект в подарок при заказе от 50 метров
              </p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div>
                <p style={{ color: "#6b6b6b", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.14em" }}>
                  Итоговая стоимость
                </p>
                <p className="transition-all duration-500"
                  style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 300 }}>
                  от {price.toLocaleString("ru-RU")} ₽<span style={{ fontSize: 13, opacity: 0.65 }}>/п.м.</span>
                </p>
              </div>
              <button className="transition-all duration-300 flex-shrink-0"
                style={{ background: GOLD, color: "#0C0C0C", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "13px 22px", fontWeight: 600, borderRadius: 4 }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 28px rgba(198,168,107,0.4)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
                Получить расчёт
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Canopy Section ───────────────────────────────────────────────────────────

function CanopySection() {
  const [selected, setSelected] = useState(0);
  const [width, setWidth] = useState(4.5);
  const [depth, setDepth] = useState(3.0);

  const basePriceMin = 150000 + width * depth * 8000;
  const basePriceMax = 150000 + width * depth * 18000;

  return (
    <section className="py-24" style={{ background: "#0C0C0C" }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 mb-14">
        <SectionLabel>Навесы</SectionLabel>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8E2D9" }}>
          Навесы <span style={{ fontStyle: "italic", color: GOLD }}>премиум-класса</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-0 min-h-[680px]">
        {/* Left — catalog grid */}
        <div className="px-8 lg:px-16 pb-10 lg:pb-0">
          <div className="grid grid-cols-2 gap-3">
            {canopyStyles.map((cs, i) => (
              <button key={cs.name} onClick={() => setSelected(i)}
                className="relative overflow-hidden text-left group transition-all duration-300"
                style={{
                  borderRadius: 8,
                  border: `1px solid ${i === selected ? GOLD : "rgba(198,168,107,0.1)"}`,
                  background: i === selected ? "rgba(198,168,107,0.04)" : "transparent",
                }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", background: "#111" }}>
                  <img src={cs.img} alt={cs.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: i === selected ? "scale(1.05)" : "scale(1)" }} />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(12,12,12,0.9) 0%, rgba(12,12,12,0.15) 60%)" }} />
                  {i === selected && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
                      style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                  )}
                </div>
                <div className="p-3">
                  <p style={{ color: i === selected ? GOLD : "#E8E2D9", fontFamily: "Cormorant Garamond, serif", fontSize: 13, fontWeight: 400 }}>
                    {cs.name}
                  </p>
                  <p style={{ color: "#555", fontFamily: "Inter, sans-serif", fontSize: 10, marginTop: 2 }}>
                    {cs.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — dimension calculator */}
        <div className="px-8 lg:px-16 flex items-center"
          style={{ borderLeft: "1px solid rgba(198,168,107,0.07)" }}>
          <div className="w-full">
            <p style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 300, marginBottom: 6 }}>
              Подберите размеры вашего навеса
            </p>
            <p style={{ color: "#555", fontFamily: "Inter, sans-serif", fontSize: 12, marginBottom: 24 }}>
              {canopyStyles[selected].name}
            </p>

            {/* Top-down view */}
            <div className="w-full mb-8 rounded-lg overflow-hidden"
              style={{ background: "#080808", border: "1px solid rgba(198,168,107,0.08)", aspectRatio: "300/240" }}>
              <CanopyTopView width={width} depth={depth} type={canopyStyles[selected].name} />
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <GoldSlider min={2} max={8} step={0.5} value={width} onChange={setWidth}
                label="Ширина" display={`${width.toFixed(1)} м`} />
              <GoldSlider min={1.5} max={6} step={0.5} value={depth} onChange={setDepth}
                label="Вылет / Глубина" display={`${depth.toFixed(1)} м`} />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-5"
              style={{ borderTop: "1px solid rgba(198,168,107,0.1)" }}>
              <div>
                <p style={{ color: "#555", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Ориентировочная стоимость
                </p>
                <p className="mt-1"
                  style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 300 }}>
                  {Math.round(basePriceMin / 10000) * 10000 / 1000}–{Math.round(basePriceMax / 10000) * 10000 / 1000} тыс. ₽
                </p>
                <p style={{ color: "#555", fontFamily: "Inter, sans-serif", fontSize: 11, marginTop: 2 }}>
                  Площадь: {(width * depth).toFixed(1)} м²
                </p>
              </div>
              <button className="transition-all duration-300"
                style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 24px", borderRadius: 4 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0C0C0C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}>
                Заказать проект
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────────────

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const filtered = activeFilter === "Все"
    ? portfolioItems
    : portfolioItems.filter((p) => p.cat === activeFilter);

  return (
    <section className="py-24 px-8 lg:px-16" style={{ background: "#0f0f0f" }}>
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel>Портфолио</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E8E2D9" }}>
            Наши проекты
          </h2>
          <button className="transition-colors duration-200"
            style={{ color: "rgba(198,168,107,0.5)", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(198,168,107,0.5)")}>
            Все проекты →
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {portfolioFilters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="transition-all duration-200"
              style={{
                padding: "7px 16px",
                border: `1px solid ${activeFilter === f ? GOLD : "rgba(198,168,107,0.15)"}`,
                color: activeFilter === f ? GOLD : "#6b6b6b",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                background: activeFilter === f ? "rgba(198,168,107,0.06)" : "transparent",
                borderRadius: 20,
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered.map((item, i) => (
            <PortfolioCell key={item.label + i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCell({ item }: { item: typeof portfolioItems[0] }) {
  const [hovered, setHovered] = useState(false);
  const colSpan = item.size === "wide" ? "col-span-2" : "col-span-1";
  const rowSpan = item.size === "tall" ? "row-span-2" : "row-span-1";

  return (
    <div className={`relative overflow-hidden group cursor-pointer ${colSpan} ${rowSpan}`}
      style={{ background: "#111", borderRadius: 12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={item.url} alt={item.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background: `rgba(12,12,12,${hovered ? 0.55 : 0.3})` }} />
      <div className="absolute bottom-4 left-4">
        <p style={{ color: "#E8E2D9", fontFamily: "Cormorant Garamond, serif", fontSize: 14, fontWeight: 400 }}>
          {item.label}
        </p>
        <p style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, opacity: 0.65, marginTop: 2 }}>
          {item.sub}
        </p>
      </div>
      {/* Category chip */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(198,168,107,0.12)", border: "1px solid rgba(198,168,107,0.25)", borderRadius: 3, padding: "3px 8px" }}>
        <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {item.cat}
        </span>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: "Каталог",
      items: ["Готовые заборы", "Готовые навесы", "Ворота", "3D-Конструктор"],
    },
    {
      title: "Услуги",
      items: ["Проектирование", "Монтаж", "Обслуживание", "Гарантия 25 лет"],
    },
  ];

  return (
    <footer style={{ background: "#0A0A0A" }}>
      {/* Top gold line */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.25 }} />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-14"
          style={{ borderBottom: "1px solid rgba(198,168,107,0.07)" }}>

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border flex items-center justify-center" style={{ borderColor: GOLD }}>
                <svg width="14" height="14" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="4" height="12" fill={GOLD} />
                  <rect x="10" y="2" width="4" height="12" fill={GOLD} />
                  <rect x="2" y="7" width="12" height="2" fill={GOLD} />
                </svg>
              </div>
              <span style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: 15, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Ограда
              </span>
            </div>
            <p style={{ color: "#444", fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.75, maxWidth: 200 }}>
              Премиальные ограждения и навесы с 2008
            </p>
          </div>

          {/* Cols 2–3 */}
          {cols.map((col) => (
            <div key={col.title}>
              <p style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 18, opacity: 0.55 }}>
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <button className="transition-colors duration-200"
                      style={{ color: "#444", fontFamily: "Inter, sans-serif", fontSize: 12 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 4 — Contacts */}
          <div>
            <p style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 18, opacity: 0.55 }}>
              Контакты
            </p>
            <div className="flex flex-col gap-4">
              <a href="tel:+74950000000" style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: 17, fontWeight: 300 }}>
                +7 (495) 000-00-00
              </a>
              <button className="text-left transition-colors duration-200"
                style={{ color: "#444", fontFamily: "Inter, sans-serif", fontSize: 12 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}>
                info@ograda-premium.ru
              </button>
              <button className="transition-all duration-300 self-start mt-2"
                style={{ border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px 18px", borderRadius: 3 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0C0C0C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}>
                Вызвать замерщика
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p style={{ color: "#2e2e2e", fontFamily: "Inter, sans-serif", fontSize: 11 }}>
            © 2024 Ограда. Все права защищены.
          </p>
          <div className="flex items-center gap-8">
            {["Политика конфиденциальности", "Договор оферты"].map((t) => (
              <button key={t} className="transition-colors duration-200"
                style={{ color: "#2e2e2e", fontFamily: "Inter, sans-serif", fontSize: 11 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#555")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e2e")}>
                {t}
              </button>
            ))}
            <button className="transition-colors duration-200"
              style={{ color: "#2e2e2e", fontFamily: "Inter, sans-serif", fontSize: 11 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e2e")}>
              Telegram
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#0C0C0C" }}>
      <style>{`
        * { scrollbar-width: thin; scrollbar-color: rgba(198,168,107,0.12) transparent; }
        *::-webkit-scrollbar { width: 4px; height: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(198,168,107,0.18); border-radius: 2px; }
      `}</style>
      <Header />
      <HeroSection />
      <CatalogSection />
      <CustomizerSection />
      <CanopySection />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
