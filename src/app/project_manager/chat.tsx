import React, { useState } from "react";

export default function Chat() {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  
  const handleChatKeyDown = (e) => {
    // Closes and "sends" when Enter is pressed (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // TODO: Add your message sending logic here in the future
      setChatMessage("");
      setIsChatExpanded(false);
      e.target.blur(); // Unfocuses the input
    }
  };

  return (
    <>
      {/* --- Chatbot Section --- */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 sm:px-10 z-50">
        {/* This is where the person chats to a chatbot */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            bg-white/85 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden
            ${isChatExpanded ? 'h-40 shadow-2xl scale-[1.02] -translate-y-2' : 'h-14 shadow-lg'}
          `}
        >
          <textarea
            className="w-full h-full p-4 px-6 bg-transparent resize-none focus:outline-none placeholder:text-gray-500 text-gray-800"
            placeholder="Ask me anything..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onFocus={() => setIsChatExpanded(true)}
            onBlur={() => setIsChatExpanded(false)}
            onKeyDown={handleChatKeyDown}
          />
        </div>
      </div>
    </>
  );
}