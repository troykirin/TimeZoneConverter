/**
 * Device and browser detection utilities
 * Useful for iOS Safari specific optimizations
 */

// Guard check for browser environment
const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined";

export const isIOS = () => {
  if (!isBrowser) return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

export const isSafari = () => {
  if (!isBrowser) return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const isIOSSafari = () => {
  return isIOS() && isSafari();
};

export const isMobile = () => {
  if (!isBrowser) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isTablet = () => {
  if (!isBrowser) return false;
  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
};

export const isDesktop = () => {
  return !isMobile() && !isTablet();
};

export const getViewportSize = () => {
  if (!isBrowser) return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const getDevicePixelRatio = () => {
  if (!isBrowser) return 1;
  return window.devicePixelRatio || 1;
};

export const supportsStandaloneMode = () => {
  if (!isBrowser) return false;
  return "standalone" in window.navigator;
};

export const isStandaloneMode = () => {
  if (!isBrowser) return false;
  return (
    window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
  );
};

export const getBrowserInfo = () => {
  if (!isBrowser) {
    return {
      isIOS: false,
      isSafari: false,
      isIOSSafari: false,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isStandalone: false,
      viewport: { width: 0, height: 0 },
      pixelRatio: 1,
      userAgent: "",
    };
  }
  
  return {
    isIOS: isIOS(),
    isSafari: isSafari(),
    isIOSSafari: isIOSSafari(),
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isStandalone: isStandaloneMode(),
    viewport: getViewportSize(),
    pixelRatio: getDevicePixelRatio(),
    userAgent: navigator.userAgent,
  };
};

export default {
  isIOS,
  isSafari,
  isIOSSafari,
  isMobile,
  isTablet,
  isDesktop,
  getViewportSize,
  getDevicePixelRatio,
  supportsStandaloneMode,
  isStandaloneMode,
  getBrowserInfo,
};
