import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderColor = 'var(--accent-gold)';
        let iconColor = 'var(--accent-gold)';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderColor = 'var(--accent-terracotta)';
          iconColor = 'var(--accent-terracotta)';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderColor = 'var(--border-medium)';
          iconColor = 'var(--text-secondary)';
        }

        return (
          <div
            key={toast.id}
            className="animate-slide-up"
            style={{
              pointerEvents: 'auto',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: `1px solid ${borderColor}`,
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4 }}>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss alert"
              style={{
                color: 'var(--text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
