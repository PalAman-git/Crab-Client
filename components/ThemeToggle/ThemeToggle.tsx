'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useModeAnimation } from 'react-theme-switch-animation';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    duration: 600,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    toggleSwitchTheme();

    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }, 50);
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-card/50 animate-pulse" />;
  }

  return (
    <button
      ref={ref}
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card shadow-sm hover:bg-accent/10 hover:border-accent/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all ${
          resolvedTheme === 'dark'
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${
          resolvedTheme === 'dark'
            ? 'scale-100 opacity-100'
            : 'scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
