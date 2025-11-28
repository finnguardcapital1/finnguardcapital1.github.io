import { ButtonHTMLAttributes } from "react";
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) {
  const { className = "", variant, size, ...rest } = props;
  return <button {...rest} className={`px-3 py-2 rounded ${className}`} />;
}
