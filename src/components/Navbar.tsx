import React from 'react';
import { LogIn, LogOut, User as UserIcon, LayoutDashboard, Home, Briefcase } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">HireTalents</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-emerald-600' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                <Home size={18} />
                Home
              </button>
              <button 
                onClick={() => onNavigate('tasks')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'tasks' ? 'text-emerald-600' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                <Briefcase size={18} />
                Browse Tasks
              </button>
              {user && (
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'text-emerald-600' : 'text-zinc-600 hover:text-zinc-900'}`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-semibold text-zinc-900">{user.name}</span>
                  <span className="text-xs text-zinc-500 capitalize">{user.role}</span>
                </div>
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-9 h-9 rounded-full border border-zinc-200"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={onLogout}
                  className="p-2 text-zinc-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95"
              >
                <LogIn size={18} />
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
