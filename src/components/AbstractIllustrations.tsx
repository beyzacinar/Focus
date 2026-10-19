import React from 'react';

export const MoonIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#EFE8F6" />
    <path
      d="M48 24C41.3726 24 36 29.3726 36 36C36 42.6274 41.3726 48 48 48C48.8687 48 49.7153 47.9079 50.5317 47.7329C48.0645 52.6865 42.9234 56 37 56C28.1634 56 21 48.8366 21 40C21 31.1634 28.1634 24 37 24C37.8967 24 38.7758 24.0738 39.6322 24.2155C41.8845 24.0754 44.8219 24 48 24Z"
      fill="#8F78AA"
      fillOpacity="0.85"
    />
    <circle cx="26" cy="28" r="1.5" fill="#B4A2CD" />
    <circle cx="54" cy="52" r="1" fill="#B4A2CD" />
    <circle cx="58" cy="30" r="1.5" fill="#B4A2CD" />
  </svg>
);

export const SunIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#FDF3E3" />
    <circle cx="40" cy="40" r="16" fill="#E8B06B" fillOpacity="0.85" />
    <circle cx="40" cy="14" r="2.5" fill="#E8B06B" />
    <circle cx="40" cy="66" r="2.5" fill="#E8B06B" />
    <circle cx="14" cy="40" r="2.5" fill="#E8B06B" />
    <circle cx="66" cy="40" r="2.5" fill="#E8B06B" />
    <circle cx="22" cy="22" r="2" fill="#E8B06B" />
    <circle cx="58" cy="58" r="2" fill="#E8B06B" />
    <circle cx="22" cy="58" r="2" fill="#E8B06B" />
    <circle cx="58" cy="22" r="2" fill="#E8B06B" />
  </svg>
);

export const HourglassIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#EBF4EE" />
    <path
      d="M28 26H52M28 54H52M32 26V32C32 36.4183 35.5817 40 40 40C44.4183 40 48 36.4183 48 32V26M32 54V48C32 43.5817 35.5817 40 40 40C44.4183 40 48 43.5817 48 48V54"
      stroke="#6B997B"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="40" cy="48" r="3" fill="#6B997B" />
  </svg>
);

export const BookIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#FDF0EB" />
    <path
      d="M40 32C34.5 28 28 29 25 30V53C28 52 34.5 51 40 55C45.5 51 52 52 55 53V30C52 29 45.5 28 40 32Z"
      fill="#D98A6C"
      fillOpacity="0.85"
    />
    <path d="M40 32V55" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HeadphonesIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#F2EFE9" />
    <path
      d="M26 42C26 34.268 32.268 28 40 28C47.732 28 54 34.268 54 42V48C54 50.2091 52.2091 52 50 52H48V42H54M26 42H32V52H30C27.7909 52 26 50.2091 26 48V42Z"
      stroke="#7A7265"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ZenStonesIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#E8EDF5" />
    <ellipse cx="40" cy="54" rx="20" ry="7" fill="#8898AA" fillOpacity="0.9" />
    <ellipse cx="40" cy="42" rx="14" ry="5.5" fill="#A4B3C4" />
    <ellipse cx="40" cy="32" rx="8" ry="3.5" fill="#C5D1DE" />
  </svg>
);

export const PlantSproutIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="32" fill="#ECFDF3" />
    <path
      d="M40 56V34M40 34C40 26 30 24 30 24C30 24 30 34 40 34ZM40 38C40 30 50 28 50 28C50 28 50 38 40 38Z"
      stroke="#12B76A"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

