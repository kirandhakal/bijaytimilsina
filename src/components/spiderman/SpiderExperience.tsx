"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ShoppingBag,
  Play,
  X,
  Menu,
  Facebook,
  Instagram,
  Zap,
  RotateCcw,
  VolumeX,
  Volume2,
} from "lucide-react";
import SpiderMark from "../SpiderMark";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = setTimeout(onComplete, reduced ? 100 : 3500);
    return () => clearTimeout(timer);
  }, [onComplete, reduced]);
  return (
    <motion.div
      className="sp-intro"
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.7 }}
    >
      <div className="web-texture" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8 }}
      >
        <SpiderMark />
        <p>BAHLIL MORALES</p>
      </motion.div>
      <button onClick={onComplete}>
        SKIP INTRO <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
const menuContent: Record<string, { label: string; href: string }[]> = {
  GAMES: [
    { label: "Experience the transformation", href: "#experience" },
    { label: "Meet your new hero", href: "#story" },
  ],
  NEWS: [
    { label: "Watch the launch trailer", href: "#trailer" },
    { label: "The city needs a new hero", href: "#story" },
  ],
  BLOG: [
    { label: "Behind the mask", href: "#story" },
    { label: "Discover your power", href: "#experience" },
  ],
  SERVICES: [
    { label: "Accessibility & controls", href: "#controls" },
    { label: "About this concept", href: "#credits" },
  ],
};
export function NavigationBar({ onStore }: { onStore: () => void }) {
  const [active, setActive] = useState<string | null>(null),
    [mobile, setMobile] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="sp-nav">
      <a href="#main" className="sp-logo" aria-label="Spider-Man home">
        <SpiderMark />
      </a>
      <nav
        aria-label="Main navigation"
        className={mobile ? "nav-links is-open" : "nav-links"}
      >
        {Object.entries(menuContent).map(([name, links]) => (
          <div className="nav-group" key={name}>
            <button
              aria-expanded={active === name}
              onClick={() => setActive(active === name ? null : name)}
            >
              {name}
              <ChevronDown size={12} />
            </button>
            {active === name && (
              <div className="nav-dropdown">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => {
                      setActive(null);
                      setMobile(false);
                    }}
                  >
                    {l.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <button className="store-button" onClick={onStore}>
        <ShoppingBag size={16} /> STORE
      </button>
      <button
        className="mobile-toggle"
        aria-label="Toggle navigation"
        aria-expanded={mobile}
        onClick={() => setMobile(!mobile)}
      >
        {mobile ? <X /> : <Menu />}
      </button>
    </header>
  );
}
export function CharacterTransformation({ power }: { power: number }) {
  const partial = Math.min(1, power / 45),
    full = Math.max(0, (power - 40) / 60);
  return (
    <div
      className="character-stage"
      role="img"
      aria-label={
        power === 0
          ? "Businessman looking at his raised hand"
          : power === 100
            ? "Fully transformed black and red Spider-Man"
            : "Businessman transforming into Spider-Man"
      }
    >
      <div className="character-aura" />
      <div className="character-frame normal" />
      <motion.div
        className="character-frame partial"
        animate={{
          clipPath: `circle(${partial * 150}% at 26% 40%)`,
          opacity: power > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="character-frame super"
        animate={{
          clipPath: `circle(${full * 150}% at 26% 40%)`,
          opacity: full > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
      <div
        className="hand-energy"
        style={{ opacity: power > 0 && power < 100 ? 1 : 0 }}
      />
      <div className="character-fade" />
    </div>
  );
}
export function GameReviews() {
  return (
    <section className="reviews" aria-label="Game reviews">
      <h2>GAME REVIEWS</h2>
      {[
        { name: "IGN", rating: "9.9", quote: "“Potential Game of the Year”" },
        {
          name: "GamesRadar",
          rating: "9.7",
          quote: "“PlayStation’s Masterpiece”",
        },
      ].map((r) => (
        <div className="review" key={r.name}>
          <div className="rating">
            {r.rating}
            <span>/ 10</span>
          </div>
          <div>
            <h3>
              {r.name}
              {r.name === "GamesRadar" && (
                <span className="review-plus">+</span>
              )}
            </h3>
            <p>{r.quote}</p>
          </div>
        </div>
      ))}
      <span className="concept-ratings">
        Illustrative ratings · Fan concept
      </span>
    </section>
  );
}
export function TrailerPreview({ onPlay }: { onPlay: () => void }) {
  return (
    <section className="trailer-preview" id="trailer">
      <h2>WATCH TRAILER</h2>
      <button onClick={onPlay} aria-label="Play launch trailer">
        <img
          src="/images/spiderman/trailer.webp"
          alt="Spider-Man Miles Morales launch trailer"
          loading="lazy"
        />
        <span className="play-circle">
          <Play fill="currentColor" size={19} />
        </span>
        <span className="trailer-caption">
          A NEW HERO RISES <span>02:08</span>
        </span>
      </button>
    </section>
  );
}
export function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.facebook.com/Marvel"
        target="_blank"
        rel="noreferrer"
        aria-label="Marvel on Facebook"
      >
        <Facebook size={17} />
      </a>
      <a
        href="https://www.instagram.com/marvel/"
        target="_blank"
        rel="noreferrer"
        aria-label="Marvel on Instagram"
      >
        <Instagram size={18} />
      </a>
      <a
        href="https://x.com/Marvel"
        target="_blank"
        rel="noreferrer"
        aria-label="Marvel on X"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L6.3 3.9H4.5L17.8 20Z" />
        </svg>
      </a>
      <span className="social-line" />
    </div>
  );
}
export function TrailerModal({
  kind,
  onClose,
}: {
  kind: "trailer" | "store";
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items =
          ref.current?.querySelectorAll<HTMLElement>("button,a,iframe");
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`sp-modal ${kind === "store" ? "store-modal" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={kind === "trailer" ? "Launch trailer" : "Explore the game"}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        {kind === "trailer" ? (
          <>
            <iframe
              src="https://www.youtube-nocookie.com/embed/U-1cn1yOKYc?autoplay=1&rel=0"
              title="Marvel’s Spider-Man: Miles Morales official launch trailer"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <p>
              Official Miles Morales trailer ·{" "}
              <a
                href="https://www.youtube.com/watch?v=U-1cn1yOKYc"
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
          </>
        ) : (
          <>
            <SpiderMark />
            <span className="eyebrow">BE GREATER. BE YOURSELF.</span>
            <h2>Your next adventure.</h2>
            <p>
              Bahlil Morales is an independent fan concept, not a purchasable
              game. Discover the official Marvel’s Spider-Man: Miles Morales
              experience on PlayStation.
            </p>
            <a
              className="primary-button"
              href="https://www.playstation.com/en-us/games/marvels-spider-man-miles-morales/"
              target="_blank"
              rel="noreferrer"
            >
              EXPLORE THE OFFICIAL GAME <ArrowUpRight size={18} />
            </a>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
export function HeroSection({
  power,
  setPower,
  onStore,
  onPlay,
}: {
  power: number;
  setPower: React.Dispatch<React.SetStateAction<number>>;
  onStore: () => void;
  onPlay: () => void;
}) {
  const [muted, setMuted] = useState(true);
  const isAutoRef = useRef(true);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const animation = useRef<number>(0);
  const powerRef = useRef(power);
  powerRef.current = power;
  const reduced = useReducedMotion();

  // Auto infinite animation without requiring scroll
  useEffect(() => {
    if (reduced) return;

    let lastTime = performance.now();
    let direction = 1; // 1 = transforming towards hero (100), -1 = towards human (0)
    let pauseUntil = performance.now() + 1800; // start with dramatic pause at human

    const tick = (now: number) => {
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (isAutoRef.current) {
        if (now >= pauseUntil) {
          // Smooth 3 second morph between human and hero
          const step = 33.3 * delta * direction;
          const current = powerRef.current;
          let next = current + step;

          if (direction === 1 && next >= 100) {
            next = 100;
            direction = -1;
            pauseUntil = now + 2400; // hold at fully transformed hero
          } else if (direction === -1 && next <= 0) {
            next = 0;
            direction = 1;
            pauseUntil = now + 2400; // hold at human
          }

          setPower(next);
        }
      }

      animation.current = requestAnimationFrame(tick);
    };

    animation.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animation.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [reduced, setPower]);

  const transform = () => {
    cancelAnimationFrame(animation.current);
    isAutoRef.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);

    const from = powerRef.current;
    const to = from > 50 ? 0 : 100;
    const start = performance.now();

    if (reduced) {
      setPower(to);
      return;
    }

    const manualTick = (now: number) => {
      const t = Math.min(1, (now - start) / 2400);
      const eased = from + (to - from) * (t * t * (3 - 2 * t));
      setPower(t >= 1 ? to : eased);
      if (t < 1) {
        animation.current = requestAnimationFrame(manualTick);
      } else {
        // Resume auto infinite loop after 3.5 seconds
        idleTimer.current = setTimeout(() => {
          isAutoRef.current = true;
        }, 3500);
      }
    };
    animation.current = requestAnimationFrame(manualTick);
  };

  const handleSliderChange = (val: number) => {
    cancelAnimationFrame(animation.current);
    isAutoRef.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setPower(val);
    idleTimer.current = setTimeout(() => {
      isAutoRef.current = true;
    }, 4000);
  };

  return (
    <section className="sp-hero" id="experience">
      <div className="web-texture" />
      <div className="hero-orbit" />
      <div className="background-word" aria-hidden="true">
        BE GREATER.
      </div>
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 100}%`,
              animationDelay: `-${i * 0.7}s`,
            }}
          />
        ))}
      </div>
      <CharacterTransformation power={power} />
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="hero-kicker">
          <span /> A NEW HERO. A NEW STORY.
        </div>
        <div className="marvel-mark">MARVEL</div>
        <h1>SPIDER-MAN</h1>
        <p className="hero-subtitle">BAHLIL MORALES</p>
        <p className="hero-description">
          Experience the rise of Bahlil Morales as the new hero masters
          incredible, explosive new powers to become his own Spider-Man.
        </p>
        <button className="primary-button" onClick={onStore}>
          PRE-ORDER NOW <ArrowRight size={19} />
        </button>
        <div className="platforms">
          <span className="ps-mark">PS5</span>
          <span className="platform-divider" />
          <span>PS4</span>
          <span className="platform-note">PLAY HAS NO LIMITS™</span>
        </div>
      </motion.div>
      <motion.aside
        className="hero-aside"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <GameReviews />
        <TrailerPreview onPlay={onPlay} />
      </motion.aside>
      <div className="transform-controls" id="controls">
        <button onClick={transform} className="transform-button">
          {power > 50 ? <RotateCcw size={16} /> : <Zap size={16} />}{" "}
          {power > 50 ? "BACK TO HUMAN" : "UNLEASH YOUR POWER"}
          <span>{Math.round(power)}%</span>
        </button>
        <input
          aria-label="Transformation progress"
          type="range"
          min="0"
          max="100"
          value={Math.round(power)}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
        <div className="transform-labels">
          <span className={power <= 35 ? "active" : ""}>HUMAN</span>
          <span className={power >= 65 ? "active" : ""}>HERO</span>
        </div>
      </div>
      <div className="hero-bottom">
        <SocialLinks />
        <a className="scroll-cue" href="#story">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
        <button
          type="button"
          className="sound-label"
          onClick={() => setMuted((m) => !m)}
          aria-label={
            muted ? "Sound muted, click to unmute" : "Sound on, click to mute"
          }
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}{" "}
          {muted ? "SOUND OFF" : "SOUND ON"}
        </button>
      </div>
    </section>
  );
}
export default function SpiderExperience() {
  const [intro, setIntro] = useState(true),
    [power, setPower] = useState(0),
    [modal, setModal] = useState<"trailer" | "store" | null>(null);
  const finish = useRef(() => setIntro(false)).current;
  const close = useRef(() => setModal(null)).current;
  return (
    <div className="sp-experience">
      <AnimatePresence>
        {intro && <IntroAnimation onComplete={finish} />}
      </AnimatePresence>
      <div inert={intro}>
        <NavigationBar onStore={() => setModal("store")} />
        <main id="main">
          <HeroSection
            power={power}
            setPower={setPower}
            onStore={() => setModal("store")}
            onPlay={() => setModal("trailer")}
          />
          <section className="story-section" id="story">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="eyebrow">BEHIND THE MASK</span>
              <h2>
                Anyone can wear the mask.
                <br />
                <em>It’s how you wear it that matters.</em>
              </h2>
              <div className="story-bottom">
                <p>
                  One city. A new responsibility. Discover the extraordinary
                  power beneath an ordinary life — and become the hero you were
                  meant to be.
                </p>
                <button
                  onClick={() => {
                    setPower(0);
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  EXPERIENCE THE TRANSFORMATION <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
            <SpiderMark />
          </section>
        </main>
        <footer className="sp-footer" id="credits">
          <span>
            MARVEL <b>SPIDER-MAN</b>
          </span>
          <p>
            Independent fan concept. Not affiliated with Marvel, Sony or
            Insomniac Games.
            <br />
            Bahlil Morales and the displayed reviews are illustrative.
          </p>
          <a href="#main">BACK TO TOP ↑</a>
        </footer>
      </div>
      <AnimatePresence>
        {modal && <TrailerModal kind={modal} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
