import React from "react";
import type { project, all_projects } from "../../types/project.types";

const sidebar_items = ["Projects"];

export default function Sidebar({ projects }: all_projects) {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">Dashboard</h1>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4">
        {sidebar_items.map((item, index) => (
          item === "Projects" && (
            <div key={index}>
              {/* Section Title */}
              <div className="px-4 py-2">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item}
                </h2>
              </div>

              {/* Projects List */}
              <div className="mt-2">
                {projects.map((proj: project, idx: number) => (
                  <div
                    key={idx}
                    className="group relative px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Project Icon */}
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      
                      {/* Project Title */}
                      <h3 className="text-sm text-gray-300 group-hover:text-white">
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </nav>

      {/* Optional Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div>
            <p className="text-xs text-gray-400">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}