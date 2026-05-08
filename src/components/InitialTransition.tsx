/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const blackBox = {
  initial: {
    height: '100vh',
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: 'afterChildren',
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export default function InitialTransition() {
  // Only play on the very first page load of the session
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (sessionStorage.getItem('intro-played')) return false;
    sessionStorage.setItem('intro-played', '1');
    return true;
  });
  const [zTransition, setZtransition] = useState(true);

  useEffect(() => {
    // React is mounted — hide the static HTML cover so it never blocks the page
    const cover = document.getElementById('intro-cover');
    if (cover) cover.style.display = 'none';

    if (!shouldRender) return;

    window.scrollTo(0, 0);

    const t1 = setTimeout(() => setZtransition(false), 2500);
    const t2 = setTimeout(() => setShouldRender(false), 3000);
    const t3 = setTimeout(
      () => document.body.classList.remove('overflow-hidden'),
      1600,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.classList.remove('overflow-hidden');
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const transitionZindex = zTransition ? 1000 : -1;

  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: '0',
        zIndex: transitionZindex,
        overflow: 'hidden',
        pointerEvents: zTransition ? 'auto' : 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          background: '#000',
        }}
        initial="initial"
        animate="animate"
        variants={blackBox as unknown as any}
        onAnimationStart={() => document.body.classList.add('overflow-hidden')}
        onAnimationComplete={() =>
          document.body.classList.remove('overflow-hidden')
        }
      >
        <motion.svg
          variants={textContainer}
          style={{ position: 'absolute', zIndex: 50, display: 'flex' }}
        >
          <defs>
            <pattern
              id="pattern"
              patternUnits="userSpaceOnUse"
              width={750}
              height={800}
              style={{ color: '#fff' }}
            >
              <rect
                style={{
                  width: '100%',
                  height: '100%',
                  fill: 'currentcolor',
                }}
              />
              <motion.rect
                variants={text as unknown as any}
                style={{
                  width: '100%',
                  height: '100%',
                  color: 'gray',
                  fill: 'currentcolor',
                }}
              />
            </pattern>
          </defs>
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              fill: 'url(#pattern)',
            }}
          >
            Abraham SM
          </text>
        </motion.svg>
      </motion.div>
    </div>
  );
}
