const { useState, useEffect, useRef } = React;

// Simple inline SVG icon components (replacing Lucide icons which aren't available via CDN)
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

function App() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Hello! I am your JSX assistant. What is your Goal?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: `I've received your request about: "${input}". (Streaming simulation active...)`
            }]);
        }, 600);
    };

    return (
        <div className="flex h-screen bg-[#0d0d0d] text-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#000000] border-r border-white/10 p-4 flex flex-col hidden md:flex">
                <button className="flex items-center gap-2 w-full p-3 border border-white/20 rounded-lg hover:bg-white/5 transition mb-4">
                    <PlusCircleIcon size={18} />
                    <span className="text-sm font-medium">New Chat</span>
                </button>
                <div className="flex-1 overflow-y-auto space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-widest px-2 pb-2">Recent</p>
                    <div className="p-2 text-sm hover:bg-white/5 rounded cursor-pointer truncate">Refactor React Hooks</div>
                    <div className="p-2 text-sm hover:bg-white/5 rounded cursor-pointer truncate">Tailwind Grid Guide</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                    <button className="flex items-center gap-2 p-2 w-full hover:bg-white/5 rounded text-sm">
                        <SettingsIcon size={18} />
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative">
                <header className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0d0d0d]/80 backdrop-blur">
                    <h1 className="font-semibold text-lg">High Agency <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full ml-2">Qwen 3.0 8B</span></h1>
                </header>

                {/* Message Feed */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                    <BotIcon size={18} />
                                </div>
                            )}
                            <div className={`p-4 rounded-2xl leading-relaxed ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white/5 border border-white/10 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                                    <UserIcon size={18} />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>

                {/* Input Bar */}
                <footer className="p-4 md:pb-10 md:px-0">
                    <div className="max-w-3xl mx-auto relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Message JSX Assistant..."
                            className="w-full bg-white/5 border border-white/20 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-xl hover:bg-gray-200 transition"
                        >
                            <SendIcon size={18} />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-500 mt-2">
                        AI can make mistakes. Verify code before deploying.
                    </p>
                </footer>
            </main>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('react-root')).render(<App />);