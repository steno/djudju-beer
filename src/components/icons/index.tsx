import React from 'react';

// Base styles for all icons
const baseIconStyles = {
  strokeDasharray: "4 2",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  stroke: "black",
};

// Base styles for icons on dark backgrounds
const darkBgIconStyles = {
  ...baseIconStyles,
  stroke: "currentColor",
};

// Common SVG wrapper styles
const svgBaseProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  className: "hand-drawn-icon inline-flex items-center justify-center"
};

export const HandDrawnLeaf = () => (
  <svg {...svgBaseProps}>
    <path d="M4 16s1.5-5 7-5 9 2.5 9 7c0-4.5-3.5-10-9-10S4 9 4 16z" style={baseIconStyles} />
    <path d="M12 19c-3-1-6-3.5-6-7" style={baseIconStyles} />
  </svg>
);

export const HandDrawnPalmtree = () => (
  <svg {...svgBaseProps}>
    <path d="M12 3c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" style={baseIconStyles} />
    <path d="M12 9v12M8 21h8" style={baseIconStyles} />
    <path d="M7 9c-2-2-2-4 0-6M17 9c2-2 2-4 0-6" style={baseIconStyles} />
  </svg>
);

export const HandDrawnSun = () => (
  <svg {...svgBaseProps}>
    <circle cx="12" cy="12" r="4" style={baseIconStyles} />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" style={baseIconStyles} />
  </svg>
);

export const HandDrawnFlower = () => (
  <svg {...svgBaseProps}>
    <circle cx="12" cy="12" r="3" style={baseIconStyles} />
    <path d="M12 6c2-2 4-2 6 0s2 4 0 6M12 6c-2-2-4-2-6 0s-2 4 0 6M12 18c2 2 4 2 6 0s2-4 0-6M12 18c-2 2-4 2-6 0s-2-4 0-6" style={baseIconStyles} />
  </svg>
);

export const HandDrawnMenu = () => (
  <svg {...svgBaseProps}>
    <path d="M4 6h16M4 12h16M4 18h16" style={darkBgIconStyles} />
  </svg>
);

export const HandDrawnX = () => (
  <svg {...svgBaseProps}>
    <path d="M18 6L6 18M6 6l12 12" style={darkBgIconStyles} />
  </svg>
);

export const HandDrawnArrowUp = () => (
  <svg {...svgBaseProps}>
    <path d="M12 19V5M5 12l7-7 7 7" style={darkBgIconStyles} />
  </svg>
);

export const HandDrawnMail = () => (
  <svg {...svgBaseProps}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" style={baseIconStyles} />
    <path d="M22 6l-10 7L2 6" style={baseIconStyles} />
  </svg>
);

export const HandDrawnPhone = () => (
  <svg {...svgBaseProps}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" style={baseIconStyles} />
  </svg>
);

export const HandDrawnMapPin = () => (
  <svg {...svgBaseProps}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" style={baseIconStyles} />
    <circle cx="12" cy="10" r="3" style={baseIconStyles} />
  </svg>
);

export const HandDrawnShield = () => (
  <svg {...svgBaseProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" style={baseIconStyles} />
  </svg>
);

export const HandDrawnLock = () => (
  <svg {...svgBaseProps}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" style={baseIconStyles} />
    <path d="M7 11V7a5 5 0 0110 0v4" style={baseIconStyles} />
  </svg>
);

export const HandDrawnUserCheck = () => (
  <svg {...svgBaseProps}>
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" style={baseIconStyles} />
    <circle cx="9" cy="7" r="4" style={baseIconStyles} />
    <path d="M16 11l2 2 4-4" style={baseIconStyles} />
  </svg>
);

export const HandDrawnFileText = () => (
  <svg {...svgBaseProps}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" style={baseIconStyles} />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" style={baseIconStyles} />
  </svg>
);

export const HandDrawnChevronLeft = () => (
  <svg {...svgBaseProps}>
    <path d="M15 18l-6-6 6-6" style={darkBgIconStyles} />
  </svg>
);

export const HandDrawnChevronRight = () => (
  <svg {...svgBaseProps}>
    <path d="M9 18l6-6-6-6" style={darkBgIconStyles} />
  </svg>
);