/**
 * Device and browser detection utilities
 * Useful for iOS Safari specific optimizations
 */

export const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

export const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const isIOSSafari = () => {
  return isIOS() && isSafari();
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isTablet = () => {
  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
};

export const isDesktop = () => {
  return !isMobile() && !isTablet();
};

export const getViewportSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const getDevicePixelRatio = () => {
  return window.devicePixelRatio || 1;
};

export const supportsStandaloneMode = () => {
  return "standalone" in window.navigator;
};

export const isStandaloneMode = () => {
  return (
    window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
  );
};

export const getBrowserInfo = () => {
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
