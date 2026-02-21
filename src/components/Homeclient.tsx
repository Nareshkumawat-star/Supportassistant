'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation';

function HomeClient({ email }: { email?: string }) {
    const handlelogin = () => {
        window.location.href = '/api/auth/login';
    }
    const [open, setOpen] = useState(false)
    const firstletter = email ? email[0].toUpperCase() : '';
    const popref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handler = ((event: MouseEvent) => {
            if (popref.current && !popref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        })

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);
    const handlelogout = () => {
        window.location.href = '/api/auth/logout';
    }
     const router = useRouter();
    return (
       
        <div className='min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-200'>
            <div className='fixed top-0 left-0 right-0 z-50 px-6'>
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='max-w-5xl mx-auto bg-zinc-700/90 backdrop-blur-xl border border-white/10 h-14 rounded-full flex items-center px-2 shadow-2xl shadow-zinc-700/20'
                >
                    <div className='flex w-full px-5 items-center justify-between' >
                        <div>
                            <h1 className='text-lg font-bold tracking-tight text-white'>Chatbot <span className='text-zinc-400'>AI</span></h1>
                        </div>
                        {email ? (
                            <div className='text-sm text-white relative'>
                                <button
                                    className='px-5 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm'
                                    onClick={() => setOpen(!open)}
                                >
                                    {firstletter}
                                </button>
                                {open && (
                                    <motion.div
                                        ref={popref}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl p-4 border border-zinc-200'
                                    >
                                        <p className='text-sm text-zinc-900 font-medium'>Hello,</p>
                                        <p className='text-xs text-zinc-500 truncate'>{email}</p>
                                        <hr className='my-3 border-zinc-100' />
                                        <button
                                            onClick={handlelogout}
                                            className='w-full text-left text-sm text-red-600 hover:text-red-700 font-medium transition-colors'
                                        >
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='px-5 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm'
                                onClick={handlelogin}
                            >
                                Log In
                            </motion.button>
                        )}
                    </div>
                </motion.header>
            </div>

            <section className="max-w-5xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 text-left"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-zinc-900">
                        Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-400">AI Assistants</span><br />
                        Embed in any website <span className="text-zinc-300">instantly</span>
                    </h1>
                    <p className="text-base md:text-lg text-zinc-500 mt-6 leading-relaxed font-semibold max-w-xl">
                        Create a custom AI assistant for your website with just a few lines of code.
                        Simply copy and paste the script—no complex implementation required.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        {email ? (
                            <button className="px-8 py-3 bg-zinc-700 text-white rounded-full font-bold hover:bg-zinc-600 transition-all shadow-xl shadow-zinc-100" onClick={() => router.push("/dashboard")}>
                                Go to Dashboard
                            </button>
                        ) : (
                            <button className="px-8 py-3 bg-zinc-700 text-white rounded-full font-bold hover:bg-zinc-600 transition-all shadow-xl shadow-zinc-100" onClick={handlelogin}>
                                Get Started
                            </button>
                        )}
                        <button className="px-8 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full font-bold hover:bg-zinc-50 transition-all ">
                            <a href="/features">Learn More</a>
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative w-full lg:w-[500px] shrink-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-400 rounded-full blur-3xl opacity-10"></div>

                    {/* Orbiting Bot Icon */}
                    <motion.div
                        animate={{
                            x: [0, 40, -40, 0],
                            y: [0, -20, 20, 0],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 bg-zinc-700 p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-2xl border border-white/10 flex items-center justify-center text-2xl lg:text-3xl"
                    >
                        🤖
                    </motion.div>

                    {/* Drifting Sparkle Icon */}
                    <motion.div
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 40, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute -right-4 lg:-right-8 bottom-32 lg:bottom-20 z-20 text-3xl lg:text-4xl block"
                    >
                        ✨
                    </motion.div>

                    {/* Floating Badge Animation - Constrained Height */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 z-20 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl border border-zinc-100 flex"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-xl">🤖</div>
                            <div>
                                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Assistant</div>
                                <div className="text-xs font-bold text-zinc-700">Ready to help</div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="relative bg-white rounded-[32px] shadow-2xl p-10 border border-zinc-200/50 backdrop-blur-sm min-h-[500px] flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="text-zinc-400 text-xs font-bold tracking-widest uppercase">Live Chat Preview</div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-100">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-zinc-500 tracking-tight">LIVE</span>
                            </div>
                        </div>

                        <div className="space-y-5 flex-1 pb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex justify-start"
                            >
                                <div className="bg-zinc-100/80 px-6 py-3.5 rounded-2xl rounded-tl-none max-w-[90%]">
                                    <p className="text-zinc-800 text-sm md:text-lg font-semibold leading-snug">
                                        How do I add this to my site?
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex justify-end pt-1"
                            >
                                <div className="bg-zinc-700 px-6 py-3.5 rounded-2xl rounded-br-none max-w-[90%] shadow-lg shadow-zinc-100">
                                    <p className="text-white text-sm md:text-lg font-semibold leading-snug">
                                        Just copy the script snippet and paste it before the closing body tag.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.2 }}
                                className="flex justify-start pt-1"
                            >
                                <div className="bg-zinc-100/80 px-6 py-3.5 rounded-2xl rounded-tl-none max-w-[90%]">
                                    <p className="text-zinc-800 text-sm md:text-lg font-semibold leading-snug">
                                        That's it? No coding?
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 3.2 }}
                                className="flex justify-end pt-1"
                            >
                                <div className="bg-zinc-700 px-6 py-3.5 rounded-2xl rounded-br-none max-w-[90%] shadow-lg shadow-zinc-100">
                                    <p className="text-white text-sm md:text-lg font-semibold leading-snug">
                                        Yes! Your AI is live instantly.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <div className="h-14 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center px-6">
                                <span className="text-zinc-300 text-sm font-medium">Type a message...</span>
                            </div>
                        </div>
                        {/* Animated background element */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 8, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -right-4 top-20 opacity-10 pointer-events-none"
                        >
                            <div className="w-24 h-24 bg-zinc-200 rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
            <section className='bg-zinc-50' id='features'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-6 tracking-tight">Everything you need to scale</h2>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">From setup to scale, we’ve got you covered with enterprise-grade tools.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="bg-white p-10 rounded-[32px] shadow-sm border border-zinc-100/50 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-zinc-100 transition-all duration-300">
                                <span className="text-3xl">⚡</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Instant Setup</h3>
                            <p className="text-zinc-500 text-lg leading-relaxed">Go live in seconds. Copy-paste the snippet and your AI is ready to chat. No deep technical knowledge required.</p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="bg-white p-10 rounded-[32px] shadow-sm border border-zinc-100/50 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-zinc-100 transition-all duration-300">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Real-time Analytics</h3>
                            <p className="text-zinc-500 text-lg leading-relaxed">Track conversations, engagement, and conversions with live dashboards. Get deep insights into your users' needs.</p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="bg-white p-10 rounded-[32px] shadow-sm border border-zinc-100/50 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-zinc-100 transition-all duration-300">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Enterprise Security</h3>
                            <p className="text-zinc-600 text-lg leading-relaxed">Built-in compliance, SSO, and data encryption to keep your business safe. Your data security is our top priority.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <footer>
                <div className="mt-8 text-center  mb-10">
                    <p className="text-zinc-500 text-sm">© 2026 AI. All rights reserved.</p>
                </div>

            </footer>

        </div>

    )
}

export default HomeClient