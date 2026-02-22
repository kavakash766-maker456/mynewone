import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, DollarSign, Clock, Star } from 'lucide-react';

const MOCK_TASKS = [
  { id: 1, title: 'Data Entry for E-commerce', reward: 0.50, time: '5 mins', rating: 4.8 },
  { id: 2, title: 'Image Labeling (Traffic)', reward: 0.25, time: '2 mins', rating: 4.9 },
  { id: 3, title: 'App Feedback Survey', reward: 1.20, time: '10 mins', rating: 4.5 },
  { id: 4, title: 'Translate Short Text (ES-EN)', reward: 2.00, time: '15 mins', rating: 5.0 },
  { id: 5, title: 'Categorize Support Tickets', reward: 0.75, time: '8 mins', rating: 4.7 },
];

export const Tasks: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Available Tasks</h1>
          <p className="text-zinc-500">Find tasks that match your skills and start earning.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-10 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_TASKS.map((task, index) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-emerald-500/50 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-2">{task.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Clock size={16} /> {task.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-amber-400 fill-amber-400" /> {task.rating}
                  </div>
                  <div className="bg-zinc-100 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Micro-task</div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-8">
                <div className="text-right">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Reward</p>
                  <p className="text-xl font-bold text-emerald-600">${task.reward.toFixed(2)}</p>
                </div>
                <button className="px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95">
                  Start Task
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
