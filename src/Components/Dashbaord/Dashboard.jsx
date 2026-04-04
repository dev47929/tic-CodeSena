import React, { useState } from 'react';
import {
    Search, Bell, Settings, ChevronDown, HeartPulse,
    MessageSquare, Users, Briefcase, Menu, LogOut, TerminalSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PixelSnow from '../Generic/Snowfall';
import AITherapists from './AITherapists';
import SentimentAnalysis from './SentimentAnalysis';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('AI Therapist');

    const sidebarTabs = [
        { name: 'AI Therapist', icon: <HeartPulse size={18} /> },
        { name: 'Sentiment Analysis', icon: <MessageSquare size={18} /> },
        { name: 'Community', icon: <Users size={18} /> },
        { name: 'Freelance', icon: <Briefcase size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
            {/* SNOWFALL BACKGROUND (Spans entirety of dashboard) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <PixelSnow
                    color="#c47ea8"
                    flakeSize={0.015}
                    minFlakeSize={1.25}
                    pixelResolution={200}
                    speed={1.25}
                    density={0.3}
                    direction={125}
                    brightness={1.5}
                    depthFade={8}
                    farPlane={20}
                    gamma={0.4545}
                    variant="round"
                />
            </div>

            {/* SIDEBAR (Frosted Glass) */}
            <aside className="w-64 border-r border-[#262626]/50 bg-[#0a0a0a]/60 backdrop-blur-xl flex flex-col justify-between hidden md:flex relative z-10 shadow-2xl">
                <div>
                    {/* Brand */}
                    <div className="h-16 flex items-center gap-2 px-6 border-b border-[#262626]/50">
                        <TerminalSquare size={20} className="text-[#c47ea8]" />
                        <span className="font-serif text-xl font-bold italic tracking-tight">aadya<span className="font-sans font-normal not-italic">Circle</span></span>
                    </div>

                    {/* Navigation */}
                    <nav className="px-4 space-y-1.5 mt-6">
                        {sidebarTabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.name
                                        ? 'bg-[#c47ea8]/20 text-white shadow-sm border border-[#c47ea8]/30'
                                        : 'text-gray-400 hover:bg-[#1a1a1a]/80 hover:text-gray-200'
                                    }`}
                            >
                                <span className={`${activeTab === tab.name ? 'text-[#c47ea8]' : 'text-gray-500'}`}>
                                    {tab.icon}
                                </span>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bottom Profile Preview */}
                <div className="p-4 border-t border-[#262626]/50">
                    <div className="flex items-center justify-between p-2 -mx-2 rounded-md hover:bg-[#1a1a1a]/80 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-full bg-gray-800 overflow-hidden shadow-md">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80" alt="Avatar" className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111] rounded-full"></div>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold text-gray-200 leading-tight group-hover:text-white transition-colors">Maya Sharma</span>
                                <span className="text-xs text-gray-500">maya@example.com</span>
                            </div>
                        </div>
                        <LogOut size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-transparent">
                {/* NAVBAR (Frosted Glass) */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-[#262626]/50 bg-[#0a0a0a]/60 backdrop-blur-xl shadow-sm">
                    <div className="flex items-center gap-6">
                        <Menu size={20} className="md:hidden text-gray-400 cursor-pointer" />

                        {/* Navbar Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link to="/dashboard" className="text-sm font-semibold bg-[#222]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-md transition-colors border border-gray-700/50">Dashboard</Link>
                            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-md transition-colors">Home</Link>
                            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-md transition-colors">About Us</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-5">
                        <Search size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <Settings size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />

                        <div className="relative cursor-pointer">
                            <Bell size={18} className="text-gray-400 hover:text-white transition-colors" />
                            <div className="absolute -top-1.5 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-[2px] border-[#111]">
                                <span className="text-[9px] font-bold text-white leading-none">2</span>
                            </div>
                        </div>

                        {/* My Profile Navbar Button */}
                        <div className="flex items-center gap-2 pl-5 border-l border-[#333]/50 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-sm font-medium text-gray-300">My Profile</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </header>

                {/* DASHBOARD CONTENT SPACE */}
                <div className="flex-1 overflow-auto p-8 border-l border-[#262626]/50 bg-transparent">
                    {/* Render active content */}
                    {activeTab === 'AI Therapist' ? (
                        <AITherapists />
                    ) : activeTab === 'Sentiment Analysis' ? (
                        <SentimentAnalysis />
                    ) : (
                        <div className="w-full h-full rounded-2xl border border-dashed border-[#c47ea8]/30 bg-[#0f0f0f]/40 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:bg-[#0f0f0f]/60 transition-colors duration-500">
                            <TerminalSquare size={48} className="text-[#c47ea8]/60 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">{activeTab}</h3>
                            <p className="text-gray-400 max-w-md">The content for this module is currently empty. The snow behind is dynamically simulated.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
