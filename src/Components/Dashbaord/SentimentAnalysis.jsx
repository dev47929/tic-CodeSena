import React, { useState } from 'react';
import Stepper, { Step } from '../Generic/Stepper';
import { Activity, BrainCircuit, HeartPulse } from 'lucide-react';

export default function SentimentAnalysis({ isDarkMode = true }) {
    const questions = [
        {
            id: 'mood',
            title: 'Current Emotional State',
            question: 'Over the last 2 weeks, how often have you been feeling down, depressed, or hopeless?',
            options: [
                { label: 'Not at all', score: 0 },
                { label: 'Several days', score: 1 },
                { label: 'More than half the days', score: 2 },
                { label: 'Nearly every day', score: 3 }
            ]
        },
        {
            id: 'stress',
            title: 'Stress Levels',
            question: 'How would you rate your current stress level when dealing with personal or professional responsibilities?',
            options: [
                { label: 'Very Low - I feel completely in control', score: 0 },
                { label: 'Moderate - Sometimes overwhelmed', score: 1 },
                { label: 'High - Constantly stressed', score: 2 },
                { label: 'Severe - Unable to cope', score: 3 }
            ]
        },
        {
            id: 'sleep',
            title: 'Physical Well-being',
            question: 'How has your sleep quality been recently?',
            options: [
                { label: 'Excellent - Waking up rested', score: 0 },
                { label: 'Fair - Some trouble falling or staying asleep', score: 1 },
                { label: 'Poor - Frequently waking up or insomnia', score: 2 },
                { label: 'Terrible - Not sleeping at all', score: 3 }
            ]
        },
        {
            id: 'support',
            title: 'Social Support',
            question: 'Do you feel you have a reliable support system you can talk to when things get tough?',
            options: [ 
                { label: 'Yes, fully supported', score: 0 },
                { label: 'Somewhat, occasionally', score: 1 },
                { label: 'Rarely', score: 2 },
                { label: 'No, I feel isolated', score: 3 }
            ]
        },
        {
            id: 'focus',
            title: 'Cognitive Focus',
            question: 'How much difficulty have you had recently in concentrating on tasks, such as reading, working, or making decisions?',
            options: [
                { label: 'None at all', score: 0 },
                { label: 'A little difficulty', score: 1 },
                { label: 'Moderate difficulty', score: 2 },
                { label: 'Severe difficulty', score: 3 }
            ]
        },
        {
            id: 'anxiety',
            title: 'Anxiety Levels',
            question: 'Over the last 2 weeks, how often have you felt dangerously nervous, anxious, or constantly on edge?',
            options: [
                { label: 'Not at all', score: 0 },
                { label: 'Several days', score: 1 },
                { label: 'More than half the days', score: 2 },
                { label: 'Nearly every day', score: 3 }
            ]
        }
    ];

    const [responses, setResponses] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSelectOption = (questionId, option) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleFinalSubmit = () => {
        // Here we store all responses in state for when the backend is ready
        console.log('Final Responses ready for API:', responses);
        setIsCompleted(true);
    };

    return (
        <div className="w-full min-h-full flex flex-col relative py-6 px-4 lg:px-8">
            <div className={`absolute inset-0 backdrop-blur-md rounded-2xl border -z-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A]/60 border-[#333]/50' : 'bg-white/40 border-gray-200 shadow-sm'}`} />

            {!isCompleted && (
                <div className="text-center mb-4 shrink-0 mt-auto">
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 border transition-colors ${isDarkMode ? 'bg-[#c47ea8]/20 border-[#c47ea8]/40' : 'bg-[#fff0f5] border-[#f9dde8]'}`}>
                        <BrainCircuit size={24} className="text-[#c47ea8]" />
                    </div>
                    <h2 className={`text-2xl font-serif font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sentiment Assessment</h2>
                    <p className={`text-sm max-w-lg mx-auto transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Take a moment to check in with yourself. The answers you provide will help our AI tailor a personalized support pathway just for you.
                    </p>
                </div>
            )}

            {!isCompleted ? (
                <Stepper
                    initialStep={1}
                    onFinalStepCompleted={handleFinalSubmit}
                    backButtonText="Previous"
                    nextButtonText="Next"
                    disableStepIndicators={false}
                    className="w-full flex flex-col items-center relative z-10 mb-auto"
                    stepCircleContainerClassName={`!max-w-2xl backdrop-blur-xl border ${isDarkMode ? 'bg-[#111]/80 border-[#333]/50 shadow-2xl' : 'bg-white/90 border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'} relative z-20 transition-colors duration-500`}
                    stepContainerClassName="!p-4 sm:!p-6 !pb-2"
                    contentClassName="!px-4 sm:!px-6"
                    footerClassName="!px-4 sm:!px-6 !pb-4"
                >
                    {questions.map((q) => (
                        <Step key={q.id}>
                            <div className="py-2 min-h-[160px]">
                                <h3 className={`text-lg font-semibold mb-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{q.title}</h3>
                                <p className="text-[#c47ea8] text-sm mb-4">{q.question}</p>
                                
                                <div className="flex flex-col gap-2">
                                    {q.options.map((opt, idx) => {
                                        const isSelected = responses[q.id]?.label === opt.label;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelectOption(q.id, opt)}
                                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 text-left text-sm ${
                                                    isSelected 
                                                    ? isDarkMode
                                                        ? 'bg-[#c47ea8]/20 border-[#c47ea8] text-white shadow-[0_0_15px_rgba(196,126,168,0.2)]'
                                                        : 'bg-[#fff0f5] border-[#c47ea8] text-[#c47ea8] font-medium shadow-sm'
                                                    : isDarkMode
                                                        ? 'bg-[#1A1A1A] border-[#333] text-gray-400 hover:bg-[#222] hover:border-[#555]'
                                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                <span>{opt.label}</span>
                                                {isSelected && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#c47ea8] shadow-[0_0_8px_#c47ea8]" />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </Step>
                    ))}
                </Stepper>
            ) : (
                <div className={`w-full max-w-2xl mx-auto my-auto backdrop-blur-xl p-10 rounded-4xl border text-center flex flex-col items-center transition-colors duration-500 ${isDarkMode ? 'bg-[#111111]/90 border-[#c47ea8]/30 shadow-2xl' : 'bg-white/90 border-[#c47ea8]/20 shadow-xl'}`}>
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6">
                        <Activity size={40} className="text-emerald-500" />
                    </div>
                    <h3 className={`text-2xl font-semibold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Assessment Complete</h3>
                    <p className={`mb-8 max-w-md transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Thank you for checking in. Your responses have been safely recorded. Once our backend modules are live, these insights will seamlessly flow into your AI Therapist context.
                    </p>
                    <button 
                        onClick={() => { setIsCompleted(false); setResponses({}); }}
                        className={`px-6 py-2.5 rounded-full font-medium transition-colors border ${isDarkMode ? 'bg-[#1F1F1F] text-gray-300 hover:bg-[#2A2A2A] border-[#333]' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm'}`}
                    >
                        Retake Assessment
                    </button>
                </div>
            )}
        </div>
    );
}
