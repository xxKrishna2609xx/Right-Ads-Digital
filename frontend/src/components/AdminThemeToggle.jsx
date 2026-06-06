import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function AdminThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000 }}>
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{ cursor: 'pointer' }}
      >
        <div className="theme-toggle-knob">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Moon size={11} color="white" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sun size={11} color="white" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}
