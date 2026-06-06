import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MoreHorizontal,
  Search,
  XCircle,
  type LucideIcon
} from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cx } from "@forge/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-slate-950 text-white hover:bg-slate-800",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cx(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        buttonStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export function IconButton({
  label,
  icon: Icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon: LucideIcon }) {
  return (
    <Button aria-label={label} title={label} variant="ghost" className="h-9 w-9 px-0" {...props}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export function LoadingButton({
  loading,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <Button disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function Spinner() {
  return <Loader2 className="h-5 w-5 animate-spin text-slate-500" />;
}

export function PageHeader({
  title,
  description,
  actions
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-slate-950">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={cx("rounded-lg border border-slate-200 bg-white p-4 shadow-sm", className)} {...props} />;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700"
  };
  return <span className={cx("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const tone = status === "active" || status === "completed" ? "success" : status === "failed" || status === "archived" ? "danger" : "warning";
  return <Badge tone={tone}>{status}</Badge>;
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <CheckCircle2 className="mx-auto h-8 w-8 text-slate-400" />
      <h2 className="mt-3 text-sm font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}

export function ErrorState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
      <div className="flex gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4" />
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {description ? <p className="mt-1 text-sm">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-md bg-slate-200", className)} />;
}

export function ConfirmDialog({ title, open }: { title: string; open: boolean }) {
  if (!open) {
    return null;
  }
  return <div role="dialog" aria-label={title} className="rounded-lg border bg-white p-4 shadow-lg" />;
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      <input
        className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none ring-slate-950 focus:ring-2"
        {...props}
      />
    </label>
  );
}

export function ActionMenu({ children }: { children?: ReactNode }) {
  return (
    <Button variant="ghost" className="h-8 px-2">
      <MoreHorizontal className="h-4 w-4" />
      {children}
      <ChevronDown className="h-3 w-3" />
    </Button>
  );
}

export function Tabs({
  tabs,
  value,
  onChange
}: {
  tabs: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cx(
            "rounded px-3 py-1.5 text-sm",
            tab.value === value ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100"
          )}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function CloseIcon() {
  return <XCircle className="h-4 w-4" />;
}
