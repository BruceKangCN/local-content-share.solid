export const getInitialThemeIsDark = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored === "dark";
    }
  } catch {
    // Ignore storage errors (for example in privacy mode).
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};
