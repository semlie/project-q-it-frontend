import React from 'react';
import { motion } from 'motion/react';

type Bubble = {
  color: string;
  size: string;
  delay: number;
  x: string;
};

type AuthVisualPanelProps = {
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  bubbles?: Bubble[];
};

const defaultBubbles: Bubble[] = [
  { color: 'bg-emerald-400', size: 'w-4 h-4', delay: 0, x: '20%' },
  { color: 'bg-amber-400', size: 'w-3 h-3', delay: 2, x: '40%' },
  { color: 'bg-rose-400', size: 'w-5 h-5', delay: 1, x: '60%' },
  { color: 'bg-cyan-400', size: 'w-6 h-6', delay: 3, x: '80%' },
];

export default function AuthVisualPanel({
  logo,
  title,
  subtitle,
  content,
  footer,
  bubbles = defaultBubbles,
}: AuthVisualPanelProps) {
  return (
    <div className="hidden md:flex md:w-1/2 bg-[#083344] relative overflow-hidden items-center justify-center p-12">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0e7490_0%,transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#0891b2_0%,transparent_50%)] opacity-20" />

        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{
              y: '-100vh',
              opacity: [0, 1, 1, 0],
              x: ['0%', index % 2 === 0 ? '10%' : '-10%', '0%'],
            }}
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'linear',
            }}
            style={{ left: bubble.x, bottom: '-20px' }}
            className={`absolute ${bubble.color} ${bubble.size} rounded-full blur-[2px] shadow-lg shadow-white/10`}
          />
        ))}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-16 text-center"
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 border border-dashed border-cyan-400/20 rounded-full"
              />
              {logo}
            </div>
            <div className="space-y-3">
              <h2 className="text-7xl font-black text-white tracking-tighter drop-shadow-sm">{title}</h2>
              <p className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-sm">{subtitle}</p>
            </div>
          </div>

          <div className="space-y-8">{content}</div>
          {footer}
        </motion.div>
      </div>
    </div>
  );
}
