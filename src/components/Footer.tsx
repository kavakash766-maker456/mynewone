import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">HireTalents</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              The world's leading micro-tasking platform. Connect with talented workers and get your tasks done efficiently.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Browse Tasks</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Post a Job</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 dark:text-zinc-500 text-xs">
            © {new Date().getFullYear()} HireTalents Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Twitter</a>
            <a href="#" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
