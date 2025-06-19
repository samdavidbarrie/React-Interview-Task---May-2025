// src/responsive.ts
// Centralized responsive constants for breakpoints and chart tweaks

export const BREAKPOINTS = {
  mobile: 640, // px, matches Tailwind's sm
}

export const CHART_RESPONSIVE = {
  barRadius: {
    mobile: [2, 2, 0, 0],
    desktop: [6, 6, 0, 0],
  },
  animationDuration: {
    mobile: 300,
    desktop: 800,
  },
  animationEasing: {
    mobile: 'linear',
    desktop: 'ease-out',
  },
  yAxisTicks: {
    mobile: 6,
    desktop: 4,
  },
}
