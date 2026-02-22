import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-zinc-500">Here's what's happening with your account today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-zinc-500 mb-1">Total Balance</p>
          <h3 className="text-2xl font-bold text-zinc-900">${user.balance.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase size={20} />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-500 mb-1">Active Tasks</p>
          <h3 className="text-2xl font-bold text-zinc-900">0</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-500 mb-1">Completed Tasks</p>
          <h3 className="text-2xl font-bold text-zinc-900">0</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-sm font-medium text-zinc-500 mb-1">Pending Approval</p>
          <h3 className="text-2xl font-bold text-zinc-900">$0.00</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-bold text-zinc-900">Recent Activity</h3>
              <button className="text-sm text-emerald-600 font-medium hover:underline">View all</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="text-zinc-300" size={32} />
                </div>
                <h4 className="text-lg font-bold text-zinc-900 mb-1">No tasks yet</h4>
                <p className="text-zinc-500 max-w-xs">You haven't completed any tasks yet. Start browsing to earn money!</p>
                <button className="mt-6 px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">
                  Browse Available Tasks
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200">
              <h3 className="font-bold text-zinc-900">Profile Status</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full border-2 border-emerald-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-zinc-900">{user.name}</h4>
                  <p className="text-sm text-zinc-500 capitalize">{user.role}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    <span>Profile Completion</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[80%]"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-600">Email Verified</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Yes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-600">ID Verification</span>
                    <span className="text-xs font-bold text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-full">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
