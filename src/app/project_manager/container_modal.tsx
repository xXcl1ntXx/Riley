import React, { useEffect } from 'react';
import type { project_content } from '../../types/project.types';
import { X } from 'lucide-react';

interface ContainerModalProps {
  project: project_content;
  onClose: () => void;
}

export default function ContainerModal({ project, onClose }: ContainerModalProps) {
  console.log("the project is ", project)
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Dimmed Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-xl bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glowing Top Edge */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                Project Details
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all duration-200 group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-[15px]">
              {project.information || "No description provided for this project."}
            </p>
          </div>
          
          {/* Add more project details here if needed */}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all duration-200"
          >
            Close
          </button>
          
          <button 
            onClick={() => {
              /* Add your primary action here */
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 border border-cyan-400/20"
          >
            Open Project
          </button>
        </div>
      </div>
    </div>
  );
}