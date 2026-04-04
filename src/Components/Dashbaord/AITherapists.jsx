import React, { useState } from 'react';
import { 
    Video, Phone, Star, BellOff, MoreHorizontal, 
    Check, CheckCheck, Smile, Paperclip, Send, Brain, Volume2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AITherapists({ isDarkMode = true }) {
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

    const { token } = useAuth();
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!inputText.trim() || !token) return;

        // Optimistic UI push
        const currentInput = inputText;
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: currentInput,
            time: 'Just now',
            status: 'Sent',
        };
        
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsLoading(true);

        try {
            const response = await fetch("https://app.totalchaos.online/ai/therapist/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: currentInput })
            });

            if (!response.ok) throw new Error("Backend response error");

            const data = await response.json();
            
            // Extract response (handles common JSON mapped structures)
            const aiText = data.reply || data.response || data.message || data.text || (typeof data === 'string' ? data : "Could not parse AI response.");

            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiText,
                time: 'Just now',
                status: 'Sent',
            };
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error("AI chat sequence failed:", error);
            const errMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "⚠️ System offline. Please check your network connection or token validity.",
                time: 'Just now',
                status: 'Error',
            };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    // Native Browser TTS Audio Pipeline
    const handleTTS = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop current speech if overlapping
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95; // Slightly calmer tempo for therapist
            
            // Attempt female voice priority
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha'));
            if (femaleVoice) utterance.voice = femaleVoice;
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Your browser does not support Text-to-Speech.");
        }
    };

    return (
        <div className={`w-full h-full flex flex-col rounded-2xl overflow-hidden font-sans border shadow-inner transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a]/50 border-[#333]/50' : 'bg-transparent backdrop-blur-md border-[#c47ea8]/20'}`}>
            {/* Header */}
            <div className={`h-16 border-b backdrop-blur-md px-6 flex items-center justify-between shrink-0 transition-colors duration-500 ${isDarkMode ? 'border-[#262626]/60 bg-[#111111]/80' : 'border-gray-200 bg-white/70 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#f5d6e4] flex items-center justify-center overflow-hidden border border-[#c47ea8]/30">
                            <Brain size={20} className="text-[#c47ea8]" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#eab308] border-2 border-[#111] rounded-full"></div>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Aadya AI</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Active 24m ago</span>
                    </div>
                </div>

                <div className={`flex items-center gap-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Video size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`} />
                    <Phone size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`} />
                    <Star size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`} />
                    <BellOff size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`} />
                    <MoreHorizontal size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`} />
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
                                <div className={`relative group p-4 text-[15px] font-medium leading-relaxed shadow-sm transition-colors duration-500 ${
                                    isAi 
                                    ? isDarkMode 
                                        ? 'bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl rounded-tl-sm border border-[#333]/50 text-gray-300' 
                                        : 'bg-white rounded-2xl rounded-tl-sm border border-gray-200 text-gray-700 shadow-sm'
                                    : isDarkMode
                                        ? 'bg-[#2d1f3d]/80 backdrop-blur-md rounded-2xl rounded-tr-sm border border-[#c47ea8]/30 text-indigo-50'
                                        : 'bg-[#fff0f5] rounded-2xl rounded-tr-sm border border-[#fce8f0] text-[#4a3f5c] shadow-sm'
                                }`}>
                                    {msg.text}

                                    {/* Action Hover Toolkit (Only on AI messages for TTS) */}
                                    {isAi && (
                                        <div className={`absolute top-1/2 -right-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5 cursor-pointer z-10`}>
                                            <div 
                                                onClick={() => handleTTS(msg.text)} 
                                                className={`p-1.5 rounded-full border shadow-sm transition-colors ${
                                                    isDarkMode 
                                                    ? 'bg-[#333] border-[#444] hover:bg-[#c47ea8] text-gray-300 hover:text-white' 
                                                    : 'bg-white border-gray-200 hover:bg-[#c47ea8] hover:border-[#c47ea8] text-gray-400 hover:text-white'
                                                }`}
                                                title="Read text aloud"
                                            >
                                                <Volume2 size={13} />
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
            <div className={`p-4 border-t backdrop-blur-md shrink-0 transition-colors duration-500 ${isDarkMode ? 'border-[#262626]/60 bg-[#111111]/80' : 'border-gray-200 bg-white/70 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]'}`}>
                <div className={`flex items-center gap-3 rounded-full py-2 px-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#1A1A1A] border border-[#333]/60 shadow-inner focus-within:border-gray-500' : 'bg-white border border-gray-200 shadow-sm focus-within:border-gray-400 focus-within:shadow-md'}`}>
                    <Paperclip size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-800'}`} />
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isLoading ? "AI is typing..." : "Type your message here..."} 
                        disabled={isLoading}
                        className={`flex-1 bg-transparent border-none outline-none text-sm px-2 ${isDarkMode ? 'text-gray-200 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
                    />
                    <Smile size={18} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-800'}`} />
                    <div 
                        onClick={handleSend} 
                        className={`${isLoading ? 'bg-gray-500 cursor-wait' : 'bg-[#c47ea8] cursor-pointer hover:bg-[#a9668e]'} p-1.5 rounded-full transition-colors shadow-sm ml-1`}
                    >
                        <Send size={14} className={`${isLoading ? 'text-gray-300' : 'text-[#1a1025]'} ml-0.5`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
