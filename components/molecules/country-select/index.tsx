"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

type CountryOption = {
  value?: string;
  label: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

export const CustomCountrySelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  iconComponent: Icon,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [popoverRect, setPopoverRect] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const safeCallingCode = (countryCode?: string) => {
    if (!countryCode) return "";
    try {
      return getCountryCallingCode(countryCode as CountryCode);
    } catch {
      return "";
    }
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return options;
    return options?.filter((opt: CountryOption) => {
      const label = opt.label?.toLowerCase() ?? "";
      const code = safeCallingCode(opt.value);
      return (
        label.includes(term) ||
        (opt.value ?? "").toLowerCase().includes(term) ||
        (code && code.includes(term.replace("+", "")))
      );
    });
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const updatePopoverPosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || typeof window === "undefined") return;

    const rect = trigger.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(320, window.innerWidth - margin * 2);
    const left = Math.min(
      Math.max(rect.left, margin),
      window.innerWidth - width - margin
    );

    const spaceBelow = window.innerHeight - rect.bottom - margin;
    const spaceAbove = rect.top - margin;
    const minimumBelow = 200;
    const preferAbove = spaceBelow < minimumBelow && spaceAbove > spaceBelow;

    const available = preferAbove ? spaceAbove - 8 : spaceBelow - 8;
    const height = Math.max(180, Math.min(420, available));

    const top = preferAbove
      ? Math.max(margin, rect.top - height - 8)
      : Math.min(rect.bottom + 8, window.innerHeight - margin - height);

    setPopoverRect({ top, left, width, maxHeight: height });
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePopoverPosition();
    const focusTimer = window.setTimeout(() => {
      searchRef.current?.focus();
    }, 0);

    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition, true);

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition, true);
      window.clearTimeout(focusTimer);
    };
  }, [open, updatePopoverPosition]);

  const renderOption = (opt: CountryOption) => {
    const callingCode = safeCallingCode(opt.value);
    const isActive = opt.value === value;
    return (
      <li
        key={opt.value ?? opt.label}
        className={`country-select-option ${isActive ? "is-active" : ""}`}
        onClick={() => {
          onChange?.(opt.value || undefined);
          setOpen(false);
        }}
      >
        {Icon ? (
          <span className="country-select-flag">
            <Icon country={opt.value} />
          </span>
        ) : null}
        <span className="country-option-label">{opt.label}</span>
        <span className="country-option-code">
          {callingCode ? `+${callingCode}` : ""}
        </span>
      </li>
    );
  };

  const topFive = filtered?.slice(0, 5) ?? [];
  const remaining = filtered?.slice(5) ?? [];

  return (
    <div
      ref={wrapperRef}
      className={`country-select-shell${disabled ? " is-disabled" : ""}`}
      data-testid="country-select"
    >
      <button
        ref={triggerRef}
        type="button"
        className="country-select-trigger"
        onClick={() => {
          if (disabled) return;
          if (!open) {
            updatePopoverPosition();
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
        disabled={disabled}
        aria-label="Select country"
      >
        {Icon ? (
          <span className="country-select-flag">
            <Icon country={value} />
          </span>
        ) : null}
        <span className="country-select-code">
          {value ? `+${safeCallingCode(value)}` : "+00"}
        </span>
        <span className="country-select-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div
          className="country-select-popover"
          style={{
            position: "fixed",
            top: popoverRect?.top ?? 0,
            left: popoverRect?.left ?? 0,
            width: popoverRect?.width ?? 320,
            maxHeight: popoverRect?.maxHeight ?? 400,
            overflowY: "auto",
            visibility: popoverRect ? "visible" : "hidden",
          }}
        >
          <div className="country-select-search">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country or code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="country-select-list">{topFive.map(renderOption)}</ul>
          {remaining.length > 0 && (
            <ul className="country-select-list scrollable">
              {remaining.map(renderOption)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
