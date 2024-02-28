import { ReactNode } from "react";

/**
 * Styled icon box wrapper component
 * @param \<i> icon element
 * @returns
 */
export default function IconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-[2.5rem] h-[2.5rem] bg-main-100 grid place-items-center border-[1px] border-border rounded-sm [&>i]:text-main-300 [&>i]:text-title ${className}`}
    >
      {children}
    </div>
  );
}
