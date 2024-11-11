export interface ScrollButtonType {
  direction: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
}
