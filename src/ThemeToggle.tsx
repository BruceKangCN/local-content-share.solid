import { createEffect, createSignal } from "solid-js";
import { getInitialThemeIsDark, applyTheme } from "./theme.ts";
import Button from "./Button.tsx";

export default function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(getInitialThemeIsDark());

  createEffect(isDark, (value) => applyTheme(value));

  const toggleTheme = () => {
    // HACK: Compute the expected value rather than read. Updates are staged and
    // they don't take effect immediately. A call to isDark will not get the
    // expected value but the stale one.
    const expectedIsDark = !isDark();
    setIsDark(expectedIsDark);
    const theme = expectedIsDark ? "dark" : "light";
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors (for example in privacy mode).
    }
  };

  return <>
    <Button onClick={toggleTheme}>
      <span
        aria-hidden="true"
        // NOTE: DO NOT dynamically concat class names! UnoCSS need to see the
        // full names at compile time.
        class={isDark() ? "i-lucide-sun" : "i-lucide-moon"}
        un-h="6"
        un-w="6"
        un-shrink="0"
      />
    </Button>
  </>;
}
