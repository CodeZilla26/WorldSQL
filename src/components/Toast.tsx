import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { ToastMessage } from '../types/game';

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'error'
            ? XCircle
            : toast.type === 'warning'
            ? AlertTriangle
            : Info;

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type || 'info'}`}>
            <Icon size={18} className="toast-icon" />
            <span>{toast.text}</span>
          </div>
        );
      })}
    </div>
  );
};
