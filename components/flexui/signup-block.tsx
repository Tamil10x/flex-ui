"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SignupBlockProps {
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Number of steps */
  steps?: string[];
  /** Callback on form submit */
  onSubmit?: (data: { name: string; email: string; password: string }) => void | Promise<void>;
  /** Link to sign in */
  signInHref?: string;
  className?: string;
}

export function SignupBlock({
  heading = "Create your account",
  subtitle = "Get started in just a few steps.",
  steps = ["Account", "Profile", "Done"],
  onSubmit,
  signInHref = "#",
  className,
}: SignupBlockProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1]";

  const handleNext = useCallback(async () => {
    if (currentStep === 0) {
      if (!email || !password) return;
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (!name) return;
      setLoading(true);
      try {
        await onSubmit?.({ name, email, password });
        setCurrentStep(2);
      } finally {
        setLoading(false);
      }
    }
  }, [currentStep, name, email, password, onSubmit]);

  return (
    <section className={cn("flex min-h-screen items-center justify-center px-6 py-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white">{heading}</h2>
        {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
                    i <= currentStep
                      ? "bg-white text-zinc-950"
                      : "border border-white/[0.08] text-zinc-600"
                  )}
                >
                  {i < currentStep ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={cn("hidden text-xs sm:inline", i <= currentStep ? "text-white" : "text-zinc-600")}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1 transition-colors", i < currentStep ? "bg-white/30" : "bg-white/[0.06]")} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="signup-email" className="mb-1.5 block text-xs font-medium text-zinc-400">Email</label>
                  <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="signup-password" className="mb-1.5 block text-xs font-medium text-zinc-400">Password</label>
                  <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required className={inputClass} />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="signup-name" className="mb-1.5 block text-xs font-medium text-zinc-400">Full name</label>
                  <input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required className={inputClass} />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-white/[0.08] text-sm text-zinc-300 transition-all hover:bg-white/[0.04]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-white text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:opacity-50"
                  >
                    {loading ? "Creating…" : "Create account"}
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-emerald-400">Account created successfully!</p>
                <p className="mt-1 text-xs text-zinc-500">Welcome aboard, {name}.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentStep < 2 && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <a href={signInHref} className="text-white transition-colors hover:text-zinc-300">
              Sign in
            </a>
          </p>
        )}
      </motion.div>
    </section>
  );
}
