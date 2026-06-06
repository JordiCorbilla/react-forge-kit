import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white" {...props} />;
}
