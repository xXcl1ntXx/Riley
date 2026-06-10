import React from "react";
import Dither from "@/components/Dither";
export default function Main() {
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

      {/* Layer 3 (top): "Hello" text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Hello</h1>
      </div>
    </div>
  );
}
