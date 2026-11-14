import type { JSX } from "@solidjs/web";

interface ButtonProps {
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
}

export default function Button(props: ButtonProps) {
  return <>
    <button
      type="button"
      disabled={props.disabled ?? false}
      onClick={(e) => props.onClick?.(e)}
      un-flex="~"
      un-items="center"
      un-justify="center"
      un-p="2"
      un-shrink="0"
      un-rounded="xl"
      un-border="~ zinc-300 dark:zinc-600"
      un-bg="white hover:zinc-50 dark:(zinc-700 hover:zinc-600)"
      un-text="zinc-600 hover:indigo-600 dark:(zinc-300 hover:indigo-400)"
      un-ring="focus-visible:(2 indigo-500/40 dark:indigo-400/40)"
      un-transition="colors"
      un-cursor="pointer"
    >
      {props.children}
    </button>
  </>;
}
