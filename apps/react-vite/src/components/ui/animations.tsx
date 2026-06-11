import { useEffect, useRef, useState, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  emberGlow?: boolean;
}

export function Card3D({ children, className = '', emberGlow = false }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -4;
      const ry = ((x - cx) / cx) * 4;
      inner.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    };

    const handleMouseLeave = () => {
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`card-3d ${emberGlow ? 'ember-glow' : ''} ${className}`}>
      <div ref={innerRef} className='card-3d-inner'>
        {children}
      </div>
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  staggerIndex?: number;
}

export function Reveal({ children, className = '', direction = 'up', staggerIndex = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsActive(true);
            }, staggerIndex * 120);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [staggerIndex]);

  const directionClasses = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  };

  return (
    <div
      ref={ref}
      className={`${directionClasses[direction]} ${isActive ? 'active' : ''} ${className}`}
      style={{ '--stagger': staggerIndex } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
