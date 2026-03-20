"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

// ─── Context ────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

// ─── Icon + color config ────────────────────────────────────────────────────

const typeConfig: Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    borderColor: string;
    bgGlow: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgGlow: "bg-emerald-500/5",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-400",
    borderColor: "border-red-500/20",
    bgGlow: "bg-red-500/5",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    bgGlow: "bg-blue-500/5",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    bgGlow: "bg-amber-500/5",
  },
};

// ─── Position helpers ───────────────────────────────────────────────────────

const positionClasses: Record<string, string> = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

// ─── Single toast item ──────────────────────────────────────────────────────

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const config = typeConfig[toast.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={cn(
        "pointer-events-auto relative flex w-80 items-start gap-3 overflow-hidden rounded-xl border bg-zinc-950/95 px-4 py-3.5 shadow-2xl backdrop-blur-2xl",
        config.borderColor
      )}
    >
      {/* Subtle background glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          config.bgGlow
        )}
      />

      <Icon className={cn("relative z-10 mt-0.5 h-5 w-5 shrink-0", config.iconColor)} />

      <p className="relative z-10 flex-1 text-sm leading-relaxed text-zinc-200">
        {toast.message}
      </p>

      <button
        onClick={() => onDismiss(toast.id)}
        className="relative z-10 mt-0.5 shrink-0 rounded-md p-0.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── Provider ───────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: React.ReactNode;
  position?: "top-right" | "top-center" | "bottom-right" | "bottom-center";
}

const MAX_VISIBLE = 5;

export function ToastProvider({
  children,
  position = "top-right",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration: number = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newToast: Toast = { id, message, type, duration };

      setToasts((prev) => {
        const next = [...prev, newToast];
        // Dismiss oldest if over max
        if (next.length > MAX_VISIBLE) {
          const removed = next.shift();
          if (removed) {
            const timer = timersRef.current.get(removed.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(removed.id);
            }
          }
        }
        return next;
      });

      // Auto-dismiss
      if (duration > 0) {
        const timer = setTimeout(() => {
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }
    },
    [dismiss]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed z-[100] flex flex-col gap-2",
          positionClasses[position]
        )}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
