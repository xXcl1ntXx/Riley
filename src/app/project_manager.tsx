import React, { useState } from "react";
import { Search, ArrowUpDown, Plus, Filter, MoreHorizontal } from "lucide-react";

// components
import Dither from "@/components/Dither";
import SpotlightCard from "@/components/SpotlightCard";

// my components
import Chat from "./project_manager/chat";
import type {
  project_content,
  all_projects,
  project,
} from "../types/project.types";
import Sidebar from "./project_manager/sidebar";

export default function ProjectManager() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [all_projects, set_all_projects] = useState<all_projects>(() => {
    const savedProjects = localStorage.getItem("RileyProjects");
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    return [];
  });
  
  const [active_project, set_active_project] = useState<project | null>(() => {
    if (all_projects.length > 0) {
      return all_projects[0];
    }
    return null;
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950">
      {/* Base dark background added to ensure contrast if Dither is transparent */}
      
      {/* Layer 1 (bottom): Dither with animation */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Dither
          waveColor={[0.1, 0.8, 0.9]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0}
          colorNum={2.5}
          waveAmplitude={0}
          waveFrequency={0}
          waveSpeed={0.04}
        />
      </div>

      {/* Layer 2 (middle): Deep overlay for text legibility */}
      <div className="absolute inset-0 z-0 bg-gray-900/60 backdrop-blur-sm"></div>

      {/* Layer 3 (top): Main UI */}
      <div className="relative z-10 flex flex-row h-full w-full">
        <Sidebar
          projects={all_projects}
          active_project={active_project!}
          set_active_project={(project) => {
            console.log("changing", project);
            set_active_project(project);
          }}
        />
        
        <div className="flex-1 flex flex-col items-center p-6 sm:p-10 pb-32 h-full overflow-hidden">
          {/* --- Search & Sort Section --- */}
          <div className="w-full max-w-6xl flex flex-wrap sm:flex-nowrap items-center gap-3 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300 text-white placeholder:text-gray-500 hover:bg-white/10"
              />
            </div>

            {/* Sort Button */}
            <button className="p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group">
              <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Filter Button */}
            <button className="p-3 rounded-2xl bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 shadow-lg hover:bg-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group">
              <Filter className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </button>

            {/* New Project Button */}
            <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 group flex items-center gap-2 border border-white/10">
              <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-white font-medium tracking-wide hidden sm:inline">
                New Project
              </span>
            </button>
          </div>

          {/* --- Cards Section --- */}
          <div className="w-full max-w-6xl flex-1 overflow-y-auto no-scrollbar pb-20 pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-start">
              {active_project?.content?.map(
                (item: project_content, index: number) => {
                  return (
                    <SpotlightCard
                      key={index}
                      className="custom-spotlight-card h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer flex flex-col group hover:-translate-y-1 hover:border-white/20"
                      spotlightColor="rgba(0, 229, 255, 0.15)"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                        </div>
                        <div className="w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center justify-center">
                          <MoreHorizontal className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200 tracking-tight">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 flex-1 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                        {item.information}
                      </p>
                      
                      {/* Card Footer */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-xs text-cyan-400 font-semibold tracking-wide uppercase">
                          Read more
                        </span>
                        <span className="text-cyan-400 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </SpotlightCard>
                  );
                }
              )}
            </div>
          </div>

          <Chat />
        </div>
      </div>
    </div>
  );
}