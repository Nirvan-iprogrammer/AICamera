import React from 'react';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-3/5 bg-white rounded-2xl p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}