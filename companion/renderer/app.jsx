const { useState, useEffect, useRef } = React;

/* ──────────────────────────── SVG Icons ──────────────────────────── */

function SendIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

function UserIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function BotIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
        </svg>
    );
}

function PlusCircleIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );
}

function SettingsIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z" />
        </svg>
    );
}

function RocketIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}

function BriefcaseIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );
}

function CodeIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
}

function BookIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

function CalendarIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function CheckIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function SparklesIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
        </svg>
    );
}

/* ──────────────────────── Animated particles BG ──────────────────────── */

function ParticleBackground() {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 4,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: p.size,
                        height: p.size,
                        background: `rgba(139, 92, 246, ${0.15 + Math.random() * 0.2})`,
                        animation: `pulse ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
                    }}
                />
            ))}
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.2; transform: scale(1); }
                    100% { opacity: 0.8; transform: scale(1.8); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out both; }
                .btn-shimmer {
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }
            `}</style>
        </div>
    );
}

/* ──────────────────────── Goal Template Card ──────────────────────── */

const TEMPLATES = [
    {
        id: 'internship',
        label: 'Get an internship',
        description: 'Land your dream role at a top company',
        icon: BriefcaseIcon,
        gradient: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/40',
        activeGradient: 'from-blue-500/30 to-cyan-500/30',
        activeBorder: 'border-blue-400',
        iconColor: 'text-blue-400',
    },
    {
        id: 'sideproject',
        label: 'Build a side project',
        description: 'Ship something real and portfolio-worthy',
        icon: CodeIcon,
        gradient: 'from-emerald-500/20 to-teal-500/20',
        borderColor: 'border-emerald-500/40',
        activeGradient: 'from-emerald-500/30 to-teal-500/30',
        activeBorder: 'border-emerald-400',
        iconColor: 'text-emerald-400',
    },
    {
        id: 'learnskill',
        label: 'Learn a new skill',
        description: 'Master a technology or domain area',
        icon: BookIcon,
        gradient: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/40',
        activeGradient: 'from-amber-500/30 to-orange-500/30',
        activeBorder: 'border-amber-400',
        iconColor: 'text-amber-400',
    }
];

function TemplateCard({ template, isSelected, onSelect }) {
    const Icon = template.icon;
    const active = isSelected;

    return (
        <button
            onClick={() => onSelect(template.id)}
            className={`
                relative w-full text-left p-4 rounded-2xl border transition-all duration-300 group
                ${active
                    ? `bg-gradient-to-br ${template.activeGradient} ${template.activeBorder} shadow-lg shadow-white/5 scale-[1.02]`
                    : `bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.01]`
                }
            `}
        >
            {/* Selection indicator */}
            {active && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center animate-fade-in">
                    <CheckIcon size={12} />
                </div>
            )}

            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${active ? 'bg-white/10' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                    <Icon size={20} className={active ? template.iconColor : 'text-gray-400 group-hover:text-gray-300'} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-200'}`}>
                        {template.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${active ? 'text-gray-300' : 'text-gray-500'}`}>
                        {template.description}
                    </p>
                </div>
            </div>
        </button>
    );
}

/* ──────────────────────── Onboarding Screen ──────────────────────── */

function OnboardingScreen({ onComplete }) {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customGoal, setCustomGoal] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [saving, setSaving] = useState(false);

    // Get today's date for the min attribute
    const today = new Date().toISOString().split('T')[0];

    const handleTemplateSelect = (id) => {
        setSelectedTemplate(prev => prev === id ? null : id);
        // Clear custom goal when a template is selected
        if (id !== selectedTemplate) setCustomGoal('');
    };

    const handleDescriptionOfGoalChange = (e) => {
        setCustomGoal(e.target.value);
        // Deselect template when typing a custom goal
        // if (e.target.value.trim()) setSelectedTemplate(null);
    };

    const goalText = selectedTemplate
        ? TEMPLATES.find(t => t.id === selectedTemplate)?.label
        : '';
    const descriptionText = customGoal.trim();

    const canSave = goalText && targetDate;

    const handleSave = async () => {
        if (!canSave || saving) return;
        setSaving(true);
        try {
            await window.electronAPI.saveGoal(goalText, descriptionText, targetDate);
            onComplete(goalText, targetDate);
        } catch (err) {
            console.error('Failed to save goal:', err);
            setSaving(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#0a0a0b] text-gray-100 overflow-hidden">
            <ParticleBackground />

            {/* Radial glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <RocketIcon size={14} className="text-purple-400" />
                        <span className="text-xs font-medium text-purple-300 tracking-wide">Welcome to High Agency</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        What's your
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> goal</span>?
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                        Choose a template or define your own. We'll help you stay on track every day.
                    </p>
                </div>

                {/* Template Cards */}
                <div className="space-y-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    {TEMPLATES.map(t => (
                        <TemplateCard
                            key={t.id}
                            template={t}
                            isSelected={selectedTemplate === t.id}
                            onSelect={handleTemplateSelect}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-500 font-medium">or write your own</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Custom Goal Input */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="relative">
                        <SparklesIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={customGoal}
                            onChange={handleDescriptionOfGoalChange}
                            placeholder="Describe your goal…"
                            className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Date Picker */}
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon size={13} />
                            Target date
                        </span>
                    </label>
                    <input
                        type="date"
                        value={targetDate}
                        min={today}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 px-4 text-sm text-gray-100 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200 [color-scheme:dark]"
                    />
                </div>

                {/* Save Button */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <button
                        onClick={handleSave}
                        disabled={!canSave || saving}
                        className={`
                            w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2
                            ${canSave && !saving
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99]'
                                : 'bg-white/5 text-gray-600 cursor-not-allowed'
                            }
                        `}
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <RocketIcon size={16} />
                                Start my journey
                            </>
                        )}
                    </button>
                </div>

                {/* Subtle footer */}
                <p className="text-center text-[10px] text-gray-600 mt-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    You can always change your goal later in Settings.
                </p>
            </div>
        </div>
    );
}

/* ───────────────────────── Chat Screen ───────────────────────── */

function ChatScreen({ goal }) {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: `Great choice! Your goal is: "${goal}". I'll help you stay focused. What would you like to work on first?` }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: `I've received your request about: "${input}". (Streaming simulation active...)`
            }]);
        }, 600);
    };

    return (
        <div className="flex h-screen bg-[#0a0a0b] text-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#060607] border-r border-white/[0.06] p-4 flex-col hidden md:flex">
                <button className="flex items-center gap-2 w-full p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-200 mb-4 group">
                    <PlusCircleIcon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">New Chat</span>
                </button>
                <div className="flex-1 overflow-y-auto space-y-1">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.15em] px-2 pb-2 font-medium">Recent</p>
                    <div className="p-2.5 text-sm hover:bg-white/5 rounded-lg cursor-pointer truncate text-gray-400 hover:text-gray-200 transition-colors">Refactor React Hooks</div>
                    <div className="p-2.5 text-sm hover:bg-white/5 rounded-lg cursor-pointer truncate text-gray-400 hover:text-gray-200 transition-colors">Tailwind Grid Guide</div>
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                    <button className="flex items-center gap-2 p-2.5 w-full hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-gray-200 transition-colors">
                        <SettingsIcon size={18} />
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative">
                <header className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-[#0a0a0b]/80 backdrop-blur-xl">
                    <h1 className="font-semibold text-lg tracking-tight">
                        High Agency
                        <span className="text-[10px] font-medium bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded-full ml-2 tracking-wide">Qwen 3.0 8B</span>
                    </h1>
                </header>

                {/* Message Feed */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                                    <BotIcon size={16} />
                                </div>
                            )}
                            <div className={`p-4 rounded-2xl leading-relaxed text-sm ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-lg shadow-blue-500/10'
                                : 'bg-white/[0.04] border border-white/[0.08] rounded-tl-sm'
                                }`}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shrink-0">
                                    <UserIcon size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>

                {/* Input Bar */}
                <footer className="p-4 md:pb-8 md:px-0">
                    <div className="max-w-3xl mx-auto relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Message High Agency..."
                            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 placeholder-gray-600"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 text-gray-900 rounded-xl hover:bg-white transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <SendIcon size={16} />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-600 mt-3">
                        AI can make mistakes. Verify important information.
                    </p>
                </footer>
            </main>
        </div>
    );
}

/* ───────────────────────── Root App ───────────────────────── */

function App() {
    const [screen, setScreen] = useState('loading');  // 'loading' | 'onboarding' | 'chat'
    const [goal, setGoal] = useState('');

    // Check if there's an existing goal on mount
    useEffect(() => {
        (async () => {
            try {
                const existingGoal = await window.electronAPI.getGoal();
                if (existingGoal && existingGoal.goal) {
                    setGoal(existingGoal.goal);
                    setScreen('chat');
                } else {
                    setScreen('onboarding');
                }
            } catch (err) {
                console.error('Error checking goal:', err);
                setScreen('onboarding');
            }
        })();
    }, []);

    const handleOnboardingComplete = (goalText, targetDate) => {
        setGoal(goalText);
        setScreen('chat');
    };

    if (screen === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0a0a0b]">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (screen === 'onboarding') {
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }

    return <ChatScreen goal={goal} />;
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<App />);