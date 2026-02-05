'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useModeAnimation } from 'react-theme-switch-animation';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    duration: 600,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    // 1. Trigger animation FIRST (no args)
    toggleSwitchTheme();
    
    // 2. Then switch theme (async to sync with animation)
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, 50);
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-card/50 animate-pulse" />;
  }

  return (
    <button
      ref={ref}
      onClick={handleToggle}
      className="group cursor-pointer relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card shadow-sm hover:bg-accent/10 hover:border-accent/30 hover:shadow-md hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background shrink-0"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative h-5 w-5">
        <Sun className={`absolute h-5 w-5 transition-all ${isDarkMode ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} text-foreground group-hover:text-accent`} />
        <Moon className={`absolute h-5 w-5 transition-all ${isDarkMode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} text-accent-foreground group-hover:text-accent`} />
      </div>
    </button>
  );
}