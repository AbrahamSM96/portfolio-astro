import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.35 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsTouch(false);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest('a,button,[data-cursor-hover]'))
        setHovered(true);
    };
    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest('a,button,[data-cursor-hover]'))
        setHovered(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          pointerEvents: 'none',
          borderRadius: '50%',
          border: '1.5px solid',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s',
        }}
        animate={{
          width: hovered ? 46 : 30,
          height: hovered ? 46 : 30,
          backgroundColor: hovered ? 'rgba(147,51,234,0.18)' : 'transparent',
          borderColor: hovered
            ? 'rgba(168,85,247,0.85)'
            : 'rgba(255,255,255,0.38)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: hovered ? 'rgb(192,132,252)' : 'white',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s, background-color 0.15s',
        }}
      />
    </>
  );
}
