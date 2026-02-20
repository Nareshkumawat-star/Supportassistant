'use client'
import React from 'react'
import { motion } from 'motion/react'

function HomeClient() {
    const handlelogin = () => {
     window.location.href = '/api/auth/login';   
    }
    return (
        <div className='min-h-screen bg-zinc-100 text-zinc-900'>
            <div className='fixed top-6 left-0 right-0 z-50 px-6'>
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='max-w-5xl mx-auto bg-zinc-900/90 backdrop-blur-xl border border-white/10 h-14 rounded-full flex items-center px-2 shadow-2xl shadow-zinc-900/20'
                >
                    <div className='flex w-full px-5 items-center justify-between' >
                        <div>
                            <h1 className='text-lg font-bold tracking-tight text-white'>Chatbot <span className='text-zinc-400'>AI</span></h1>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-5 py-1.5 bg-white text-zinc-950 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm'
                            onClick={handlelogin}
                        >
                            Log In
                        </motion.button>
                    </div>
                </motion.header>
            </div>
        </div>
    )
}

export default HomeClient