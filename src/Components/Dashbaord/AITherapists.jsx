import React, { useState } from 'react';
import { 
    Video, Phone, Star, BellOff, MoreHorizontal, 
    Check, CheckCheck, Smile, Paperclip, Send, Brain
} from 'lucide-react';

export default function AITherapists() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hi there, I'm your AI therapist. I noticed you've been working late recently. How are you feeling today? Remember that this is a safe space.",
            time: '1 hours ago',
            status: 'Seen',
        },
        {
            id: 2,
            sender: 'user',
            text: "Honestly, I've been a bit overwhelmed with deadlines and it feels like I've been charged twice for all the stress.",
            time: '2 Hours ago',
            status: 'Sent',
        },
        {
            id: 3,
            sender: 'ai',
            text: "I completely understand. It's completely natural to feel overwhelmed when responsibilities stack up. Let's process this together. What exactly is taking up most of your mental space right now?",
            time: '2 Hours ago',
            status: 'Seen',
        },
        {
            id: 4,
            sender: 'user',
            text: "Perfect. Thanks so much for listening and for making it easy to just talk without judgment.",
            time: 'Just now',
            status: 'Sent',
        }
    ]);

    const [inputText, setInputText] = useState("");

    return (
        <div className="w-full h-full flex flex-col bg-[#0a0a0a]/50 rounded-2xl overflow-hidden font-sans border border-[#333]/50 shadow-inner">
            {/* Header */}
            <div className="h-16 border-b border-[#262626]/60 bg-[#111111]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#f5d6e4] flex items-center justify-center overflow-hidden border border-[#c47ea8]/30">
                            <Brain size={20} className="text-[#c47ea8]" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#eab308] border-2 border-[#111] rounded-full"></div>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="font-semibold text-gray-200 text-sm">Aadya AI</span>
                        <span className="text-xs text-gray-500">Active 24m ago</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <Video size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <Phone size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <Star size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <BellOff size={18} className="hover:text-white cursor-pointer transition-colors" />
                    <MoreHorizontal size={18} className="hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg) => {
                    const isAi = msg.sender === 'ai';
                    
                    return (
                        <div key={msg.id} className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                            <div className={`flex gap-3 max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                                
                                {/* Avatar */}
                                <div className="shrink-0 pt-1">
                                    {isAi ? (
                                        <div className="w-8 h-8 rounded-full bg-[#f5d6e4] flex items-center justify-center border border-[#c47ea8]/30">
                                            <Brain size={16} className="text-[#c47ea8]" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shadow-sm border border-gray-600">
                                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80" alt="User" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`relative group p-4 text-sm leading-relaxed shadow-sm ${
                                    isAi 
                                    ? 'bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl rounded-tl-sm border border-[#333]/50 text-gray-300' 
                                    : 'bg-[#2d1f3d]/80 backdrop-blur-md rounded-2xl rounded-tr-sm border border-[#c47ea8]/30 text-indigo-50'
                                }`}>
                                    {msg.text}

                                    {/* Hover Emoji Reaction mockup (only on AI messages for layout replication) */}
                                    {isAi && (
                                        <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <div className="p-1.5 rounded-full bg-[#333] border border-[#444] hover:bg-[#444] text-gray-300">
                                                <Smile size={14} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Meta Data (Below bubble) */}
                            <div className={`flex items-center gap-1.5 mt-1.5 text-[11px] text-gray-500 font-medium ${isAi ? 'ml-11' : 'mr-11'}`}>
                                {!isAi && <span>{msg.time}</span>}
                                {msg.status === 'Seen' ? (
                                    <>
                                        <span className="text-gray-400">Seen</span>
                                        <CheckCheck size={14} className="text-emerald-500" />
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-400">Sent</span>
                                        <Check size={14} className="text-emerald-500" />
                                    </>
                                )}
                                {isAi && <span>{msg.time}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#262626]/60 bg-[#111111]/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#333]/60 rounded-full py-2 px-4 shadow-inner focus-within:border-gray-500 transition-colors">
                    <Paperclip size={18} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message here..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-600 px-2"
                    />
                    <Smile size={18} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
                    <div className="bg-[#c47ea8] p-1.5 rounded-full cursor-pointer hover:bg-[#a9668e] transition-colors shadow-sm ml-1">
                        <Send size={14} className="text-[#1a1025] ml-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
