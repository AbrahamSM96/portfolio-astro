import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative flex h-4 w-5 flex-col justify-between">
      <motion.span
        className="block h-px w-full origin-center bg-white"
        animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className="block h-px w-full bg-white"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-px w-full origin-center bg-white"
        animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const pathname = window.location.pathname;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change (Astro view transitions)
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    document.addEventListener('astro:page-load', close);
    return () => document.removeEventListener('astro:page-load', close);
  }, []);

  useMotionValueEvent(scrollY, 'change', (v) => setIsScrolled(v > 50));

  return (
    <>
      {/* Scroll-top fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-6 bg-gradient-to-b from-[var(--background)] to-transparent"
      />

      {/* Header bar */}
      <header className="pointer-events-none fixed z-[999] m-auto flex w-full justify-center px-0 py-4">
        <motion.nav
          layout
          initial={{ width: '1280px', backgroundColor: 'rgba(0,0,0,0)' }}
          animate={
            isMobile
              ? { backgroundColor: 'rgba(0,0,0,0)', width: '100%' }
              : {
                  maxWidth: isScrolled ? '610px' : '1280px',
                  width: '100%',
                  backgroundColor: isScrolled
                    ? 'var(--background-secondary)'
                    : 'rgba(0,0,0,0)',
                }
          }
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="pointer-events-auto relative flex max-w-screen-xl items-center justify-between gap-6 rounded-full px-4 py-1 transition-colors sm:px-6 sm:pr-4 sm:backdrop-blur-md"
        >
          <a className="font-medium text-white text-xl" href="/">
            ASM
          </a>

          {/* Desktop links */}
          <ul className="hidden gap-6 whitespace-nowrap px-16 font-light text-sm sm:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={item.name}
                  className="group relative flex items-center"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="-left-3 absolute h-1.5 w-1.5 rounded-full bg-primary"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <a
                    className={`text-white/90 ${isActive ? 'font-semibold' : ''}`}
                    href={item.href}
                  >
                    <span className="relative inline-flex overflow-hidden">
                      <div className="group-hover:-translate-y-[150%] translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:skew-y-12">
                        {item.name}
                      </div>
                      <div className="absolute translate-y-[150%] skew-y-12 transform-gpu transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                        {item.name}
                      </div>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 sm:hidden"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[998] flex flex-col sm:hidden"
            style={{
              background: 'rgba(4, 2, 10, 0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Clear the header */}
            <div className="h-20 shrink-0" />

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-center px-8">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: 0.1 + i * 0.075,
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="group flex items-baseline gap-4 border-white/8 border-b py-5"
                  >
                    <span className="w-7 shrink-0 font-light text-purple-500/60 text-xs tabular-nums">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-bold text-4xl tracking-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-purple-400'
                          : 'text-white/90 group-hover:text-purple-300'
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 shrink-0 self-center rounded-full bg-purple-400" />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.42, duration: 0.3 }}
              className="flex items-center justify-between px-8 pt-6 pb-10"
            >
              <span className="text-white/25 text-xs uppercase tracking-widest">
                Abraham Serrano · {new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/abrahamsm96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors hover:text-white/80"
                  aria-label="GitHub"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abraham-serranom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors hover:text-white/80"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
