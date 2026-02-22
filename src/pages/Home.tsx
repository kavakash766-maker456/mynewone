import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Zap, Shield, Briefcase } from 'lucide-react';

interface HomeProps {
  onLogin: () => void;
  user: any;
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onLogin, user, onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6"
            >
              Get Tasks Done <br />
              <span className="text-emerald-600">Instantly.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10"
            >
              The most trusted micro-tasking platform for businesses and freelancers. 
              Join thousands of workers earning daily.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {!user ? (
                <button 
                  onClick={onLogin}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                  Start Working Now <ArrowRight size={20} />
                </button>
              ) : (
                <button 
                  onClick={() => onNavigate('tasks')}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                  Browse Tasks <ArrowRight size={20} />
                </button>
              )}
              <button className="px-8 py-4 bg-white border-2 border-zinc-200 text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-50 transition-all">
                Hire Talents
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Fast Payments</h3>
              <p className="text-zinc-500">Get paid instantly after task approval. No waiting periods or hidden fees.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Secure Platform</h3>
              <p className="text-zinc-500">Our escrow system ensures that both employers and workers are protected.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Quality Work</h3>
              <p className="text-zinc-500">Advanced verification tools to ensure high-quality task completion.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
