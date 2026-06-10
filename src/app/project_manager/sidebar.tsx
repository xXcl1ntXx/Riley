import React, { useState } from "react";
import type { project, all_projects } from "../../types/project.types";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SidebarProps {
  projects: all_projects;
  active_project: project;
  set_active_project: (project: project) => void;
}

export default function Sidebar({ projects, active_project, set_active_project }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Helper to accurately reflect the active project based on its title or ID
  const isActive = (proj: project) => active_project?.title === proj.title;

  return (
    <aside
      className={`relative h-screen flex-shrink-0 transition-all duration-300 ease-in-out z-20 ${
        isOpen ? "w-72" : "w-0"
      }`}
    >
      {/* Sidebar Content Container */}
      <div
        className={`absolute top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"
        }`}
      >
        {/* Fixed width inner container prevents text squishing during the collapse animation */}
        <div className="w-72 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100 bg-white">
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">
              Projects
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold border border-cyan-100">
              {projects.length}
            </span>
          </div>

          {/* Projects List */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-gray-50/30">
            {projects.map((proj: project, idx: number) => {
              const active = isActive(proj);

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredProject(idx)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => set_active_project(proj)}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                    active
                      ? "bg-white shadow-sm border border-gray-200"
                      : "hover:bg-gray-100/80 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    {/* Project Icon / Status Indicator */}
                    <div className="relative flex-shrink-0 flex items-center justify-center w-5 h-5">
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          active
                            ? "bg-cyan-500 scale-125 shadow-sm shadow-cyan-500/30"
                            : hoveredProject === idx
                            ? "bg-cyan-400"
                            : "bg-gray-300"
                        }`}
                      />
                    </div>

                    {/* Project Info */}
                    <div className="truncate">
                      <h3
                        className={`text-sm font-medium transition-colors duration-200 truncate ${
                          active
                            ? "text-cyan-700"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                      >
                        {proj.title}
                      </h3>
                      {proj.content && proj.content.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {proj.content.length} item{proj.content.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                      active
                        ? "opacity-100 text-cyan-500"
                        : hoveredProject === idx
                        ? "opacity-100 translate-x-0 text-gray-400"
                        : "opacity-0 -translate-x-2 text-gray-300"
                    }`}
                  />

                  {/* Active Edge Indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-8 -right-3.5 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-cyan-600 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${
            !isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </aside>
  );
}