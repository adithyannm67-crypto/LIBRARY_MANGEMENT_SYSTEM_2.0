"use client"


import React, { createContext, useContext } from 'react';

const ThemeContext = createContext<unknown>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // TODO: dark/light mode toggle
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
