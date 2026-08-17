"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select one",
  disabled = false,
  invalid = false,
  describedBy,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Real select stays in the DOM, visually hidden, so this still
          behaves like a normal form field for validation and submission. */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute size-0 opacity-0"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => setOpen((v) => !v)}
        className={cn(
        "flex w-full items-center justify-between border border-ash/30 bg-transparent px-4 py-3 text-left text-sm text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-50",
        invalid && "border-ember",
        open && "border-paper/50"
        )}
      >
        <span className={value ? "text-paper" : "text-ash/60"}>{value || placeholder}</span>
        <ChevronDown
          className={cn("size-4 text-ash transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full border border-ash/30 bg-ink shadow-lg"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={value === opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-3 text-left text-sm text-paper transition-colors hover:bg-ember/10 hover:text-ember",
                  value === opt && "bg-ember/10 text-ember"
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}