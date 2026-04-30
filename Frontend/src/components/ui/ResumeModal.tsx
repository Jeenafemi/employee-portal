// components/ResumeModal.tsx

import React from 'react';

interface ResumeModalProps {
  pdfPath: string;
  open: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ pdfPath, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  <div className="relative bg-whit shadow-lg w-full h-full rounded-md">
    <button
      onClick={onClose}
      className="absolute top-0 right-5 text-red-600 text-2xl font-bold hover:text-red-800"
    >
      ✕
    </button>

    <div className="w-full h-full pt-10">
      <iframe
        src={pdfPath}
        title="Resume PDF"
        className="w-full h-full border rounded-md"
      />
    </div>
  </div>
</div>

  );
};

export default ResumeModal;
