import { MouseEventHandler, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const styleList = {
  primary:
    "text-main-400 px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-light text-body hover:from-white hover:to-white hover:text-main-100",
  secondary:
    "text-main-400 px-6 py-2 rounded-lg bg-main-100 text-body hover:bg-main-400 hover:text-main-100 border-border border-[1px]",
};

type TStyle = keyof typeof styleList;

interface IProps {
  children: ReactNode;
  onClick?: () => void;
  style?: TStyle;
  to?: string;
  className?: string;
}

/**
 * Styled button with builtin features
 * @param style - Selection of button style matched with the design system
 *
 * @param to - A string that represents a destination route (linked with react router's `navigate()`)
 *
 * @returns
 */
export default function Button({
  className = "",
  children,
  onClick = () => {},
  style = "primary",
  to,
}: IProps) {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (to) navigate(to);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={styleList[style] + " " + className}
    >
      {children}
    </button>
  );
}
