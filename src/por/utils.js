/**
 * Utility functions for portfolio actions.
 */

export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getEmailLink = (email = "jeetnathwani660@gmail.com") => {
  return isMobileDevice()
    ? `mailto:${email}`
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
};
