import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { AddTask } from './pages/AddTask';
import { User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserSession();

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        loadUserSession();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loadUserSession = async () => {
    try {
      const res = await window.fetch('/api/auth/session');
      const data = await res.json();
      setUser(data.user);
      if (data.user && currentPage === 'home') {
        // Optionally auto-navigate to dashboard on login
        // setCurrentPage('dashboard');
      }
    } catch (err) {
      console.error('Failed to load user session', err);
    } finally {
      setLoading(false);
    }
  };

  const startLoginFlow = async () => {
    try {
      const res = await window.fetch('/api/auth/url');
      const { url } = await res.json();
      window.open(url, 'google_oauth', 'width=500,height=600');
    } catch (err) {
      console.error('Failed to get auth URL', err);
    }
  };

  const startLogoutFlow = async () => {
    try {
      await window.fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setCurrentPage('home');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 transition-colors">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white transition-colors">
      <Navbar 
        user={user} 
        onLogin={startLoginFlow} 
        onLogout={startLogoutFlow} 
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && <Home onLogin={startLoginFlow} user={user} onNavigate={setCurrentPage} />}
        {currentPage === 'tasks' && <Tasks />}
        {currentPage === 'add-task' && <AddTask user={user} onNavigate={setCurrentPage} />}
        {currentPage === 'dashboard' && user && <Dashboard user={user} />}
        {currentPage === 'dashboard' && !user && (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Please login to view your dashboard</h2>
            <button 
              onClick={startLoginFlow}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Login with Google
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
