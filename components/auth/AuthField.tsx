import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function AuthField({
  id,
  label,
  className = "",
  ...inputProps
}: AuthFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      <input
        {...inputProps}
        id={id}
        name={id}
        className={`w-full rounded-lg border border-border bg-white
          px-4 py-3 text-text-primary outline-none transition
          placeholder:text-text-muted focus:border-tibeb-green
          focus:ring-2 focus:ring-tibeb-green/10
          disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      />
    </div>
  );
}
