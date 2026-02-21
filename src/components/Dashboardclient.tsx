'use client'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

function Dashboardclient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter();
  const [businessinfo, setBusinessinfo] = useState('');
  const [supportemail, setSupportemail] = useState('');
  const [knowledgebase, setKnowledgebase] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setsaved] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  const isFormValid = businessinfo.trim() !== '' &&
    supportemail.trim() !== '' &&
    supportemail.includes('@') &&
    knowledgebase.trim() !== '';


  const handlesettingsave = async () => {
    setLoading(true);
    try {
      // jo bhejna hai 
      const result = await axios.post('/api/settings', {
        ownerId,
        businessinfo,
        supportemail,
        knowledgebase,
      });
      console.log(result);
      setLoading(false);
      setsaved(true);
      setIsUnsaved(false); // Reset unsaved status
      setIsConfigured(true); // Now configured
      setTimeout(() => {
        setsaved(false);
      }, 3000);

    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (ownerId) {
      const handlegetdetails = async () => {
        try {
          const result = await axios.post('/api/settings/get', {
            ownerId
          });

          setBusinessinfo(result.data.businessinfo || '');
          setSupportemail(result.data.supportemail || '');
          setKnowledgebase(result.data.knowledgebase || '');

          if (result.data.businessinfo) {
            setIsConfigured(true);
          }

        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      handlegetdetails();
    }
  }, [ownerId]);

  const handleInputChange = (setter: (val: string) => void, value: string) => {
    setter(value);
    setIsUnsaved(true);
  }

  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      {/* Navbar wrapper to maintain consistency if needed, but the design shows a very clean layout */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='w-full bg-zinc-700/90 backdrop-blur-xl border-b border-white/10 h-14 flex items-center shadow-lg shadow-zinc-700/5'
        >
          <div className='max-w-screen-2xl mx-auto flex w-full px-5 items-center justify-between' >
            <div>
              <h1 className='text-lg font-bold tracking-tight text-white cursor-pointer' onClick={() => navigate.push("/")}>SmartAssist <span className='text-zinc-400'>AI</span></h1>
            </div>
            <div className="flex items-center gap-4">
              {isUnsaved && (
                <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full animate-pulse uppercase tracking-wider">
                  Unsaved Changes
                </span>
              )}
              <button
                disabled={isUnsaved || !isConfigured}
                className='px-5 py-1.5 bg-white text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed'
                onClick={() => navigate.push("/embedded")}
              >
                EMBEDDED CHATBOT
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <main className='pt-24 pb-16 px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm'
        >
          {/* Header Section */}
          <div className='mb-8'>
            <h1 className='text-2xl font-semibold text-zinc-900 mb-1'>ChatBot Settings</h1>
            <p className='text-zinc-500 text-base font-medium'>Manage your AI chatbot knowledge and business details</p>
          </div>

          {/* Business Details Section */}
          <section className='mb-10'>
            <h2 className='text-lg font-semibold text-zinc-900 mb-4'>Business Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <label className='text-xs font-semibold text-zinc-500 ml-1'>BUSINESS NAME</label>
                <input
                  type="text"
                  placeholder='Enter business name'
                  className='w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white text-zinc-900 text-sm transition-all font-medium'
                  value={businessinfo}
                  onChange={(e) => handleInputChange(setBusinessinfo, e.target.value)}
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-xs font-semibold text-zinc-500 ml-1'>SUPPORT EMAIL</label>
                <input
                  type="email"
                  placeholder='support@example.com'
                  className='w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white text-zinc-900 text-sm transition-all font-medium'
                  value={supportemail}
                  onChange={(e) => handleInputChange(setSupportemail, e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Knowledge Base Section */}
          <section className='mb-8'>
            <div className='flex items-end justify-between mb-3'>
              <div>
                <h2 className='text-lg font-semibold text-zinc-900'>Knowledge Base</h2>
                <p className='text-zinc-400 text-xs mt-0.5'>Add FAQs, policies, delivery info, refunds, etc.</p>
              </div>
            </div>

            <textarea
              placeholder={`Example:\n• Refund policy: 7 days return available\n• Delivery time: 3-5 working days\n• Cash on Delivery available\n• Support hours`}
              className='w-full h-48 px-4 py-4 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white text-zinc-900 text-sm transition-all resize-none shadow-sm font-medium'
              value={knowledgebase}
              onChange={(e) => handleInputChange(setKnowledgebase, e.target.value)}
            />
          </section>

          {/* Action Section */}
          <div className='flex items-center'>
            <button
              className={`px-8 py-3 rounded-xl font-semibold text-base transition-all shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${isFormValid
                ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200 ring-2 ring-zinc-900/10 animate-pulse-slow'
                : 'bg-zinc-100 text-zinc-400'
                }`}
              disabled={loading || !isFormValid}
              onClick={handlesettingsave}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className='ml-4 text-green-600 text-sm font-semibold'
              >
                ✓ Saved successfully!
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboardclient