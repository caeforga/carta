/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, Edit2, Check, Music, Music2 } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // CONFIGURACIÓN DE LA CARTA (Cambia esto para tu persona especial)
  const recipient = "Yennifer"; 
  const message = "Nadie nos dijo que extrañar es el costo que tienen los buenos momentos.";
  const signature = "Con todo mi cariño - 888 -";

  // Floating hearts effect
  useEffect(() => {
    if (isOpen) {
      setShowHearts(true);
      const timer = setTimeout(() => setShowHearts(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: -1000,
              x: Math.sin(i) * 200 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute bottom-0 left-1/2 text-rose-300"
          >
            <Heart size={16 + Math.random() * 24} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-romantic text-5xl text-rose-600 mb-2 drop-shadow-sm">
            Una Sorpresa para Ti
          </h1>
          <p className="text-rose-400 font-medium italic">Toca el sobre para abrirlo</p>
        </motion.div>

        {/* Envelope Container */}
        <div 
          className="relative w-full aspect-[4/3] cursor-pointer group"
          onClick={toggleEnvelope}
        >
          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/5 blur-xl rounded-full" />

          {/* Envelope Body */}
          <div className="absolute inset-0 bg-rose-100 rounded-lg shadow-2xl border-2 border-rose-200 overflow-hidden">
            {/* Envelope Flap (Bottom/Sides) */}
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-rose-200/50 clip-path-envelope-bottom" />
              <div className="absolute top-0 left-0 w-1/2 h-full bg-rose-200/30 clip-path-envelope-left" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-200/30 clip-path-envelope-right" />
            </div>
          </div>

          {/* The Letter */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{ y: -180, scale: 1, opacity: 1 }}
                exit={{ y: 0, scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="absolute inset-x-4 top-4 bg-white p-8 shadow-xl rounded-sm border border-rose-100 min-h-[300px] flex flex-col items-center text-center z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full h-full border-2 border-rose-50 p-4 flex flex-col items-center">
                  <Heart className="text-rose-500 mb-4 animate-pulse" fill="currentColor" size={32} />
                  
                  <h2 className="font-romantic text-3xl text-rose-600 mb-4">
                    Querida {recipient},
                  </h2>
                  
                  <p className="font-serif text-rose-800 leading-relaxed italic text-lg mb-6">
                    "{message}"
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-rose-100 w-full">
                    <p className="font-romantic text-2xl text-rose-500">
                      {signature}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Top Flap */}
          <motion.div
            initial={false}
            animate={{ 
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 10 : 30
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-rose-200 rounded-t-lg origin-bottom shadow-md border-x-2 border-t-2 border-rose-300 flex items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-300/20 to-transparent" />
            <div className="relative z-10 w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center shadow-inner border-2 border-rose-300">
              <Heart className="text-white" fill="white" size={24} />
            </div>
          </motion.div>
        </div>

        {/* Footer Instructions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 text-center"
        >
          {!isOpen && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Heart size={12} className="text-rose-400" fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Hearts when opened */}
      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: "50%",
                  y: "50%"
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0.5],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${20 + Math.random() * 30}%`
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute text-rose-500"
              >
                <Heart fill="currentColor" size={20 + Math.random() * 20} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .clip-path-envelope-bottom {
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }
        .clip-path-envelope-left {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
        .clip-path-envelope-right {
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }
      `}</style>
    </div>
  );
}
