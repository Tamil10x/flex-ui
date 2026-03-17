"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
} from "react";
import { ArrowLeftIcon } from "lucide-react";
import { AnimatePresence, motion, MotionConfig, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Shared transition ─────────────────────────────────────────────────────
const TRANSITION = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.4,
};

// ─── Context ────────────────────────────────────────────────────────────────
interface FloatingPanelContextType {
  isOpen: boolean;
  openFloatingPanel: (rect: DOMRect) => void;
  closeFloatingPanel: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
  triggerRect: DOMRect | null;
  title: string;
  setTitle: (title: string) => void;
}

const FloatingPanelContext = createContext<FloatingPanelContextType | undefined>(
  undefined
);

function useFloatingPanel() {
  const context = useContext(FloatingPanelContext);
  if (!context) {
    throw new Error(
      "useFloatingPanel must be used within a FloatingPanelRoot"
    );
  }
  return context;
}

function useFloatingPanelLogic() {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [title, setTitle] = useState("");

  const openFloatingPanel = useCallback((rect: DOMRect) => {
    setTriggerRect(rect);
    setIsOpen(true);
  }, []);

  const closeFloatingPanel = useCallback(() => {
    setIsOpen(false);
    setNote("");
  }, []);

  return {
    isOpen,
    openFloatingPanel,
    closeFloatingPanel,
    uniqueId,
    note,
    setNote,
    triggerRect,
    title,
    setTitle,
  };
}

// ─── Root ───────────────────────────────────────────────────────────────────
interface FloatingPanelRootProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelRoot({
  children,
  className,
}: FloatingPanelRootProps) {
  const floatingPanelLogic = useFloatingPanelLogic();

  return (
    <FloatingPanelContext.Provider value={floatingPanelLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className={cn("relative", className)}>{children}</div>
      </MotionConfig>
    </FloatingPanelContext.Provider>
  );
}

// ─── Trigger ────────────────────────────────────────────────────────────────
interface FloatingPanelTriggerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export function FloatingPanelTrigger({
  children,
  className,
  title,
}: FloatingPanelTriggerProps) {
  const { openFloatingPanel, uniqueId, setTitle } = useFloatingPanel();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (triggerRef.current) {
      openFloatingPanel(triggerRef.current.getBoundingClientRect());
      setTitle(title);
    }
  };

  return (
    <motion.button
      ref={triggerRef}
      layoutId={`floating-panel-trigger-${uniqueId}`}
      className={cn(
        "flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-800 px-4 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700",
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-haspopup="dialog"
      aria-expanded={false}
    >
      <motion.div
        layoutId={`floating-panel-label-container-${uniqueId}`}
        className="flex items-center gap-2"
      >
        <motion.span
          layoutId={`floating-panel-label-${uniqueId}`}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}

// ─── Content ────────────────────────────────────────────────────────────────
interface FloatingPanelContentProps {
  children: React.ReactNode;
  className?: string;
}

function clampPosition(
  triggerRect: DOMRect | null,
  panelWidth: number
) {
  if (!triggerRect) return { left: "50%", top: "50%" };

  const padding = 16;
  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

  let left = triggerRect.left;
  const top = triggerRect.bottom + 8;

  // Clamp right edge
  if (left + panelWidth + padding > viewportW) {
    left = viewportW - panelWidth - padding;
  }
  // Clamp left edge
  if (left < padding) {
    left = padding;
  }

  return {
    left: Math.round(left),
    top: Math.min(top, viewportH - 300),
  };
}

export function FloatingPanelContent({
  children,
  className,
}: FloatingPanelContentProps) {
  const { isOpen, closeFloatingPanel, uniqueId, triggerRect, title } =
    useFloatingPanel();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closeFloatingPanel();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeFloatingPanel]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFloatingPanel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeFloatingPanel]);

  const panelWidth = 320;
  const pos = clampPosition(triggerRect, panelWidth);

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 6 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />
          {/* Panel */}
          <motion.div
            ref={contentRef}
            className={cn(
              "fixed z-50 w-[320px] overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl shadow-black/50",
              className
            )}
            style={{
              left: pos.left,
              top: pos.top,
              transformOrigin: "top left",
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`floating-panel-title-${uniqueId}`}
          >
            {/* Title */}
            {title && (
              <div className="border-b border-white/[0.06] px-4 py-3">
                <p
                  className="text-sm font-semibold text-zinc-100"
                  id={`floating-panel-title-${uniqueId}`}
                >
                  {title}
                </p>
              </div>
            )}
            {/* Scrollable content */}
            <div className="max-h-[60vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Form ───────────────────────────────────────────────────────────────────
interface FloatingPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

export function FloatingPanelForm({
  children,
  onSubmit,
  className,
}: FloatingPanelFormProps) {
  const { note, closeFloatingPanel } = useFloatingPanel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closeFloatingPanel();
  };

  return (
    <form
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

// ─── Label ──────────────────────────────────────────────────────────────────
interface FloatingPanelLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

export function FloatingPanelLabel({
  children,
  htmlFor,
  className,
}: FloatingPanelLabelProps) {
  const { note } = useFloatingPanel();

  return (
    <motion.label
      htmlFor={htmlFor}
      style={{ opacity: note ? 0 : 1 }}
      className={cn(
        "mb-2 block px-4 pt-3 text-xs font-medium uppercase tracking-wider text-zinc-500",
        className
      )}
    >
      {children}
    </motion.label>
  );
}

// ─── Textarea ───────────────────────────────────────────────────────────────
interface FloatingPanelTextareaProps {
  className?: string;
  id?: string;
  placeholder?: string;
}

export function FloatingPanelTextarea({
  className,
  id,
  placeholder = "Type something...",
}: FloatingPanelTextareaProps) {
  const { note, setNote } = useFloatingPanel();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <textarea
      ref={textareaRef}
      id={id}
      placeholder={placeholder}
      className={cn(
        "min-h-[120px] w-full resize-none bg-transparent px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600",
        className
      )}
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────
interface FloatingPanelHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelHeader({
  children,
  className,
}: FloatingPanelHeaderProps) {
  return (
    <motion.div
      className={cn(
        "px-4 py-3 text-sm font-semibold text-zinc-100",
        className
      )}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Body ───────────────────────────────────────────────────────────────────
interface FloatingPanelBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelBody({
  children,
  className,
}: FloatingPanelBodyProps) {
  return (
    <motion.div
      className={cn("p-2", className)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
interface FloatingPanelFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelFooter({
  children,
  className,
}: FloatingPanelFooterProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Close Button ───────────────────────────────────────────────────────────
interface FloatingPanelCloseButtonProps {
  className?: string;
}

export function FloatingPanelCloseButton({
  className,
}: FloatingPanelCloseButtonProps) {
  const { closeFloatingPanel } = useFloatingPanel();

  return (
    <motion.button
      type="button"
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-200",
        className
      )}
      onClick={closeFloatingPanel}
      aria-label="Close floating panel"
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeftIcon size={14} />
    </motion.button>
  );
}

// ─── Submit Button ──────────────────────────────────────────────────────────
interface FloatingPanelSubmitButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function FloatingPanelSubmitButton({
  className,
  children,
}: FloatingPanelSubmitButtonProps) {
  return (
    <motion.button
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.1] hover:text-white",
        className
      )}
      type="submit"
      aria-label="Submit note"
      whileTap={{ scale: 0.97 }}
    >
      {children || "Submit Note"}
    </motion.button>
  );
}

// ─── Generic Button ─────────────────────────────────────────────────────────
interface FloatingPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FloatingPanelButton({
  children,
  onClick,
  className,
}: FloatingPanelButtonProps) {
  return (
    <motion.button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-100",
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
