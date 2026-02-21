'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation';

function EmbeddedClient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter();
  const [copied, setCopied] = useState(false);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const scriptCode = `<script src="${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/chatBot.js" data-owner-id="${ownerId}"></script>`;

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch('/api/settings/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ownerId })
        });
        const data = await response.json();
        if (data && data.businessinfo) {
          setIsConfigured(true);
        } else {
          setIsConfigured(false);
        }
      } catch (error) {
        console.error("Failed to check configuration:", error);
        setIsConfigured(false);
      }
    };
    if (ownerId) checkConfig();
  }, [ownerId]);

  const handleCopy = () => {
    if (!isConfigured) return;
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    // Inject the chatbot script for live preview
    const script = document.createElement('script');
    script.src = `${window.location.origin}/chatBot.js`;
    script.setAttribute('data-owner-id', ownerId);
    script.setAttribute('data-mode', 'demo');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script and any elements it created
      document.body.removeChild(script);
      const toggleBtn = document.querySelector('div[style*="zIndex: 1000"][style*="bottom: 40px"]');
      const chatContainer = document.querySelector('div[style*="zIndex: 1000"][style*="bottom: 110px"]');
      if (toggleBtn) toggleBtn.remove();
      if (chatContainer) chatContainer.remove();
    };
  }, [ownerId]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* Navbar */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='w-full bg-zinc-700/90 backdrop-blur-xl border-b border-white/10 h-14 flex items-center shadow-lg shadow-zinc-700/5'
        >
          <div className='max-w-screen-2xl mx-auto flex w-full px-5 items-center justify-between' >
            <div>
              <h1 className='text-lg font-bold tracking-tight text-white cursor-pointer' onClick={() => navigate.push("/dashboard")}>
                SmartAssist <span className='text-zinc-400'>AI</span>
              </h1>
            </div>
            <div>
              <button
                className='px-5 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm'
                onClick={() => navigate.push("/dashboard")}
              >
                BACK TO DASHBOARD
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <main className='pt-28 pb-20 px-6'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-3xl mx-auto space-y-8'
        >
          {isConfigured === null ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
              <p className="text-zinc-500 font-medium tracking-tight">Checking configuration...</p>
            </div>
          ) : !isConfigured ? (
            <div className="bg-white border border-dashed border-zinc-300 rounded-[32px] p-12 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Configuration Incomplete</h2>
                <p className="text-zinc-500 max-w-sm mx-auto">Please set up your chatbot details in the dashboard and save changes before you can embed it.</p>
              </div>
              <button
                onClick={() => navigate.push("/dashboard")}
                className="px-8 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
              >
                GO TO DASHBOARD
              </button>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Embed Your Chatbot</h1>
                <p className="text-zinc-500 text-lg">Copy the code below and paste it before the <code className="bg-zinc-100 px-1 py-0.5 rounded">&lt;/body&gt;</code> tag of your website.</p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">INTEGRATION CODE</span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                  >
                    {copied ? 'COPIED!' : 'COPY CODE'}
                  </button>
                </div>

                <div className="relative group">
                  <pre className="bg-white border border-zinc-200 rounded-2xl p-6 text-sm font-mono text-zinc-700 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                    {scriptCode}
                  </pre>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-2">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Simple Setup</h3>
              <p className="text-sm text-zinc-500">Just one line of code works on any HTML, WordPress, or CMS site.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-2">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Auto-Update</h3>
              <p className="text-sm text-zinc-500">Settings you save in the dashboard update your chatbot instantly.</p>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Live Demo Preview</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">This is how the chatbot will appear on your website</p>
            </div>

            {/* Browser Mockup */}
            <div className="relative bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-zinc-200/50">
              {/* Mockup Header */}
              <div className="bg-zinc-50 border-b border-zinc-100 px-4 py-3 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className="flex-1 max-w-md mx-auto h-7 bg-white border border-zinc-200 rounded-lg flex items-center px-3 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span className="text-[10px] font-medium text-zinc-400">your-website.com</span>
                </div>
                <div className="w-12"></div> {/* Spacer to center URL */}
              </div>

              {/* Mockup Content Area */}
              <div className="relative w-full h-[550px] bg-white p-12 overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="max-w-md space-y-4 pt-12">
                  <h2 className="text-3xl font-extrabold text-zinc-200 uppercase tracking-tighter leading-none">Your website content goes here</h2>
                  <div className="h-2 w-32 bg-zinc-100 rounded-full"></div>
                  <div className="h-2 w-48 bg-zinc-50 rounded-full"></div>
                </div>

                {/* Chatbox Positioned Bottom Right within Mockup */}
                <div className="absolute bottom-6 right-6 w-[340px] z-10 transition-all duration-700 ease-in-out">
                  <div id="chatbot-inline-container" className="w-full h-[400px]">
                    {/* The chatbot script mounts here in inline mode */}
                  </div>
                </div>

                {/* Visual-only Agent Icon as requested - positioned relative to content area */}
                <motion.div
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: [0, 6, -6, 4, 0],
                    y: [0, -12, -4, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-zinc-900 rounded-full shadow-lg flex items-center justify-center text-white z-0 opacity-80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                  {/* Pulse effect for realism */}
                  <div className="absolute inset-0 rounded-full border-2 border-zinc-900 animate-ping opacity-20"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default EmbeddedClient