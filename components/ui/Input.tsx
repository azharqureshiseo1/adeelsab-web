'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '@/lib/utils';

const FIELD_BASE =
  'w-full rounded-[10px] border bg-white px-4 text-base text-ink-900 placeholder:text-ink-400 transition-colors duration-150 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-ink-050';

function Shell({
  label,
  hint,
  error,
  required,
  id,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
        {required ? (
          <span aria-hidden className="text-brand-600">
            {' *'}
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-[#C42B1C]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type FieldProps = { label: string; hint?: string; error?: string };

export function Input({
  label,
  hint,
  error,
  className,
  required,
  ...props
}: FieldProps & ComponentProps<'input'>) {
  const generated = useId();
  const id = props.id ?? generated;

  return (
    <Shell label={label} hint={hint} error={error} required={required} id={id}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          FIELD_BASE,
          'h-12',
          error ? 'border-[#C42B1C]' : 'border-ink-200',
          className,
        )}
        {...props}
      />
    </Shell>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  required,
  ...props
}: FieldProps & ComponentProps<'textarea'>) {
  const generated = useId();
  const id = props.id ?? generated;

  return (
    <Shell label={label} hint={hint} error={error} required={required} id={id}>
      <textarea
        id={id}
        required={required}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          FIELD_BASE,
          'py-3 leading-relaxed',
          error ? 'border-[#C42B1C]' : 'border-ink-200',
          className,
        )}
        {...props}
      />
    </Shell>
  );
}

export function Select({
  label,
  hint,
  error,
  className,
  required,
  placeholder,
  options,
  ...props
}: FieldProps &
  ComponentProps<'select'> & {
    placeholder: string;
    options: Array<{ value: string; label: string }>;
  }) {
  const generated = useId();
  const id = props.id ?? generated;

  return (
    <Shell label={label} hint={hint} error={error} required={required} id={id}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          FIELD_BASE,
          'h-12 appearance-none bg-[length:18px] bg-no-repeat pe-10',
          // Chevron drawn inline so no network request is needed for a form control.
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237C8797' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")]",
          'bg-[position:right_1rem_center] rtl:bg-[position:left_1rem_center]',
          error ? 'border-[#C42B1C]' : 'border-ink-200',
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}
