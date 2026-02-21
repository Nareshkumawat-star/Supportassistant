'use client'
import React from 'react'
import { motion } from 'motion/react'   
import { useRouter } from 'next/navigation';
function Dashboardclient({ownerId}: {ownerId:string}) {
    const naviagte = useRouter();
  return (
    <div>
               <motion.header
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className='max-w-5xl mt-2 mx-auto bg-zinc-700/90 backdrop-blur-xl border border-white/10 h-14  flex items-center px-2 shadow-2xl shadow-zinc-700/20 rounded-full'
                        >
                            <div className='flex w-full px-5 items-center justify-between' >
                                <div>
                                    <h1 className='text-lg font-bold tracking-tight text-white cursor-pointer' onClick={()=>naviagte.push("/")}>Chatbot <span className='text-zinc-400'>AI</span></h1>
                                </div>
                                <div>
                                  <button className='px-5 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm'>EMBEDED CHATBOT</button>
                                </div>
                              
                                       
                            </div>
                        </motion.header>

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='max-w-5xl mt-2 mx-auto bg-zinc-700/90 backdrop-blur-xl border border-white/10 h-14  flex items-center px-2 shadow-2xl shadow-white-200/20 rounded-full'
                        >
                         <p>Chatbot settings <br /> </p>
                         <br />
                          <p>manage your AI chatbot  knowledge base and appearance , business details </p>
                        </motion.div>
    </div>
  )
}

export default Dashboardclient