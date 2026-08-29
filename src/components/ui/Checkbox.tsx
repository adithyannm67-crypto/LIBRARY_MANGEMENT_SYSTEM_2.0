import React from 'react';
import { Check, Minus } from 'lucide-react';

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  label?: string;
}

export default function Checkbox({ checked, indeterminate, onChange, disabled, label }: CheckboxProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <span
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        tabIndex={0}
        onClick={!disabled ? onChange : undefined}
        onKeyDown={e => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onChange?.(); } }}
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1.5px solid ${checked || indeterminate ? 'var(--accent)' : 'var(--border)'}`,
          background: checked || indeterminate ? 'var(--accent)' : 'var(--card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 120ms ease',
          flexShrink: 0,
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {indeterminate
          ? <Minus size={10} color="#fff" strokeWidth={2.5} />
          : checked
          ? <Check size={10} color="#fff" strokeWidth={2.5} />
          : null}
      </span>
      {label && <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{label}</span>}
    </label>
  );
}
