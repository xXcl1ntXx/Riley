import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown } from "lucide-react";


// components
import Dither from "@/components/Dither";
import SpotlightCard from "@/components/SpotlightCard";

// my compnents
import Chat from "./project_manager/chat";
import type { project_content, all_projects,project } from "../types/project.types";
import Sidebar from "./project_manager/sidebar";


export default function ProjectManager() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [all_projects, set_all_projects] = useState(() => {
    const savedProjects = localStorage.getItem("RileyProjects");
    if (savedProjects) {
      
      return JSON.parse(savedProjects);
    }
    return [];
  });
  const [active_project, set_active_project] = useState<project>(() => {
    if (all_projects.length > 0) {
      // DEFAULT VALUE IS THE FIRST PROJECT 
      // DEFAULT VALUE IS THE FIRST PROJECT 
      // DEFAULT VALUE IS THE FIRST PROJECT 
      return all_projects[0];
    }
    return null;
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Layer 1 (bottom): Dither with animation */}
      <div className="absolute inset-0">
        <Dither
          waveColor={[1, 0.9725490196078431, 0.8823529411764706]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0}
          colorNum={2.5}
          waveAmplitude={0}
          waveFrequency={0}
          waveSpeed={0.04}
        />
      </div>

      {/* Layer 2 (middle): Semi-blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>


    
      
      {/* Layer 3 (top): */}
      {/* Layer 3 (top): */}
      {/* Layer 3 (top): */}
      {/* Layer 3 (top): */}


      <Sidebar
        projects={all_projects}
      /> 



      
      <div className="absolute inset-0 flex flex-col items-center p-6 sm:p-10 pb-32">
        {/* --- Search & Sort Section --- */}
        <div className="w-full max-w-6xl flex items-center gap-3 mb-8">
          {/* Search here for cards also with sorts */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all text-gray-800 placeholder:text-gray-500"
            />
          </div>
          <button className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:bg-white/80 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
            <ArrowUpDown className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* --- Cards Section --- */}
        <div className="w-full max-w-6xl flex-1 overflow-y-auto no-scrollbar">
          {/* Where all cards are shown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 content-start pb-20">
            {active_project.content.map((item:project_content, index:number) => {
              return (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card h-full p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 flex-1">{item.information}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        <Chat />
        
        
      </div>
    </div>
  );
}
