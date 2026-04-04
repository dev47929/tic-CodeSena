import React from 'react';
import { TerminalSquare } from 'lucide-react';

export default function Freelance({ isDarkMode }) {
    return (
        <div className="w-full h-full relative">
            <div className={`w-full h-full rounded-2xl border flex flex-col items-center justify-center text-center shadow-lg transition-colors duration-500 ${isDarkMode ? 'border-[#333]/50 bg-[#0a0a0a]/50 backdrop-blur-md' : 'border-[#c47ea8]/20 bg-white/30 backdrop-blur-md'}`}>
                <TerminalSquare size={48} className="text-[#c47ea8]/60 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Freelance Config</h3>
                <p className={isDarkMode ? 'text-gray-400 max-w-md' : 'text-gray-600 max-w-md'}>The specific Freelance tab has been unlinked and isolated. Waiting for future structural configuration.</p>
            </div>
        </div>
    );
}
