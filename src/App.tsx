/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { 
  BarChart3, 
  Users, 
  Wallet, 
  History, 
  Settings, 
  TrendingUp, 
  Receipt, 
  LayoutDashboard, 
  UserCircle,
  CreditCard,
  FileText,
  LogOut,
  Bell,
  Menu,
  RefreshCw,
  X,
  Plus,
  Search,
  ChevronRight,
  Camera,
  Image,
  PiggyBank,
  CheckCircle,
  AlertTriangle,
  Info,
  Gavel,
  ArrowLeft,
  Edit2,
  Trash2,
  Trash,
  Save,
  ShieldCheck,
  Sparkles,
  Bot,
  Send,
  RotateCcw,
  Download,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

// --- Types ---
type Role = 'member' | 'admin' | 'super_admin';

interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  photo_url?: string;
  phone?: string;
  account_number?: string;
  is_active: boolean;
  nid_number?: string;
  address?: string;
  dob?: string;
  nid_photo_url?: string;
}

// --- AI Analyst Component ---
function AIAnalyst({ stats, user }: { stats: any, user: UserData }) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [question, setQuestion] = useState("");

  const generateInsight = async (customPrompt?: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: stats,
          prompt: customPrompt || (user.role === 'member' 
            ? "আমার ব্যক্তিগত সঞ্চয় এবং পেমেন্ট রিপোর্ট বিশ্লেষণ করুন। কি কি উন্নতি করা যায় বা বকেয়া আছে কিনা জানান।"
            : "ফাউন্ডেশনের আর্থিক অবস্থা বিশ্লেষণ করুন এবং উন্নতির জন্য পরামর্শ দিন।")
        })
      });
      const data = await response.json();
      setInsight(data.text);
    } catch (e) {
      console.error(e);
      setInsight("দুঃখিত, এই মুহূর্তে বিশ্লেষণ করা সম্ভব হচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-light/5 border border-brand-light/10 rounded-3xl p-6 relative overflow-hidden group mb-6">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles className="w-24 h-24 text-brand-light" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-light/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-brand-light" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Financial Advisor</h3>
          </div>
          {insight && (
            <button 
              onClick={() => { setInsight(null); setQuestion(""); }}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-text-muted" />
            </button>
          )}
        </div>
        
        {insight ? (
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-text-muted leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <Markdown>{insight}</Markdown>
            </motion.div>
            
            {!loading && (
              <div className="pt-4 border-t border-white/5 flex gap-2">
                <input 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="আরো কিছু জানতে চান?"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:border-brand-light outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && question.trim() && generateInsight(question)}
                />
                <button 
                  onClick={() => question.trim() && generateInsight(question)}
                  disabled={loading || !question.trim()}
                  className="p-2 bg-brand-light text-black rounded-xl disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-text-muted">
              {user.role === 'member' 
                ? "আপনার সঞ্চয় এবং ফাউন্ডেশনের ডাটা বিশ্লেষণ করে স্মার্ট গাইডেন্স পেতে নিচের বাটনে ক্লিক করুন।"
                : "ফাউন্ডেশনের সকল ডাটা বিশ্লেষণ করে স্মার্ট রিপোর্ট তৈরি করতে নিচে ক্লিক করুন।"}
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => generateInsight()}
                disabled={loading}
                className="px-6 py-3 bg-brand-light text-black rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-all flex items-center gap-2 translate-z-0"
              >
                <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? "বিশ্লেষণ চলছে..." : "অ্যানালাইসিস শুরু করুন"}
              </button>
              
              {!loading && (
                <div className="flex-1 flex gap-2">
                   <input 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="সরাসরি প্রশ্ন করুন..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:border-brand-light outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && question.trim() && generateInsight(question)}
                  />
                  <button 
                    onClick={() => question.trim() && generateInsight(question)}
                    disabled={loading || !question.trim()}
                    className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helpers ---

const fmt = (n: number) => Number(n || 0).toLocaleString('bn-BD');
const fd = (dt: string | null) => {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
};
const fdt = (dt: string | null) => {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const MB = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, maxWidth?: string }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative bg-bg-secondary border border-white/10 rounded-3xl p-6 w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">{title}</h3>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-xl text-text-muted hover:text-brand-danger transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Input = ({ label, icon: Icon, ...props }: { label: string, icon?: any } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark" />}
      <input 
        {...props}
        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light focus:bg-brand-light/5 transition-all ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  </div>
);

const Select = ({ label, options, ...props }: { label: string, options: { value: string, label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select 
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light focus:bg-brand-light/5 transition-all appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-bg-secondary">{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-dark">
        <ChevronRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  </div>
);

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  badge 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  badge?: number 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 transition-all relative group ${
      active 
        ? 'bg-brand-light/15 text-green-400' 
        : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
    }`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-light rounded-r-full" />}
    <Icon className={`w-4 h-4 ${active ? 'text-green-400' : 'group-hover:text-text-primary'}`} />
    <span className="text-sm font-medium">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="ml-auto bg-brand-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const Card = ({ children, title, action, className = "" }: { children: React.ReactNode, title?: string, action?: React.ReactNode, className?: string }) => (
  <div className={`bg-white/3 border border-white/7 rounded-2xl p-5 ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-4">
        {title && <h3 className="font-bold text-sm tracking-tight">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, sub, colorClass }: { icon: any, label: string, value: string, sub: string, colorClass: string }) => (
  <div className="bg-white/3 border border-white/7 rounded-2xl p-5 hover:translate-y-[-2px] transition-transform">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-black">{value}</div>
    <div className="text-[10px] text-text-muted mt-1">{sub}</div>
  </div>
);

// --- Main App ---

// --- Toast System ---

interface Toast {
  id: number;
  message: string;
  type: 's' | 'e' | 'i';
}

function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDevProfile, setShowDevProfile] = useState(false);
  const [settings, setSettings] = useState({ 
    monthlyDeposit: '1000', 
    bkash: '', 
    nagad: '', 
    rocket: '', 
    adminContact: '' 
  });
  const [pendingCount, setPendingCount] = useState(0);
  const [selectedMemberForProfile, setSelectedMemberForProfile] = useState<UserData | null>(null);

  useEffect(() => {
    if (userData && (userData.role === 'admin' || userData.role === 'super_admin')) {
       const fetchPending = async () => {
          const { count } = await supabase.from('ywf_payment_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
          if (count !== null) setPendingCount(count);
       };
       fetchPending();
       const interval = setInterval(fetchPending, 30000); // 30s
       return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    (window as any).setActiveTab = setActiveTab;
    supabase.from('ywf_settings').select('*').then(({ data }) => {
      if (data) {
        const dep = data.find(s => s.key === 'monthly_deposit')?.value;
        const bk = data.find(s => s.key === 'bkash')?.value;
        const ng = data.find(s => s.key === 'nagad')?.value;
        const rk = data.find(s => s.key === 'rocket')?.value;
        const con = data.find(s => s.key === 'admin_contact')?.value;
        
        setSettings({
          monthlyDeposit: dep || '1000',
          bkash: bk || '',
          nagad: ng || '',
          rocket: rk || '',
          adminContact: con || ''
        });
      }
    });
  }, [activeTab]);

  const toast = (message: string, type: 's' | 'e' | 'i' = 'i') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  useEffect(() => {
    (window as any).showDevModal = () => setShowDevProfile(true);
    (window as any).setActiveTab = setActiveTab;
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user.email!);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user.email!);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (email: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ywf_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.warn('User data fetch error:', error.message);
        setUserData(null);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.error('User data fetch exception:', err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = () => {
    if (session?.user?.email) fetchUserData(session.user.email);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-4">
        <div className="sp" />
        <div className="text-text-muted text-xs">লোড হচ্ছে...</div>
      </div>
    );
  }

  if (!session || !userData) {
    return <LoginPage onLogin={() => setLoading(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg-main flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-60 bg-bg-secondary border-r border-white/5 flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-bottom border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white p-1 flex-shrink-0 overflow-hidden">
            <img 
              src="https://enifukjimtnvkwzmervg.supabase.co/storage/v1/object/public/ywf-photos/e7e3698d-46b8-427f-a88c-5fc7c3e94293/logo.jpeg" 
              alt="YWF" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <h2 className="text-xs font-black leading-tight">Youngster Welfare</h2>
            <span className="text-[10px] text-text-muted">Foundation</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {userData.role !== 'member' ? (
            <>
              <div className="px-4 pb-2 text-[10px] font-bold text-text-dark uppercase tracking-widest">প্রধান</div>
              <SidebarItem icon={LayoutDashboard} label="ড্যাশবোর্ড" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Users} label="সদস্যগণ" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Gavel} label="জরিমানা" active={activeTab === 'fines'} onClick={() => { setActiveTab('fines'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Wallet} label="টাকা জমা" active={activeTab === 'deposit'} onClick={() => { setActiveTab('deposit'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Bell} label="পেমেন্ট রিকোয়েস্ট" active={activeTab === 'requests'} onClick={() => { setActiveTab('requests'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} badge={pendingCount} />
              
              <div className="px-4 py-4 text-[10px] font-bold text-text-dark uppercase tracking-widest">আর্থিক</div>
              <SidebarItem icon={TrendingUp} label="বিনিয়োগ" active={activeTab === 'investments'} onClick={() => { setActiveTab('investments'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={BarChart3} label="লাভ" active={activeTab === 'profits'} onClick={() => { setActiveTab('profits'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Receipt} label="খরচ" active={activeTab === 'expenses'} onClick={() => { setActiveTab('expenses'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={FileText} label="রিপোর্ট" active={activeTab === 'reports'} onClick={() => { setActiveTab('reports'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              
              <div className="px-4 py-4 text-[10px] font-bold text-text-dark uppercase tracking-widest">সিস্টেম</div>
              <SidebarItem icon={History} label="অডিট লগ" active={activeTab === 'audit'} onClick={() => { setActiveTab('audit'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              {userData.role === 'super_admin' && (
                <SidebarItem icon={Settings} label="সেটিংস" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              )}
            </>
          ) : (
            <>
              <div className="px-4 pb-2 text-[10px] font-bold text-text-dark uppercase tracking-widest">আমার একাউন্ট</div>
              <SidebarItem icon={LayoutDashboard} label="ড্যাশবোর্ড" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={Gavel} label="আমার জরিমানা" active={activeTab === 'myFines'} onClick={() => { setActiveTab('myFines'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={FileText} label="আমার স্টেটমেন্ট" active={activeTab === 'myStatement'} onClick={() => { setActiveTab('myStatement'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={CreditCard} label="পেমেন্ট করুন" active={activeTab === 'payNow'} onClick={() => { setActiveTab('payNow'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={TrendingUp} label="বিনিয়োগ ও লাভ" active={activeTab === 'memberInv'} onClick={() => { setActiveTab('memberInv'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
              <SidebarItem icon={UserCircle} label="আমার প্রোফাইল" active={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setSelectedMemberForProfile(null); setSidebarOpen(false); }} />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-light to-brand-accent flex items-center justify-center font-black text-white shrink-0 overflow-hidden">
              {userData.photo_url ? (
                <img src={userData.photo_url} alt="" className="w-full h-full object-cover" />
              ) : (
                userData.full_name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{userData.full_name}</div>
              <div className="text-[10px] text-text-muted uppercase font-semibold">
                {userData.role === 'super_admin' ? 'সুপার অ্যাডমিন' : userData.role === 'admin' ? 'অ্যাডমিন' : 'সদস্য'}
              </div>
            </div>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="p-1 text-text-dark hover:text-brand-danger transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => setShowDevProfile(true)}
            className="text-[10px] text-text-dark hover:text-text-muted transition-colors font-bold uppercase tracking-widest text-center"
          >
            Developed by Zahid Hasan
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 bg-bg-main/90 backdrop-blur-xl border-b border-white/5 px-6 py-3.5 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-text-muted hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tight">{getTabTitle(activeTab)}</h1>
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Youngster Welfare Foundation</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent(
                activeTab, 
                userData, 
                refreshUser, 
                settings, 
                selectedMemberForProfile, 
                setSelectedMemberForProfile,
                setActiveTab,
                toast
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Toasts */}
      <div className="fixed top-6 right-6 z-[110] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`min-w-[280px] bg-bg-secondary border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl ${
                t.type === 's' ? 'border-l-4 border-l-green-500' : 
                t.type === 'e' ? 'border-l-4 border-l-brand-danger' : 
                'border-l-4 border-l-brand-info'
              }`}
            >
              <div className={t.type === 's' ? 'text-green-500' : t.type === 'e' ? 'text-brand-danger' : 'text-brand-info'}>
                {t.type === 's' ? <CheckCircle className="w-5 h-5" /> : t.type === 'e' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <span className="text-sm font-bold tracking-tight">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={showDevProfile} 
        onClose={() => setShowDevProfile(false)} 
        title="Developer Profile"
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-light shadow-2xl mb-6 overflow-hidden border-4 border-white/10">
            <img 
              src="https://enifukjimtnvkwzmervg.supabase.co/storage/v1/object/public/ywf-photos/WhatsApp%20Image%202026-05-05%20at%204.53.15%20AM.jpeg" 
              alt="Zahid Hasan" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-black mb-2 text-white">Zahid Hasan</h3>
          <p className="text-brand-light font-bold text-sm mb-6 px-4 py-1.5 bg-brand-light/10 rounded-full italic">"Crafting Digital Experiences"</p>
          
          <div className="w-full space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-info/10 text-brand-info flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-bold text-white truncate">zahidhasantarek34@gmail.com</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowDevProfile(false)}
            className="mt-8 w-full bg-brand-light hover:bg-brand-primary text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-brand-light/20"
          >
            ধন্যবাদ
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;

function getTabTitle(tab: string) {
  const titles: Record<string, string> = {
    dashboard: 'ড্যাশবোর্ড',
    members: 'সদস্যগণ',
    deposit: 'টাকা জমা',
    requests: 'পেমেন্ট রিকোয়েস্ট',
    investments: 'বিনিয়োগ',
    profits: 'লাভ',
    expenses: 'খরচ',
    reports: 'রিপোর্ট',
    audit: 'অডিট লগ',
    settings: 'সেটিংস',
    myStatement: 'আমার স্টেটমেন্ট',
    payNow: 'পেমেন্ট করুন',
    memberInv: 'বিনিয়োগ ও লাভ',
    profile: 'আমার প্রোফাইল'
  };
  return titles[tab] || tab;
}

function renderTabContent(
  tab: string, 
  user: UserData, 
  refreshUser: () => void, 
  settings: any,
  selectedMemberForProfile: UserData | null,
  setSelectedMemberForProfile: (m: UserData | null) => void,
  setActiveTab: (tab: string) => void,
  onToast: (msg: string, type?: 's' | 'e' | 'i') => void
) {
  switch (tab) {
    case 'dashboard': return <Dashboard user={user} onToast={onToast} />;
    case 'members': return <MembersView user={user} onSelectMember={(m) => { setSelectedMemberForProfile(m); setActiveTab('profile'); }} onViewReport={(m) => { setSelectedMemberForProfile(m); setActiveTab('memberReport'); }} onToast={onToast} />;
    case 'fines': return <FinesView user={user} settings={settings} onSelectMember={(m) => { setSelectedMemberForProfile(m); setActiveTab('profile'); }} onViewReport={(m) => { setSelectedMemberForProfile(m); setActiveTab('memberReport'); }} onToast={onToast} />;
    case 'myFines': return <MyFinesView user={user} onToast={onToast} />;
    case 'deposit': return <DepositView user={user} settings={settings} onToast={onToast} />;
    case 'profile': return <ProfileView user={user} targetUser={selectedMemberForProfile} onUpdate={() => { refreshUser(); setSelectedMemberForProfile(null); }} onToast={onToast} />;
    case 'memberReport': {
      if (!selectedMemberForProfile) return <Dashboard user={user} onToast={onToast} />;
      return <MemberReportView user={user} targetUser={selectedMemberForProfile} onBack={() => { setSelectedMemberForProfile(null); setActiveTab('members'); }} onToast={onToast} />;
    }
    case 'requests': return <PaymentRequestsView user={user} onToast={onToast} />;
    case 'payNow': return <PayNowView user={user} settings={settings} onToast={onToast} />;
    case 'myStatement': return <StatementView user={user} userId={user.id} onToast={onToast} />;
    case 'reports': return <StatementView user={user} onToast={onToast} />;
    case 'investments': return <InvestmentsView user={user} onToast={onToast} />;
    case 'profits': return <ProfitsView user={user} onToast={onToast} />;
    case 'expenses': return <FinanceView user={user} type="expense" onToast={onToast} />;
    case 'memberInv': return <ProfitsView user={user} title="লভ্যাংশ রেকর্ড" onToast={onToast} />;
    case 'audit': return <AuditView user={user} />;
    case 'settings': {
      if (user.role !== 'super_admin') return <Dashboard user={user} onToast={onToast} />;
      return <SettingsView user={user} onUpdate={() => setActiveTab('dashboard')} onToast={onToast} />;
    }
    default: return (
      <div className="flex flex-col items-center justify-center py-20 opacity-30">
        <LayoutDashboard className="w-16 h-16 mb-4" />
        <p className="text-sm font-medium">{tab} - এই মডিউলটি শীঘ্রই আসছে...</p>
      </div>
    );
  }
}

// --- Views ---

function Dashboard({ user, onToast }: { user: UserData, onToast: (m: string, t?: any) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [recentTxns, setRecentTxns] = useState<any[]>([]);
  const [txnSearch, setTxnSearch] = useState('');
  const [txnFilterMonth, setTxnFilterMonth] = useState('');
  const [txnFilterYear, setTxnFilterYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingTxn, setEditingTxn] = useState<any>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editMonth, setEditMonth] = useState('');
  const [editYear, setEditYear] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function fetchStats() {
    try {
      if (user.role === 'member') {
        const [r1, r2, r3] = await Promise.all([
          supabase.from('ywf_transactions').select('*').eq('member_id', user.id).eq('status', 'approved'),
          supabase.from('ywf_fines').select('*').eq('member_id', user.id),
          supabase.from('ywf_payment_requests').select('*').eq('member_id', user.id).eq('status', 'pending')
        ]);
        
        const txns = r1.data || [];
        const totDep = txns.filter(t => t.type === 'deposit').reduce((s, t) => s + Number(t.amount), 0);
        const totFinePaid = txns.filter(t => t.type === 'fine').reduce((s, t) => s + Number(t.amount), 0);
        const pendingFine = (r2.data || []).filter(f => f.status === 'pending').reduce((s, f) => s + Number(f.amount), 0);

        const now = new Date();
        const mk = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const paidThisMonth = txns.some(t => t.type === 'deposit' && t.month_year === mk);

        setStats({ totDep, totFinePaid, pendingFine, paidThisMonth, pendingReqs: r3.data?.length || 0 });
      } else {
        // Fetch everything for Admin
        const [r1, r2, r3, r4, r5, r6, r7, r8] = await Promise.all([
          supabase.from('ywf_users').select('id, full_name'),
          supabase.from('ywf_transactions').select('*').eq('status', 'approved'),
          supabase.from('ywf_investments').select('*'),
          supabase.from('ywf_profits').select('*'),
          supabase.from('ywf_expenses').select('*'),
          supabase.from('ywf_fines').select('*'),
          supabase.from('ywf_payment_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('ywf_transactions').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(50)
        ]);

        const mem = r1.data || [], txns = r2.data || [], invs = r3.data || [], profs = r4.data || [], exps = r5.data || [], fins = r6.data || [];
        const totDep = txns.filter(t => t.type === 'deposit').reduce((s, t) => s + Number(t.amount), 0);
        const totInv = invs.reduce((s, i) => s + Number(i.amount), 0);
        const totProf = profs.reduce((s, p) => s + Number(p.amount), 0);
        const totExp = exps.reduce((s, e) => s + Number(e.amount), 0);
        
        // Accurate collected fines from transactions
        const totFineCollected = txns.filter(t => t.type === 'fine').reduce((s, t) => s + Number(t.amount), 0);
        
        const activeInvsCount = invs.filter(i => i.status === 'active').length;
        // Balance = Total Collected (Deposits + Profits + Fines) - Total Outflow (Investments + Expenses)
        const currentBalance = (totDep + totProf + totFineCollected) - (totInv + totExp);
        
        // Members with pending fines
        const pendingFinesByMember = fins
          .filter(f => f.status === 'pending')
          .reduce((acc: any, f) => {
            const memberId = f.member_id;
            const memberName = mem.find((m: any) => m.id === memberId)?.full_name || 'Unknown';
            if (!acc[memberId]) acc[memberId] = { id: memberId, name: memberName, total: 0 };
            acc[memberId].total += Number(f.amount);
            return acc;
          }, {});
        const membersWithFines = Object.values(pendingFinesByMember).sort((a: any, b: any) => b.total - a.total).slice(0, 5);

        // Map recent transactions with member names
        const mappedTxns = (r8.data || []).map(t => ({
          ...t,
          member: mem.find(m => m.id === t.member_id)
        }));

        setRecentTxns(mappedTxns);

        setStats({ totDep, totInv, totProf, totExp, totFine: totFineCollected, activeInvsCount, currentBalance, membersWithFines, pendingReqs: r7.count || 0 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteTxn = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDeleteAction = async () => {
    if (!deleteId) return;
    
    // Optimistically update UI
    setRecentTxns(prev => prev.filter(t => t.id !== deleteId));
    
    const { error } = await supabase.from('ywf_transactions').delete().eq('id', deleteId);
    if (!error) {
      onToast('লেনদেন সফলভাবে ডিলিট করা হয়েছে', 's');
      setDeleteId(null);
      fetchStats();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
      fetchStats();
      setDeleteId(null);
    }
  };

  const handleEditTxn = (txn: any) => {
    setEditingTxn(txn);
    setEditAmount(txn.amount.toString());
    if (txn.month_year) {
      const [y, m] = txn.month_year.split('-');
      setEditYear(y);
      setEditMonth(m);
    }
    setIsEditModalOpen(true);
  };

  const saveEditTxn = async () => {
    if (!editingTxn || !editAmount) return;
    const { error } = await supabase.from('ywf_transactions').update({
      amount: Number(editAmount),
      month_year: editYear && editMonth ? `${editYear}-${editMonth}` : editingTxn.month_year
    }).eq('id', editingTxn.id);

    if (!error) {
      onToast('লেনদেন আপডেট করা হয়েছে', 's');
      setIsEditModalOpen(false);
      fetchStats();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const filteredRecentTxns = recentTxns.filter(t => {
    const s = txnSearch.toLowerCase();
    const matchSearch = t.member?.full_name?.toLowerCase().includes(s) || (t.month_year && t.month_year.includes(s));
    const matchMonth = txnFilterMonth ? t.month_year?.split('-')[1] === txnFilterMonth : true;
    const matchYear = txnFilterYear ? t.month_year?.split('-')[0] === txnFilterYear : true;
    return matchSearch && matchMonth && matchYear;
  });

  if (loading) return <div className="flex justify-center py-20"><div className="sp" /></div>;

  if (user.role === 'member') {
    const now = new Date();
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <StatCard colorClass="bg-green-500/15 text-green-500" icon={PiggyBank} label="জমাকৃত চাঁদা" value={`৳${fmt(stats.totDep)}`} sub="মোট চাঁদা" />
          <StatCard colorClass="bg-brand-danger/15 text-brand-danger" icon={CheckCircle} label="পরিশোধিত জরিমানা" value={`৳${fmt(stats.totFinePaid)}`} sub="মোট পরিশোধ" />
          <StatCard colorClass="bg-brand-danger/25 text-brand-danger" icon={AlertTriangle} label="বকেয়া জরিমানা" value={`৳${fmt(stats.pendingFine)}`} sub="পরিশোধ বাকি" />
          <StatCard 
            colorClass={stats.paidThisMonth ? "bg-green-500/15 text-green-500" : "bg-brand-warning/15 text-brand-warning"} 
            icon={stats.paidThisMonth ? CheckCircle : AlertTriangle} 
            label="এই মাস" 
            value={stats.paidThisMonth ? "পরিশোধিত" : "বাকি আছে"} 
            sub={MB[now.getMonth()] + " " + now.getFullYear()} 
          />
          <StatCard colorClass="bg-blue-500/15 text-blue-500" icon={History} label="পেন্ডিং রিকোয়েস্ট" value={stats.pendingReqs.toString()} sub="অপেক্ষমাণ" />
        </div>
        
        <AIAnalyst stats={stats} user={user} />

        {!stats.paidThisMonth && (
           <div className="bg-brand-warning/10 border border-brand-warning/30 rounded-2xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-brand-warning" />
              <div className="text-xs font-medium text-brand-warning flex-1">
                 <strong>{MB[now.getMonth()]} মাসের</strong> চাঁদা এখনো দেওয়া হয়নি।
              </div>
              <button 
                onClick={() => (window as any).setActiveTab?.('payNow')}
                className="bg-brand-warning text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider active:scale-95 transition-transform"
              >
                এখনই দিন
              </button>
           </div>
        )}
        {stats.pendingFine > 0 && (
           <div className="bg-brand-danger/10 border border-brand-danger/30 rounded-2xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-brand-danger" />
              <div className="text-xs font-medium text-brand-danger flex-1">
                 আপনার <strong>৳{fmt(stats.pendingFine)}</strong> জরিমানা বকেয়া আছে।
              </div>
              <button 
                onClick={() => (window as any).setActiveTab?.('myFines')}
                className="bg-brand-danger text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider active:scale-95 transition-transform"
              >
                বিস্তারিত দেখুন
              </button>
           </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard colorClass="bg-green-500/15 text-green-500" icon={PiggyBank} label="মোট জমা (চাঁদা)" value={`৳${fmt(stats.totDep)}`} sub="সদস্যদের মোট চাঁদা" />
        <StatCard colorClass="bg-blue-500/15 text-blue-500" icon={TrendingUp} label="মোট বিনিয়োগ" value={`৳${fmt(stats.totInv)}`} sub={`${stats.activeInvsCount} টি সক্রিয়`} />
        <StatCard colorClass="bg-brand-accent/15 text-brand-accent" icon={BarChart3} label="মোট লাভ" value={`৳${fmt(stats.totProf)}`} sub="বিনিয়োগ থেকে আয়" />
        <StatCard colorClass="bg-brand-danger/15 text-brand-danger" icon={Info} label="সংগৃহীত জরিমানা" value={`৳${fmt(stats.totFine)}`} sub="পেমেন্ট রেকর্ড থেকে" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard colorClass="bg-brand-danger/15 text-brand-danger" icon={Receipt} label="মোট খরচ" value={`৳${fmt(stats.totExp)}`} sub="অপারেশনাল খরচ" />
        <StatCard 
           colorClass={stats.currentBalance >= 0 ? "bg-green-500/15 text-green-500" : "bg-brand-danger/15 text-brand-danger"} 
           icon={Wallet} 
           label="বর্তমান স্থিতি" 
           value={`৳${fmt(Math.abs(stats.currentBalance))}`} 
           sub="(চাঁদা+লাভ+জরিমানা)-(বিনিয়োগ+খরচ)" 
        />
        <StatCard colorClass="bg-blue-500/15 text-blue-500" icon={History} label="অপেক্ষামাণ" value={stats.pendingReqs.toString()} sub="রিকোয়েস্ট রিভিউ" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <ActionButton icon={Users} label="সদস্য" onClick={() => (window as any).setActiveTab?.('members')} color="bg-blue-500" />
        <ActionButton icon={Gavel} label="জরিমানা" onClick={() => (window as any).setActiveTab?.('fines')} color="bg-brand-danger" />
        <ActionButton icon={Wallet} label="জমা" onClick={() => (window as any).setActiveTab?.('deposit')} color="bg-green-500" />
        <ActionButton icon={TrendingUp} label="বিনিয়োগ" onClick={() => (window as any).setActiveTab?.('investments')} color="bg-brand-light" />
        <ActionButton icon={Receipt} label="খরচ" onClick={() => (window as any).setActiveTab?.('expenses')} color="bg-brand-warning" />
        <ActionButton icon={Settings} label="সেটিংস" onClick={() => (window as any).setActiveTab?.('settings')} color="bg-text-dark" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card title="সাম্প্রতিক লেনদেন">
            <div className="space-y-4 mb-4">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="নাম/মাস..."
                      value={txnSearch}
                      onChange={(e) => setTxnSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-1.5 pl-9 pr-3 text-[10px] outline-none focus:border-brand-light transition-all"
                    />
                  </div>
                  <select 
                    value={txnFilterMonth}
                    onChange={(e) => setTxnFilterMonth(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl py-1.5 px-3 text-[10px] outline-none focus:border-brand-light transition-all"
                  >
                    <option value="">সব মাস</option>
                    {MB.map((m, i) => (
                      <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                    ))}
                  </select>
                  <select 
                    value={txnFilterYear}
                    onChange={(e) => setTxnFilterYear(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl py-1.5 px-3 text-[10px] outline-none focus:border-brand-light transition-all"
                  >
                    <option value="">সব বছর</option>
                    {['2023', '2024', '2025', '2026'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
               </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
               {filteredRecentTxns.length > 0 ? filteredRecentTxns.map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-white/3 border border-white/5 rounded-xl group">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-light/10 text-brand-light flex items-center justify-center font-bold text-xs uppercase">
                           {t.member?.full_name?.charAt(0) || '?'}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                             <div className="text-xs font-bold text-white">{t.member?.full_name || 'অজানা সদস্য'}</div>
                             <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                               t.type === 'fine' ? 'bg-brand-danger/20 text-brand-danger' : 'bg-green-500/20 text-green-500'
                             }`}>
                               {t.type === 'fine' ? 'জরিমানা' : 'চাঁদা'}
                             </span>
                           </div>
                           <div className="text-[9px] text-text-muted uppercase">
                             {t.month_year ? (MB[parseInt(t.month_year.split('-')[1]) - 1] + ' ' + t.month_year.split('-')[0]) : fd(t.created_at)}
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <div className="text-xs font-black text-brand-light">৳{fmt(t.amount)}</div>
                           <div className="text-[8px] text-text-muted">{fd(t.created_at)}</div>
                        </div>
                        {(user.role === 'super_admin' || user.role === 'admin') && (
                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                 onClick={() => handleEditTxn(t)}
                                 className="p-1.5 hover:bg-white/10 rounded-lg text-text-muted hover:text-brand-light transition-colors"
                                 title="এডিট করুন"
                              >
                                 <Edit2 className="w-3 h-3" />
                              </button>
                              <button 
                                 onClick={() => handleDeleteTxn(t.id)}
                                 className="p-1.5 hover:bg-brand-danger/10 rounded-lg text-text-muted hover:text-brand-danger transition-colors"
                                 title="ডিলিট করুন"
                              >
                                 <Trash2 className="w-3 h-3" />
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               )) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center grayscale opacity-20">
                     <History className="w-10 h-10 mb-2" />
                     <div className="text-xs font-bold uppercase tracking-widest">কোনো রেকর্ড নেই</div>
                  </div>
               )}
            </div>
            {recentTxns.length > 0 && (
               <button 
                 onClick={() => (window as any).setActiveTab?.('reports')}
                 className="w-full py-2 text-[10px] font-black uppercase text-brand-light hover:bg-brand-light/5 rounded-lg transition-colors mt-2"
               >
                 সব লেনদেন দেখুন →
               </button>
            )}
            
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="লেনদেন এডিট করুন">
              <div className="space-y-4">
                <Input 
                   label="পরিমাণ (টাকা) *" 
                   type="number" 
                   value={editAmount} 
                   onChange={(e) => setEditAmount(e.target.value)} 
                   icon={Wallet}
                />
                <div className="grid grid-cols-2 gap-4">
                   <Select 
                      label="মাস" 
                      value={editMonth} 
                      onChange={(e) => setEditMonth(e.target.value)}
                      options={MB.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))}
                   />
                   <Select 
                      label="বছর" 
                      value={editYear} 
                      onChange={(e) => setEditYear(e.target.value)}
                      options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))}
                   />
                </div>
                <div className="pt-2">
                  <button 
                    onClick={saveEditTxn}
                    className="w-full py-3 bg-brand-light text-black rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    আপডেট সেভ করুন
                  </button>
                </div>
              </div>
            </Modal>

            <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="লেনদেন ডিলিট">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-brand-danger/10 flex items-center justify-center text-brand-danger">
                    <Trash2 className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-text-muted text-center">
                    আপনি কি নিশ্চিত যে এই লেনদেনটি চিরতরে ডিলিট করতে চান? এই অ্যাকশনটি আর পরিবর্তন করা যাবে না।
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setDeleteId(null)}
                    className="py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    বাতিল করুন
                  </button>
                  <button 
                    onClick={confirmDeleteAction}
                    className="py-3 bg-brand-danger text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    হ্যাঁ, ডিলিট করুন
                  </button>
                </div>
              </div>
            </Modal>
         </Card>

         <Card title="বকেয়া জরিমানা (শীর্ষ ৫)">
            <div className="space-y-3">
               {stats.membersWithFines.length > 0 ? stats.membersWithFines.map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between p-3 bg-brand-danger/5 border border-brand-danger/10 rounded-xl">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-danger/10 text-brand-danger flex items-center justify-center font-bold text-xs">
                           {m.name?.charAt(0)}
                        </div>
                        <div className="text-xs font-bold text-white">{m.name}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs font-black text-brand-danger">৳{fmt(m.total)}</div>
                        <div className="text-[8px] text-text-muted">বকেয়া পরিমাণ</div>
                     </div>
                  </div>
               )) : (
                  <div className="py-10 text-center opacity-20 text-xs font-bold uppercase tracking-widest">কোনো বকেয়া জরিমানা নেই</div>
               )}
               {stats.membersWithFines.length > 0 && (
                  <button 
                    onClick={() => (window as any).setActiveTab?.('fines')}
                    className="w-full py-2 text-[10px] font-black uppercase text-brand-danger hover:bg-brand-danger/5 rounded-lg transition-colors mt-2"
                  >
                    সব জরিমানা পরিচালনা করুন →
                  </button>
               )}
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <AIAnalyst stats={stats} user={user} />
         
         <div className="bg-white/3 border border-white/7 rounded-3xl p-6 flex flex-col justify-center">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-6">ফাউন্ডেশন হাইলাইটস</div>
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="text-xs font-medium text-text-muted">সক্রিয় বিনিয়োগ</span>
                  </div>
                  <span className="text-xs font-black text-white">{stats.activeInvsCount}টি</span>
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-brand-info" />
                    <span className="text-xs font-medium text-text-muted">পেন্ডিং রিকোয়েস্ট</span>
                  </div>
                  <span className="text-xs font-black text-white">{stats.pendingReqs}টি</span>
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-brand-warning" />
                    <span className="text-xs font-medium text-text-muted">অপারেশনাল খরচ</span>
                  </div>
                  <span className="text-xs font-black text-white">৳{fmt(stats.totExp)}</span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-light" style={{ width: '70%' }} />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, color }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group"
    >
      <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center mb-2 shadow-lg shadow-${color}/20 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function FinesView({ user, settings, onSelectMember, onViewReport, onToast }: { user: UserData, settings: any, onSelectMember?: (m: UserData) => void, onViewReport?: (m: UserData) => void, onToast: (m: string, t?: any) => void }) {
  const [members, setMembers] = useState<UserData[]>([]);
  const [fines, setFines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [amount, setAmount] = useState(settings?.defaultFine || '500');
  const [reason, setReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingFine, setEditingFine] = useState<any>(null);
  const [fSearch, setFSearch] = useState('');
  const [fFilterMonth, setFFilterMonth] = useState('');
  const [fFilterYear, setFFilterYear] = useState('');

  useEffect(() => {
    fetchData();
    if (user.role !== 'member') {
      checkAndGenerateAutomatedFines();
      syncFines(true);
    }
  }, []);

  const checkAndGenerateAutomatedFines = async () => {
    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const month = String(monthIndex + 1).padStart(2, '0');
    const year = now.getFullYear();
    const monthYear = `${year}-${month}`;
    const monthName = `${MB[monthIndex]} ${year}`;

    if (day <= 10) return;

    // Fetch members and their activity for this month + historical for adjustment
    const [r1, r2, r3, r4, r5] = await Promise.all([
      supabase.from('ywf_users').select('id').eq('role', 'member'),
      supabase.from('ywf_transactions').select('member_id').eq('type', 'deposit').eq('month_year', monthYear).eq('status', 'approved'),
      supabase.from('ywf_fines').select('member_id, reason').eq('month_year', monthYear),
      supabase.from('ywf_transactions').select('member_id, amount').eq('type', 'fine').eq('status', 'approved'),
      supabase.from('ywf_fines').select('member_id, amount').eq('status', 'paid')
    ]);

    if (!r1.data) return;

    const paidMemberIds = new Set(r2.data?.map(d => d.member_id) || []);
    const existingFines = r3.data || [];
    
    // Calculate surplus fine payments for each member
    const surplusByMember: Record<string, number> = {};
    r4.data?.forEach(t => {
      surplusByMember[t.member_id] = (surplusByMember[t.member_id] || 0) + Number(t.amount);
    });
    r5.data?.forEach(f => {
      surplusByMember[f.member_id] = (surplusByMember[f.member_id] || 0) - Number(f.amount);
    });

    const finesToAdd = [];

    for (const member of r1.data) {
      if (paidMemberIds.has(member.id)) continue;

      let memberSurplus = surplusByMember[member.id] || 0;

      // 10th Day Fine
      if (day > 10) {
        const has10th = existingFines.some(f => f.member_id === member.id && f.reason.includes('১০ তারিখ'));
        if (!has10th) {
          const fineAmount = 20;
          const isAutoPaid = memberSurplus >= fineAmount;
          finesToAdd.push({
            member_id: member.id,
            amount: fineAmount,
            reason: 'বকেয়া চাঁদা জরিমানা (১০ তারিখ)',
            month_year: monthYear,
            status: isAutoPaid ? 'paid' : 'pending',
            paid_at: isAutoPaid ? new Date().toISOString() : null
          });
          if (isAutoPaid) memberSurplus -= fineAmount;
        }
      }

      // 20th Day Fine
      if (day > 20) {
        const has20th = existingFines.some(f => f.member_id === member.id && f.reason.includes('২০ তারিখ'));
        if (!has20th) {
          const fineAmount = 30;
          const isAutoPaid = memberSurplus >= fineAmount;
          finesToAdd.push({
            member_id: member.id,
            amount: fineAmount,
            reason: 'বকেয়া চাঁদা জরিমানা (২০ তারিখ)',
            month_year: monthYear,
            status: isAutoPaid ? 'paid' : 'pending',
            paid_at: isAutoPaid ? new Date().toISOString() : null
          });
          if (isAutoPaid) memberSurplus -= fineAmount;
        }
      }
    }

    if (finesToAdd.length > 0) {
      await supabase.from('ywf_fines').insert(finesToAdd);
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [r1, r2] = await Promise.all([
      supabase.from('ywf_users').select('*').eq('role', 'member').order('full_name'),
      supabase.from('ywf_fines').select('*, member:ywf_users!member_id(full_name, account_number)').order('created_at', { ascending: false })
    ]);
    if (r1.data) setMembers(r1.data);
    if (r2.data) setFines(r2.data);
    setLoading(false);
  };

  const handleAddFine = async () => {
    if (!selectedMember || !amount || !reason) return;
    setIsAdding(true);
    const mk = `${year}-${month}`;
    
    if (editingFine) {
      const { error } = await supabase.from('ywf_fines').update({
        member_id: selectedMember,
        amount: parseFloat(amount),
        reason,
        month_year: mk
      }).eq('id', editingFine.id);

      if (!error) {
        onToast('জরিমানা আপডেট করা হয়েছে', 's');
        setIsModalOpen(false);
        setEditingFine(null);
        setAmount('');
        setReason('');
        setSelectedMember('');
        fetchData();
      } else {
        onToast(`ত্রুটি: ${error.message}`, 'e');
      }
    } else {
      // Auto-Adjust Logic: Check if member has surplus fine payments
      const [tRes, fRes] = await Promise.all([
        supabase.from('ywf_transactions').select('amount').eq('member_id', selectedMember).eq('type', 'fine').eq('status', 'approved'),
        supabase.from('ywf_fines').select('amount').eq('member_id', selectedMember).eq('status', 'paid')
      ]);
      
      const paidFineAmount = (tRes.data || []).reduce((s, t) => s + Number(t.amount), 0);
      const accountedFineAmount = (fRes.data || []).reduce((s, f) => s + Number(f.amount), 0);
      const surplus = paidFineAmount - accountedFineAmount;
      const fineAmount = parseFloat(amount);
      
      const isAutoPaid = surplus >= fineAmount;

      const { data: newFine, error } = await supabase.from('ywf_fines').insert({
        member_id: selectedMember,
        amount: fineAmount,
        reason,
        month_year: mk,
        status: isAutoPaid ? 'paid' : 'pending',
        paid_at: isAutoPaid ? new Date().toISOString() : null
      }).select().single();

      if (!error) {
        if (isAutoPaid) {
          onToast('জরিমানা যোগ করা হয়েছে এবং স্বয়ংক্রিয়ভাবে ব্যালেন্স থেকে সমন্বয় করা হয়েছে', 's');
        } else {
          onToast('জরিমানা সফলভাবে ইস্যু করা হয়েছে', 's');
        }
        setIsModalOpen(false);
        setAmount('');
        setReason('');
        setSelectedMember('');
        fetchData();
      } else {
        onToast(`ত্রুটি: ${error.message}`, 'e');
      }
    }
    setIsAdding(false);
  };

  const handleDeleteFine = async (id: string) => {
    if (user.role === 'member') {
      onToast('আপনার এই কাজটি করার অনুমতি নেই', 'e');
      return;
    }
    
    if (!window.confirm('আপনি কি নিশ্চিত যে এই জরিমানা রেকর্ডটি মুছে ফেলতে চান?')) return;
    
    try {
      setLoading(true);
      // Optimistically remove from state
      setFines(prev => prev.filter(f => f.id !== id));
      
      const { error } = await supabase.from('ywf_fines').delete().eq('id', id);
      
      if (error) {
        onToast('মুছে ফেলা যায়নি: ' + error.message, 'e');
        await fetchData();
      } else {
        onToast('জরিমানা মুছে ফেলা হয়েছে', 's');
        await fetchData();
      }
    } catch (err: any) {
      onToast('একটি অজানা ত্রুটি ঘটেছে', 'e');
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  const markPaid = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই জরিমানাটি প্রাপ্ত হয়েছে? এটি করলে একটি ক্যাশ পেমেন্ট রেকর্ড হিসেবে গণ্য হবে।')) return;
    
    // 1. Get fine details
    const f = fines.find(fine => fine.id === id);
    if (!f) return;

    // 2. Create a transaction for it (to ensure balance is updated)
    const { error: tErr } = await supabase.from('ywf_transactions').insert({
      member_id: f.member_id,
      amount: f.amount,
      type: 'fine',
      month_year: f.month_year,
      payment_method: 'cash',
      status: 'approved',
      note: `ম্যানুয়াল পরিশোধ: ${f.reason}`
    });

    if (tErr) {
       onToast('লেনদেন রেকর্ড করা যায়নি: ' + tErr.message, 'e');
       return;
    }

    // 3. Mark fine as paid
    const { error } = await supabase.from('ywf_fines').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', id);
    if (!error) {
       onToast('জরিমানা পরিশোধিত হিসেবে চিহ্নিত করা হয়েছে', 's');
       fetchData();
    } else {
       onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  const syncFines = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [tRes, fRes] = await Promise.all([
        supabase.from('ywf_transactions').select('member_id, amount').eq('type', 'fine').eq('status', 'approved'),
        supabase.from('ywf_fines').select('id, member_id, amount, status').order('created_at', { ascending: true })
      ]);
      
      const transactions = tRes.data || [];
      const allFines = fRes.data || [];
      
      const updates = [];
      const memberIds = Array.from(new Set([...transactions.map(t => t.member_id), ...allFines.map(f => f.member_id)]));
      
      for (const mId of memberIds) {
        const mTxns = transactions.filter(t => t.member_id === mId);
        const mFines = allFines.filter(f => f.member_id === mId);
        
        const totalPaid = mTxns.reduce((s, t) => s + Number(t.amount), 0);
        let surplus = totalPaid;
        
        // Subtract already paid fines
        mFines.filter(f => f.status === 'paid').forEach(f => surplus -= Number(f.amount));
        
        // Settle pending fines
        for (const f of mFines.filter(f => f.status === 'pending')) {
          if (surplus >= f.amount) {
            updates.push(supabase.from('ywf_fines').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', f.id));
            surplus -= f.amount;
          }
        }
      }
      
      if (updates.length > 0) {
        await Promise.all(updates);
        if (!silent) onToast(`${updates.length}টি জরিমানা সমন্বয় করা হয়েছে`, 's');
        fetchData();
      } else if (!silent) {
        onToast('সব জরিমানা সমন্বয় করা আছে', 'i');
      }
    } catch (e: any) {
      if (!silent) onToast('সমন্বয় করতে ব্যর্থ: ' + e.message, 'e');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'summary'>('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-white">জরিমানা রেকর্ড</h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">স্বয়ংক্রিয় ও ম্যানুয়াল জরিমানা ম্যানেজমেন্ট</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-danger hover:bg-red-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 shadow-lg shadow-brand-danger/20 transition-all active:scale-95 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> জরিমানা যোগ করুন
        </button>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl gap-1 w-fit">
        <button 
          onClick={() => setActiveSubTab('all')}
          className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'all' ? 'bg-white/10 text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
        >
          সব রেকর্ড
        </button>
        <button 
          onClick={() => setActiveSubTab('summary')}
          className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'summary' ? 'bg-white/10 text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
        >
          সদস্য ভিত্তিক
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="sp" /></div>
      ) : activeSubTab === 'all' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                 <input 
                   type="text" 
                   placeholder="সদস্য খুঁজুন..."
                   value={fSearch}
                   onChange={(e) => setFSearch(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-brand-light transition-all"
                 />
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => syncFines()}
                   className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-text-muted hover:text-brand-light hover:bg-brand-light/10 transition-all"
                   title="অটো অ্যাডজাস্ট"
                 >
                   <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                 </button>
                 <select 
                   value={fFilterMonth}
                   onChange={(e) => setFFilterMonth(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs outline-none focus:border-brand-light transition-all"
                 >
                   <option value="">সব মাস</option>
                   {MB.map((m, i) => (
                     <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                   ))}
                 </select>
                 <select 
                   value={fFilterYear}
                   onChange={(e) => setFFilterYear(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs outline-none focus:border-brand-light transition-all"
                 >
                   <option value="">সব বছর</option>
                   {['2023', '2024', '2025', '2026'].map(y => (
                     <option key={y} value={y}>{y}</option>
                   ))}
                 </select>
               </div>
            </div>

            {fines.filter(f => {
              const s = fSearch.toLowerCase();
              const mName = (f as any).member?.full_name?.toLowerCase() || '';
              const matchSearch = mName.includes(s) || f.reason?.toLowerCase().includes(s);
              const matchMonth = fFilterMonth ? f.month_year?.split('-')[1] === fFilterMonth : true;
              const matchYear = fFilterYear ? f.month_year?.split('-')[0] === fFilterYear : true;
              return matchSearch && matchMonth && matchYear;
            }).length === 0 ? (
              <div className="bg-white/3 border border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center text-text-muted opacity-30">
                <Gavel className="w-16 h-16 mb-4" />
                <p className="font-bold">এখনো কোনো জরিমানা নেই</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fines.filter(f => {
                  const s = fSearch.toLowerCase();
                  const mName = (f as any).member?.full_name?.toLowerCase() || '';
                  const matchSearch = mName.includes(s) || f.reason?.toLowerCase().includes(s);
                  const matchMonth = fFilterMonth ? f.month_year?.split('-')[1] === fFilterMonth : true;
                  const matchYear = fFilterYear ? f.month_year?.split('-')[0] === fFilterYear : true;
                  return matchSearch && matchMonth && matchYear;
                }).map(f => (
                  <div key={f.id} className="bg-white/3 border border-white/7 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${f.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-brand-danger/10 text-brand-danger'}`}>
                        <Gavel className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-brand-light transition-colors">{(f as any).member?.full_name}</div>
                        <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{f.reason} • {f.month_year ? (MB[parseInt(f.month_year.split('-')[1]) - 1] + ' ' + f.month_year.split('-')[0]) : ''}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                      <div className="text-right mr-2">
                        <div className="text-lg font-black text-white">৳{fmt(f.amount)}</div>
                        <div className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${f.status === 'paid' ? 'bg-green-500/15 text-green-500' : 'bg-brand-danger/15 text-brand-danger'}`}>
                          {f.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}
                        </div>
                      </div>
                      {user.role !== 'member' && (
                        <div className="flex gap-2">
                          {f.status === 'pending' && (
                            <button 
                              onClick={() => markPaid(f.id)}
                              className="bg-green-500/10 text-green-500 p-2.5 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                              title="পরিশোধিত"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setSelectedMember(f.member_id);
                              setAmount(f.amount.toString());
                              setReason(f.reason);
                              setEditingFine(f);
                              setIsModalOpen(true);
                            }}
                            className="bg-blue-500/10 text-blue-500 p-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                            title="সম্পাদনা"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteFine(f.id)}
                            className="bg-brand-danger/10 text-brand-danger p-2.5 rounded-xl hover:bg-brand-danger hover:text-white transition-all shadow-sm"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card title="পরিসংখ্যান">
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-brand-danger/10 border border-brand-danger/20">
                    <div className="text-[10px] font-bold text-brand-danger uppercase tracking-widest mb-1">মোট বকেয়া</div>
                    <div className="text-2xl font-black text-brand-danger">৳{fmt(fines.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0))}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">মোট পরিশোধ</div>
                    <div className="text-2xl font-black text-green-500">৳{fmt(fines.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0))}</div>
                  </div>
               </div>
            </Card>
            <div className="bg-white/3 border border-white/7 rounded-3xl p-6">
               <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">পেমেন্ট টিপস</div>
               <p className="text-[10px] text-text-dark leading-relaxed">চাঁদা সময়মতো পরিশোধ করলে জরিমানা এড়ানো সম্ভব। প্রতি মাসের ১০ তারিখের মধ্যে জমা দিতে উৎসাহিত করুন।</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="সদস্য বা অ্যাকাউন্ট নম্বর দিয়ে খুঁজুন..." 
              value={fSearch}
              onChange={(e) => setFSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-light transition-all"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.filter(m => 
              m.full_name.toLowerCase().includes(fSearch.toLowerCase()) || 
              m.account_number?.includes(fSearch)
            ).map(m => {
            const mFines = fines.filter(f => f.member_id === m.id);
            const pending = mFines.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0);
            const paid = mFines.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
            
            return (
              <div key={m.id} className="bg-white/3 border border-white/7 rounded-2xl p-5 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-accent flex items-center justify-center font-black text-white overflow-hidden shrink-0">
                    {m.photo_url ? <img src={m.photo_url} alt="" className="w-full h-full object-cover" /> : m.full_name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate group-hover:text-brand-light transition-colors">{m.full_name}</div>
                    <div className="text-[10px] text-text-muted">{m.account_number || '—'}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${pending > 0 ? 'bg-brand-danger/10 border border-brand-danger/20' : 'bg-white/5 opacity-30'}`}>
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">বকেয়া</div>
                    <div className={`text-sm font-black ${pending > 0 ? 'text-brand-danger' : 'text-text-muted'}`}>৳{fmt(pending)}</div>
                  </div>
                  <div className={`p-3 rounded-xl ${paid > 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 opacity-30'}`}>
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">পরিশোধিত</div>
                    <div className={`text-sm font-black ${paid > 0 ? 'text-green-500' : 'text-text-muted'}`}>৳{fmt(paid)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                     onClick={() => {
                       setFSearch(m.full_name);
                       setActiveSubTab('all');
                     }}
                     className="py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-light hover:text-white transition-all shadow-sm"
                  >
                     বিস্তারিত
                  </button>
                  <button 
                     onClick={() => onViewReport?.(m)}
                     className="py-2 bg-brand-light/10 text-brand-light border border-brand-light/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-light hover:text-white transition-all shadow-sm"
                  >
                     রিপোর্ট
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="জরিমানা যোগ করুন">
        <div className="space-y-4">
          <Select 
            label="সদস্য *" 
            value={selectedMember} 
            onChange={(e) => setSelectedMember(e.target.value)}
            options={[{ value: '', label: 'সদস্য সিলেক্ট করুন' }, ...members.map(m => ({ value: m.id, label: `${m.full_name} (${m.account_number || '—'})` }))]} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="মাস *" 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              options={MB.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))} 
            />
            <Select 
              label="বছর *" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))} 
            />
          </div>
          <Input label="পরিমাণ (৳) *" type="number" placeholder="500" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input label="কারণ *" placeholder="মিটিংয়ে অনুপস্থিতি" value={reason} onChange={(e) => setReason(e.target.value)} />
          
          <button 
            onClick={handleAddFine}
            disabled={!selectedMember || !amount || !reason || isAdding}
            className="w-full bg-brand-danger hover:bg-red-600 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-danger/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isAdding ? <div className="sp w-5 h-5" /> : 'জরিমানা ইস্যু করুন'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

function MemberReportView({ user, targetUser, onBack, onToast }: { user: UserData, targetUser: UserData, onBack: () => void, onToast: (m: string, t?: any) => void }) {
  return (
    <div className="px-1">
       <button onClick={onBack} className="mb-4 flex items-center gap-2 text-text-muted hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
       </button>
       <MemberDetailContent targetUser={targetUser} user={user} onToast={onToast} />
    </div>
  );
}

function MemberDetailModal({ isOpen, onClose, targetUser, user, onToast }: { isOpen: boolean, onClose: () => void, targetUser: UserData | null, user: UserData, onToast: (m: string, t?: any) => void }) {
  if (!targetUser) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="সদস্যের বিবরণ" maxWidth="max-w-4xl">
       <MemberDetailContent targetUser={targetUser} user={user} onToast={onToast} onClose={onClose} />
    </Modal>
  );
}

function MemberDetailContent({ targetUser, user, onToast, onClose }: { targetUser: UserData, user: UserData, onToast: (m: string, t?: any) => void, onClose?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [fines, setFines] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  
  // Edit State
  const [editingItem, setEditingItem] = useState<{ type: 'fine' | 'deposit', data: any } | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editMonth, setEditMonth] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editReason, setEditReason] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [targetUser.id]);

  const fetchData = async () => {
    setLoading(true);
    const [r1, r2] = await Promise.all([
      supabase.from('ywf_fines').select('*').eq('member_id', targetUser.id).order('month_year', { ascending: false }),
      supabase.from('ywf_transactions').select('*').eq('member_id', targetUser.id).eq('status', 'approved').order('month_year', { ascending: false })
    ]);
    if (r1.data) setFines(r1.data);
    if (r2.data) setDeposits(r2.data);
    setLoading(false);
  };

  const handleDeleteFine = async (id: string) => {
    if (user.role === 'member') {
      onToast('আপনার এই কাজটি করার অনুমতি নেই', 'e');
      return;
    }
    
    if (!window.confirm('আপনি কি নিশ্চিত যে এই জরিমানা রেকর্ডটি মুছে ফেলতে চান?')) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.from('ywf_fines').delete().eq('id', id);
      
      if (error) {
        alert('মুছে ফেলা যায়নি: ' + error.message);
        onToast('মুছে ফেলা যায়নি: ' + error.message, 'e');
      } else {
        onToast('জরিমানা মুছে ফেলা হয়েছে', 's');
        await fetchData();
      }
    } catch (err: any) {
      alert('একটি ত্রুটি ঘটেছে: ' + err.message);
      onToast('একটি অজানা ত্রুটি ঘটেছে', 'e');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeposit = async (id: string) => {
     if (user.role === 'member') {
       onToast('আপনার এই কাজটি করার অনুমতি নেই', 'e');
       return;
     }
     if (!window.confirm('আপনি কি এই লেনদেন মুছে ফেলতে চান?')) return;
     try {
       const { error } = await supabase.from('ywf_transactions').delete().eq('id', id);
       if (!error) {
         onToast('লেনদেন মুছে ফেলা হয়েছে', 's');
         fetchData();
       } else {
         onToast('মুছে ফেলা যায়নি: ' + error.message, 'e');
       }
     } catch (err: any) {
       onToast('একটি ত্রুটি ঘটেছে: ' + err.message, 'e');
     }
  }

  const handleUpdate = async () => {
    if (!editingItem) return;
    const table = editingItem.type === 'fine' ? 'ywf_fines' : 'ywf_transactions';
    const monthYear = `${editYear}-${editMonth}`;
    
    const updateData: any = {
      amount: parseFloat(editAmount),
      month_year: monthYear,
    };
    if (editingItem.type === 'fine') updateData.reason = editReason;

    const { error } = await supabase.from(table).update(updateData).eq('id', editingItem.data.id);
    if (!error) {
      onToast('সফলভাবে আপডেট করা হয়েছে', 's');
      setIsEditModalOpen(false);
      fetchData();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  const totFine = fines.reduce((s, f) => s + f.amount, 0);
  const pendingFine = fines.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0);
  const totFeePaid = deposits.filter(d => d.type === 'deposit').reduce((s, d) => s + Number(d.amount), 0);
  const totFinePaid = deposits.filter(d => d.type === 'fine').reduce((s, d) => s + Number(d.amount), 0);

  const history = [
    ...deposits.map(d => ({ ...d, hType: 'deposit' })),
    ...fines.map(f => ({ ...f, hType: 'fine' }))
  ].sort((a, b) => b.month_year.localeCompare(a.month_year));

  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-3xl bg-brand-light flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-lg shadow-brand-light/20 font-bangla">
                  {targetUser.photo_url ? <img src={targetUser.photo_url} alt="" className="w-full h-full object-cover rounded-3xl" /> : targetUser.full_name?.charAt(0)}
               </div>
               <div>
                  <h2 className="text-2xl font-black text-white font-bangla">{targetUser.full_name}</h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-text-muted font-medium text-[11px] font-bangla">
                     <span>{targetUser.account_number}</span>
                     <span className="opacity-20">|</span>
                     <span>{targetUser.email}</span>
                     <span className="opacity-20">|</span>
                     <span>{targetUser.phone}</span>
                  </div>
               </div>
            </div>
            <button 
               onClick={() => {
                  onClose?.();
                  (window as any).setSelectedMemberForProfile?.(targetUser);
                  (window as any).setActiveTab?.('profile');
               }}
               className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-light hover:text-white transition-all text-text-muted group"
               title="প্রোফাইল এডিট"
            >
               <Edit2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center group hover:bg-green-500/15 transition-all shadow-lg shadow-green-500/5">
              <div className="text-2xl sm:text-3xl font-black text-green-500 mb-1">৳{fmt(totFeePaid)}</div>
              <div className="text-[10px] font-bold text-green-500/60 uppercase tracking-[0.2em] font-bangla">জমাকৃত চাঁদা</div>
            </div>
            <div className="bg-brand-danger/10 border border-brand-danger/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center group hover:bg-brand-danger/15 transition-all shadow-lg shadow-brand-danger/5">
              <div className="text-2xl sm:text-3xl font-black text-brand-danger mb-1">৳{fmt(totFinePaid)}</div>
              <div className="text-[10px] font-bold text-brand-danger/60 uppercase tracking-[0.2em] font-bangla">পরিশোধিত জরিমানা</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center group hover:bg-orange-500/15 transition-all shadow-lg shadow-orange-500/5">
              <div className="text-2xl sm:text-3xl font-black text-orange-500 mb-1">৳{fmt(pendingFine)}</div>
              <div className="text-[10px] font-bold text-orange-500/60 uppercase tracking-[0.2em] font-bangla">বকেয়া জরিমানা</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => {
                 onClose?.();
                 (window as any).setActiveTab?.('deposit');
               }}
               className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-[2rem] text-sm font-black flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 font-bangla"
             >
               <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><Download className="w-4 h-4" /></div> টাকা জমা
             </button>
             <button 
               onClick={() => {
                 onClose?.();
                 (window as any).setActiveTab?.('fines');
               }}
               className="w-full py-4 bg-brand-danger hover:bg-red-600 text-white rounded-[2rem] text-sm font-black flex items-center justify-center gap-3 shadow-xl shadow-brand-danger/20 transition-all hover:-translate-y-0.5 active:translate-y-0 font-bangla"
             >
               <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><Gavel className="w-4 h-4" /></div> জরিমানা
             </button>
          </div>

          {/* History Table */}
          <div className="bg-white/3 border border-white/7 rounded-[2rem] overflow-hidden">
             <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2 font-bangla">
                   <History className="w-4 h-4 text-brand-light" /> লেনদেন ইতিহাস
                </h3>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                         <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest font-bangla">মাস</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right font-bangla">পরিমাণ</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center font-bangla">ধরণ</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest font-bangla">তারিখ</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right font-bangla">অ্যাকশন</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {loading ? (
                        <tr><td colSpan={5} className="py-20 text-center"><div className="sp mx-auto" /></td></tr>
                      ) : history.length === 0 ? (
                        <tr><td colSpan={5} className="py-20 text-center text-text-muted italic text-[10px] opacity-30">কোনো রেকর্ড পাওয়া যায়নি</td></tr>
                      ) : history.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                           <td className="px-6 py-4">
                              <div className="text-xs font-bold text-white uppercase font-bangla">{item.month_year ? (MB[parseInt(item.month_year.split('-')[1]) - 1] + ' ' + item.month_year.split('-')[0]) : '—'}</div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className={`text-sm font-black ${item.hType === 'deposit' ? 'text-green-500' : (item.status === 'paid' ? 'text-green-500' : 'text-brand-danger')}`}>৳{fmt(item.amount)}</div>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter whitespace-nowrap font-bangla ${item.hType === 'deposit' ? 'bg-green-500/15 text-green-500' : 'bg-brand-danger/15 text-brand-danger'}`}>
                                {item.hType === 'deposit' ? 'জমা' : 'জরিমানা'}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-[10px] text-text-muted font-bangla">{new Date(item.created_at).toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                 {user.role !== 'member' && (
                                   <>
                                 <button 
                                    onClick={() => {
                                       setEditingItem({ type: item.hType as any, data: item });
                                       setEditAmount(item.amount.toString());
                                       setEditMonth(item.month_year?.split('-')[1] || '');
                                       setEditYear(item.month_year?.split('-')[0] || '');
                                       setEditReason(item.reason || '');
                                       setIsEditModalOpen(true);
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                 >
                                    <Edit2 className="w-3.5 h-3.5" />
                                 </button>
                                 <button 
                                    onClick={() => item.hType === 'deposit' ? handleDeleteDeposit(item.id) : handleDeleteFine(item.id)}
                                    className="p-2 bg-brand-danger/10 text-brand-danger rounded-lg hover:bg-brand-danger hover:text-white transition-all shadow-sm"
                                 >
                                    <Trash2 className="w-3.5 h-3.5" />
                                 </button>
                                 </>
                                 )}
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

       {/* Edit Entry Modal */}
       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={editingItem?.type === 'fine' ? 'জরিমানা সংশোধন' : 'লেনদেন সংশোধন'}>
         <div className="space-y-4 font-bangla">
            <Input label="পরিমাণ (৳) *" type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
               <Select 
                 label="মাস *" 
                 value={editMonth}
                 onChange={(e) => setEditMonth(e.target.value)}
                 options={MB.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))} 
               />
               <Select 
                 label="বছর *" 
                 value={editYear}
                 onChange={(e) => setEditYear(e.target.value)}
                 options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))} 
               />
            </div>
            {editingItem?.type === 'fine' && (
              <Input label="কারন" value={editReason} onChange={e => setEditReason(e.target.value)} />
            )}
            <div className="flex gap-3 pt-4">
               <button onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-2xl text-xs font-bold">বাতিল</button>
               <button onClick={handleUpdate} className="flex-1 bg-brand-light hover:bg-brand-primary text-white py-3 rounded-2xl text-xs font-black shadow-lg shadow-brand-light/20 transition-all">হালনাগাদ করুন</button>
            </div>
         </div>
       </Modal>
    </div>
  );
}

function MyFinesView({ user, onToast }: { user: UserData, onToast: (m: string, t?: any) => void }) {
  const [fines, setFines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    const { data } = await supabase
      .from('ywf_fines')
      .select('*')
      .eq('member_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setFines(data);
    setLoading(false);
  };

  const pendingAmount = fines.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">আমার জরিমানা</h2>
        <div className="px-4 py-2 bg-brand-danger/10 border border-brand-danger/20 rounded-2xl">
          <span className="text-[10px] font-bold text-brand-danger uppercase tracking-widest mr-2">মোট বকেয়া:</span>
          <span className="text-sm font-black text-brand-danger">৳{fmt(pendingAmount)}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="sp" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fines.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center opacity-20">
              <CheckCircle className="w-16 h-16 mb-2" />
              <p>আপনার কোনো জরিমানা নেই</p>
            </div>
          ) : (
            fines.map(f => (
              <div key={f.id} className="bg-white/3 border border-white/7 rounded-2xl p-5 flex items-center justify-between group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-brand-danger/10 text-brand-danger'}`}>
                    <Gavel className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{f.reason}</div>
                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{f.month_year ? (MB[parseInt(f.month_year.split('-')[1]) - 1] + ' ' + f.month_year.split('-')[0]) : ''}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black">৳{fmt(f.amount)}</div>
                  <div className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${f.status === 'paid' ? 'bg-green-500/15 text-green-500' : 'bg-brand-danger/15 text-brand-danger'}`}>
                    {f.status === 'paid' ? 'পরিশোধিত' : 'বাকি আছে'}
                  </div>
                  {f.status === 'pending' && (
                    <button 
                      onClick={() => {
                        (window as any).paymentParams = { type: 'fine', amount: f.amount };
                        (window as any).setActiveTab?.('payNow');
                      }}
                      className="block w-full mt-3 bg-brand-danger text-white py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 transition-all shadow-lg shadow-brand-danger/20"
                    >
                      এখনই পেমেন্ট করুন
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function MembersView({ user, onSelectMember, onViewReport, onToast }: { user: UserData, onSelectMember?: (m: UserData) => void, onViewReport?: (m: UserData) => void, onToast: (m: string, t?: any) => void }) {
  const [members, setMembers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForDetail, setSelectedForDetail] = useState<UserData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // New Member State
  const [newName, setNewName] = useState('');
  const [newAcc, setNewAcc] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newNid, setNewNid] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [addingMember, setAddingMember] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('ywf_users')
      .select('*')
      .eq('role', 'member')
      .order('full_name');
    
    if (data) setMembers(data);
    setLoading(false);
  };

  const openDetail = (m: UserData) => {
    setSelectedForDetail(m);
    setIsDetailOpen(true);
  };

  const handleCreateMember = async () => {
    if (!newName || !newPhone || !newPassword) {
      onToast('সব তথ্য পূরণ করুন', 'e');
      return;
    }
    setAddingMember(true);
    try {
      const email = newEmail || `${newPhone}@ywf.com`;
      const { data: { user: authUser }, error: authError } = await supabase.auth.signUp({
        email,
        password: newPassword,
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('ywf_users').insert({
        id: authUser?.id,
        email,
        full_name: newName,
        account_number: newAcc,
        phone: newPhone,
        nid_number: newNid,
        address: newAddress,
        role: 'member',
        is_active: true
      });

      if (dbError) throw dbError;

      onToast('সদস্য সফলভাবে যোগ করা হয়েছে', 's');
      setIsModalOpen(false);
      setNewName('');
      setNewAcc('');
      setNewPhone('');
      setNewEmail('');
      setNewPassword('');
      setNewNid('');
      setNewAddress('');
      fetchMembers();
    } catch (e: any) {
      onToast(`ত্রুটি: ${e.message}`, 'e');
    } finally {
      setAddingMember(false);
    }
  };

  const filtered = members.filter(m => 
    m.full_name.toLowerCase().includes(search.toLowerCase()) || 
    m.account_number?.includes(search) || 
    m.phone?.includes(search)
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full max-w-xs">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark" />
             <input 
               type="text" 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="সদস্য খুঁজুন..." 
               className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-light transition-all"
             />
          </div>
          {user.role === 'super_admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-brand-light hover:bg-brand-primary text-white px-6 py-2.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-light/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> নতুন সদস্য
            </button>
          )}
       </div>

       {loading ? (
         <div className="flex justify-center py-20"><div className="sp" /></div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
               <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-20">
                  <Users className="w-16 h-16 mb-2" />
                  <p className="text-sm">কোনো সদস্য পাওয়া যায়নি</p>
               </div>
            ) : filtered.map(m => (
              <motion.div 
                layout
                key={m.id}
                onClick={() => openDetail(m)}
                className="bg-white/3 border border-white/7 rounded-2xl p-4 flex items-center gap-4 hover:bg-brand-light/5 hover:border-brand-light/30 transition-all cursor-pointer group"
              >
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-light to-brand-accent flex items-center justify-center text-lg font-black text-white shrink-0 overflow-hidden">
                    {m.photo_url ? <img src={m.photo_url} alt="" className="w-full h-full object-cover" /> : m.full_name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate group-hover:text-brand-light transition-colors">{m.full_name}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{m.account_number || '—'}</div>
                    <div className="text-[10px] text-text-dark font-medium mt-0.5">{m.phone || m.email}</div>
                 </div>
                 <div className="flex gap-2">
                    <button 
                       onClick={(e) => {
                          e.stopPropagation();
                          openDetail(m);
                       }}
                       className="p-2 bg-brand-light/10 text-brand-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-light hover:text-white"
                       title="রিপোর্ট"
                    >
                       <FileText className="w-3.5 h-3.5" />
                    </button>
                    {user.role === 'super_admin' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!window.confirm('আপনি কি নিশ্চিত যে এই সদস্যকে মুছে ফেলতে চান?')) return;
                          supabase.from('ywf_users').delete().eq('id', m.id).then(({ error }) => {
                            if (!error) fetchMembers();
                            else alert('ডিলিট করা যায়নি: ' + error.message);
                          });
                        }}
                        className="p-2 bg-brand-danger/10 text-brand-danger rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-danger hover:text-white"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <ChevronRight className="w-4 h-4 text-text-dark group-hover:translate-x-1 group-hover:text-brand-light transition-all self-center" />
                 </div>
              </motion.div>
            ))}
         </div>
       )}

       <MemberDetailModal 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
          targetUser={selectedForDetail} 
          user={user} 
          onToast={onToast} 
       />

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="নতুন সদস্য যোগ করুন">
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <Input label="পূর্ণ নাম *" placeholder="সদস্যের নাম" value={newName} onChange={e => setNewName(e.target.value)} />
                <Input label="হিসাব নম্বর" placeholder="YWF-XXXXXX" value={newAcc} onChange={e => setNewAcc(e.target.value)} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Input label="ফোন নম্বর *" placeholder="01XXXXXXXXX" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
                <Input label="পাসওয়ার্ড *" type="password" placeholder="কমপক্ষে ৬ অক্ষর" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
             </div>
             <Input label="NID নম্বর" placeholder="জাতীয় পরিচয়পত্র নম্বর" value={newNid} onChange={e => setNewNid(e.target.value)} />
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">ঠিকানা</label>
                <textarea 
                  value={newAddress || ''}
                  onChange={e => setNewAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light focus:bg-brand-light/5 transition-all min-h-20" 
                  placeholder="সম্পূর্ণ ঠিকানা" 
                />
             </div>
             <div className="flex gap-3 pt-2">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-text-primary py-3 rounded-2xl text-xs font-bold transition-all">বাতিল</button>
                <button 
                  onClick={handleCreateMember}
                  disabled={addingMember}
                  className="flex-[2] bg-brand-light hover:bg-brand-primary text-white py-3 rounded-2xl text-xs font-black shadow-lg shadow-brand-light/20 transition-all flex items-center justify-center gap-2"
                >
                   {addingMember ? <div className="sp w-4 h-4" /> : <Plus className="w-4 h-4" />} সদস্য যোগ করুন
                </button>
             </div>
          </div>
       </Modal>
    </div>
  );
}

function DepositView({ user, settings, onToast }: { user: UserData, settings: any, onToast: (m: string, t?: any) => void }) {
  const [members, setMembers] = useState<UserData[]>([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [amount, setAmount] = useState(settings?.monthlyDeposit || '1000');
  const [method, setMethod] = useState('cash');
  const [note, setNote] = useState('');
  const [isHist, setIsHist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMembers, setStatusMembers] = useState<any[]>([]);
  const [type, setType] = useState<'deposit' | 'fine'>('deposit');

  useEffect(() => {
    fetchMembers();
    fetchStatus();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from('ywf_users').select('*').eq('role', 'member').order('full_name');
    if (data) setMembers(data);
  };

  const fetchStatus = async () => {
    const mk = `${year}-${month}`;
    const [r1, r2] = await Promise.all([
      supabase.from('ywf_users').select('*').eq('role', 'member').order('full_name'),
      supabase.from('ywf_transactions').select('*').eq('month_year', mk).eq('type', 'deposit')
    ]);
    const paid = new Set((r2.data || []).map(t => t.member_id));
    setStatusMembers((r1.data || []).map(m => ({ ...m, paid: paid.has(m.id) })));
  };

  const handleDeposit = async () => {
    if (!selectedMember || !amount) return;
    setLoading(true);
    const monthYear = `${year}-${month}`;
    
    // Add transaction
    const { data: txn, error } = await supabase.from('ywf_transactions').insert({
      member_id: selectedMember,
      amount: parseFloat(amount),
      type: type,
      month_year: monthYear,
      payment_method: method,
      note,
      status: 'approved',
      is_historical: isHist
    }).select().single();

    if (!error) {
      // If fine, update oldest pending fine for this member
      if (type === 'fine') {
        const { data: pendingFines } = await supabase
          .from('ywf_fines')
          .select('id')
          .eq('member_id', selectedMember)
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
          .limit(1);
        
        if (pendingFines && pendingFines.length > 0) {
           await supabase.from('ywf_fines').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', pendingFines[0].id);
        }
      }
      
      onToast('লেনদেন সফলভাবে জমা হয়েছে', 's');
      setNote('');
      fetchStatus();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card title="টাকা জমা দিন">
          <div className="space-y-4">
             <div className="space-y-1.5 px-0.5">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">আপনি কীসের টাকা জমা দিচ্ছেন?</label>
                <div className="flex gap-2">
                   <button 
                      onClick={() => { setType('deposit'); setAmount(settings?.monthlyDeposit || '1000'); }}
                      className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider border-2 transition-all ${type === 'deposit' ? 'bg-brand-light/10 border-brand-light text-brand-light shadow-lg shadow-brand-light/10' : 'bg-white/3 border-white/5 text-text-dark hover:border-white/10'}`}
                   >
                      মাসিক চাঁদা
                   </button>
                   <button 
                      onClick={() => { setType('fine'); setAmount(''); }}
                      className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider border-2 transition-all ${type === 'fine' ? 'bg-brand-danger/10 border-brand-danger text-brand-danger shadow-lg shadow-brand-danger/10' : 'bg-white/3 border-white/5 text-text-dark hover:border-white/10'}`}
                   >
                      জরিমানা
                   </button>
                </div>
             </div>
             <Select 
               label="সদস্য *" 
               value={selectedMember} 
               onChange={(e) => setSelectedMember(e.target.value)}
               options={[{ value: '', label: 'সদস্য সিলেক্ট করুন' }, ...members.map(m => ({ value: m.id, label: `${m.full_name} (${m.account_number || '—'})` }))]} 
             />
             <div className="grid grid-cols-2 gap-4">
                <Select 
                  label="মাস *" 
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  options={MB.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))} 
                />
                <Select 
                  label="বছর *" 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))} 
                />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Input label="পরিমাণ (৳) *" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Select 
                  label="পদ্ধতি" 
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  options={[
                    { value: 'cash', label: 'নগদ' },
                    { value: 'bkash', label: 'বিকাশ' },
                    { value: 'nagad', label: 'নগদ (Nagad)' },
                    { value: 'rocket', label: 'রকেট' },
                    { value: 'admin_entry', label: 'অ্যাডমিন' }
                  ]} 
                />
             </div>
             <Input label="নোট" placeholder="মন্তব্য" value={note} onChange={(e) => setNote(e.target.value)} />
             <div className="flex items-center gap-2 px-1">
                <input 
                  type="checkbox" 
                  id="hist" 
                  checked={isHist} 
                  onChange={(e) => setIsHist(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-light focus:ring-brand-light" 
                />
                <label htmlFor="hist" className="text-[10px] font-bold text-text-muted uppercase cursor-pointer">পুরনো ডেটা এন্ট্রি</label>
             </div>
             <button 
               onClick={handleDeposit}
               disabled={loading || !selectedMember}
               className="w-full bg-brand-light hover:bg-brand-primary disabled:opacity-50 text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-brand-light/30 transition-all flex items-center justify-center gap-2"
             >
                {loading ? <div className="sp w-4 h-4 border-2" /> : <CheckCircle className="w-4 h-4" />}
                জমা নিশ্চিত করুন
             </button>
          </div>
       </Card>
       <Card title={`${MB[parseInt(month) - 1]} ${year} মাসের অবস্থা`}>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
             {statusMembers.map(m => (
                <div key={m.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-text-muted overflow-hidden shrink-0">
                      {m.photo_url ? <img src={m.photo_url} alt="" className="w-full h-full object-cover" /> : m.full_name.charAt(0)}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{m.full_name}</div>
                   </div>
                   <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${m.paid ? 'bg-green-500/15 text-green-500' : 'bg-brand-danger/15 text-brand-danger'}`}>
                      {m.paid ? '✓' : '✗'}
                   </span>
                </div>
             ))}
          </div>
       </Card>
    </div>
  );
}

function ProfileView({ user, targetUser, onUpdate, onToast }: { user: UserData, targetUser?: UserData | null, onUpdate: () => void, onToast: (m: string, t?: any) => void }) {
  const displayUser = targetUser || user;
  const isAdminEdit = targetUser !== null && targetUser !== undefined && user.role !== 'member';

  const [fullName, setFullName] = useState(displayUser.full_name || '');
  const [phone, setPhone] = useState(displayUser.phone || '');
  const [address, setAddress] = useState(displayUser.address || '');
  const [nid, setNid] = useState(displayUser.nid_number || '');
  const [dob, setDob] = useState(displayUser.dob || '');
  const [isActive, setIsActive] = useState(displayUser.is_active || false);
  const [role, setRole] = useState(displayUser.role || 'member');
  
  const [nidPhoto, setNidPhoto] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setMsg('');
    try {
      let nidPhotoUrl = displayUser.nid_photo_url;
      if (nidPhoto) {
        const fileExt = nidPhoto.name.split('.').pop();
        const fileName = `${displayUser.id}_nid_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('ywf-photos').upload(fileName, nidPhoto);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('ywf-photos').getPublicUrl(fileName);
        nidPhotoUrl = publicUrl;
      }
      
      const updatePayload: any = {
        full_name: fullName,
        phone,
        address,
        nid_number: nid,
        dob,
        nid_photo_url: nidPhotoUrl
      };

      if (isAdminEdit) {
        updatePayload.is_active = isActive;
        updatePayload.role = role;
      }

      const { error } = await supabase.from('ywf_users').update(updatePayload).eq('id', displayUser.id);
      if (error) throw error;
      onToast('প্রোফাইল আপডেট হয়েছে', 's');
      onUpdate();
    } catch (e: any) {
      onToast(`ত্রুটি: ${e.message}`, 'e');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setPassMsg('ত্রুটি: পাসওয়ার্ড ফিল্ড পূরণ করুন');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMsg('ত্রুটি: পাসওয়ার্ড দুটি মিলেনি');
      return;
    }
    if (newPassword.length < 6) {
      setPassMsg('ত্রুটি: পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }
    setPassLoading(true);
    setPassMsg('');
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      onToast('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে', 's');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e: any) {
      onToast(`ত্রুটি: ${e.message}`, 'e');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black">{targetUser ? `${targetUser.full_name}-এর প্রোফাইল` : 'আপনার প্রোফাইল'}</h2>
        {targetUser && (
           <button onClick={() => onUpdate()} className="text-[10px] font-black text-brand-light uppercase tracking-widest bg-brand-light/10 px-3 py-1.5 rounded-lg border border-brand-light/20 hover:bg-brand-light hover:text-white transition-all">← ফিরে যান</button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title={targetUser ? "সদস্য তথ্য" : "আপনার ছবি"}>
            <div className="flex flex-col items-center">
              <div className="relative group p-1 bg-gradient-to-br from-brand-light/30 to-brand-accent/30 rounded-[2.8rem]">
                <div className="w-48 h-48 rounded-[2.5rem] bg-gradient-to-br from-brand-light to-brand-accent flex items-center justify-center text-6xl font-black text-white shrink-0 overflow-hidden shadow-2xl shadow-brand-light/20 group-hover:scale-[1.02] transition-transform duration-500">
                  {displayUser.photo_url ? <img src={displayUser.photo_url} alt={displayUser.full_name} className="w-full h-full object-cover" /> : displayUser.full_name?.charAt(0)}
                  {!targetUser && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-8 text-center w-full">
                <h3 className="text-2xl font-black text-white tracking-tight">{displayUser.full_name}</h3>
                <p className="text-[10px] font-black text-brand-light uppercase tracking-[0.25em] mt-2 bg-brand-light/10 px-4 py-1 rounded-full inline-block">{displayUser.role === 'super_admin' ? 'সুপার এডমিন' : (displayUser.role === 'admin' ? 'এডমিন' : 'সদস্য')}</p>
                <div className="mt-6 flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-center px-4 py-2 bg-white/3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-text-muted uppercase">হিসাব নম্বর</span>
                    <span className="text-xs font-black text-white">{displayUser.account_number || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-white/3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-text-muted uppercase">স্ট্যাটাস</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${displayUser.is_active ? 'bg-green-500/15 text-green-500' : 'bg-brand-danger/15 text-brand-danger'}`}>
                      {displayUser.is_active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card title={targetUser ? "তথ্য আপডেট করুন" : "ব্যক্তিগত তথ্য সম্পাদনা"}>
            <div className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">পূর্ণ নাম</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">ফোন নম্বর</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
               </div>
               
               {isAdminEdit && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-white/3 border border-white/5 rounded-2xl">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">রোল সেট করুন</label>
                       <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full bg-bg-secondary border border-white/10 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white">
                          <option value="member">সদস্য</option>
                          <option value="admin">এডমিন</option>
                          <option value="super_admin">সুপার এডমিন</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">অ্যাকাউন্ট স্ট্যাটাস</label>
                       <select value={isActive ? 'true' : 'false'} onChange={(e) => setIsActive(e.target.value === 'true')} className="w-full bg-bg-secondary border border-white/10 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white">
                          <option value="true">সক্রিয়</option>
                          <option value="false">নিষ্ক্রিয়</option>
                       </select>
                    </div>
                 </div>
               )}

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">জন্ম তারিখ</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">NID নম্বর</label>
                    <input type="text" value={nid} onChange={(e) => setNid(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">ঠিকানা</label>
                  <textarea value={address || ''} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none min-h-[100px] text-white transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-wider">ছবি পরিবর্তন</label>
                  <input type="file" accept="image/*" onChange={(e) => setNidPhoto(e.target.files?.[0] || null)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-3 text-xs text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-brand-light/10 file:text-brand-light hover:file:bg-brand-light/20 transition-all" />
               </div>
               <button onClick={handleUpdate} disabled={loading} className="w-full bg-brand-light text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-light/20 hover:shadow-brand-light/40 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <div className="sp w-5 h-5 border-white/30 border-t-white" /> : (targetUser ? 'সদস্য তথ্য আপডেট করুন' : 'তথ্য আপডেট করুন')}
               </button>
            </div>
          </Card>

          {!targetUser && (
            <Card title="পাসওয়ার্ড পরিবর্তন">
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">নতুন পাসওয়ার্ড</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-white/3 border border-white/7 rounded-2xl p-4 text-sm focus:border-brand-light outline-none text-white transition-all" />
                 </div>
                 <button onClick={handlePasswordChange} disabled={passLoading} className="w-full bg-brand-light/10 text-brand-light py-4 rounded-2xl font-black text-sm border border-brand-light/20 hover:bg-brand-light hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    {passLoading ? <div className="sp w-5 h-5 border-brand-light/30 border-t-brand-light" /> : 'পাসওয়ার্ড পরিবর্তন করুন'}
                 </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Login Page ---

function AuditView({ user }: { user: UserData }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    // If the table doesn't exist, this might fail gracefully in a real scenario
    const { data } = await supabase.from('ywf_audit_log').select('*').order('created_at', { ascending: false }).limit(50);
    if (data) setLogs(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black">সিস্টেম অডিট লগ</h2>
      <div className="bg-bg-secondary border border-white/5 rounded-[2rem] overflow-hidden">
        {loading ? <div className="p-20 flex justify-center"><div className="sp" /></div> : (
          <div className="divide-y divide-white/5">
            {logs.length === 0 ? <div className="p-20 text-center opacity-20"><History className="w-16 h-16 mx-auto mb-2" /><p>কোনো লগ পাওয়া যায়নি</p></div> : logs.map(l => (
              <div key={l.id} className="p-4 flex items-start gap-4 hover:bg-white/2 transition-all">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <History className="w-4 h-4 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary font-medium">{l.action}</p>
                  <p className="text-[10px] text-text-dark mt-1">{fdt(l.created_at)} • {l.user_email || 'System'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({ user, onUpdate, onToast }: { user: UserData, onUpdate?: () => void, onToast: (m: string, t?: any) => void }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admins, setAdmins] = useState<UserData[]>([]);
  
  // Payment Config
  const [bkash, setBkash] = useState('');
  const [nagad, setNagad] = useState('');
  const [rocket, setRocket] = useState('');
  const [adminContact, setAdminContact] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // Fine Config
  const [monthlyDeposit, setMonthlyDeposit] = useState('1000');
  const [fineAfter10, setFineAfter10] = useState('20');
  const [fineAfter20, setFineAfter20] = useState('30');

  useEffect(() => {
    fetchSettings();
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const { data } = await supabase.from('ywf_users').select('*').in('role', ['admin', 'super_admin']).order('full_name');
    if (data) setAdmins(data);
  };

  const fetchSettings = async () => {
    try {
      const { data } = await supabase.from('ywf_settings').select('*');
      if (data) {
        data.forEach(s => {
          if (s.key === 'bkash') setBkash(s.value);
          if (s.key === 'nagad') setNagad(s.value);
          if (s.key === 'rocket') setRocket(s.value);
          if (s.key === 'admin_contact') setAdminContact(s.value);
          if (s.key === 'logo_url') setLogoUrl(s.value);
          if (s.key === 'monthly_deposit') setMonthlyDeposit(s.value);
          if (s.key === 'fine_after_10') setFineAfter10(s.value);
          if (s.key === 'fine_after_20') setFineAfter20(s.value);
        });
      }
    } catch (e) {
      console.log('Settings error');
    }
    setLoading(false);
  };

  const handleSavePayments = async () => {
    setSaving(true);
    const updates = [
      { key: 'bkash', value: bkash },
      { key: 'nagad', value: nagad },
      { key: 'rocket', value: rocket },
      { key: 'admin_contact', value: adminContact },
      { key: 'logo_url', value: logoUrl }
    ];
    for (const up of updates) {
      await supabase.from('ywf_settings').upsert(up, { onConflict: 'key' });
    }
    onToast('পেমেন্ট সেটিংস সেভ করা হয়েছে', 's');
    setSaving(false);
  };

  const handleSaveFines = async () => {
    setSaving(true);
    const updates = [
      { key: 'monthly_deposit', value: monthlyDeposit },
      { key: 'fine_after_10', value: fineAfter10 },
      { key: 'fine_after_20', value: fineAfter20 }
    ];
    for (const up of updates) {
      await supabase.from('ywf_settings').upsert(up, { onConflict: 'key' });
    }
    onToast('জরিমানার নিয়ম সেভ করা হয়েছে', 's');
    setSaving(false);
  };

  const deleteAdmin = async (id: string, name: string) => {
    if (id === user.id) {
       alert('আপনি নিজেকে মুছে ফেলতে পারবেন না');
       return;
    }
    if (!window.confirm(`আপনি কি নিশ্চিত যে '${name}' কে এডমিন প্যানেল থেকে মুছে ফেলতে চান? এটি তাকে সদস্য হিসেবে কনভার্ট করবে না, বরং পুরোপুরি ডিলিট করবে।`)) return;
    
    // Convert to member or delete? User image had a trash icon. 
    // Usually admin delete means role change to member or hard delete. 
    // Let's do role change to 'member' for safety unless they confirm hard delete.
    // The previous code had hard delete on ywf_users.
    const { error } = await supabase.from('ywf_users').delete().eq('id', id);
    if (!error) {
       onToast('অ্যাডমিন সফলভাবে ডিলিট করা হয়েছে', 's');
       fetchAdmins();
    } else {
       onToast('অ্যাডমিন ডিলিট করা যায়নি: ' + error.message, 'e');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="sp" /></div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Settings */}
        <Card title="পেমেন্ট নম্বর">
           <div className="space-y-4">
              <Input label="বিকাশ নম্বর" value={bkash} onChange={e => setBkash(e.target.value)} placeholder="01XXXXXXXXX" />
              <Input label="নগদ নম্বর" value={nagad} onChange={e => setNagad(e.target.value)} placeholder="01XXXXXXXXX" />
              <Input label="রকেট নম্বর" value={rocket} onChange={e => setRocket(e.target.value)} placeholder="01XXXXXXXXX" />
              <Input label="অ্যাডমিন যোগাযোগ নম্বর" value={adminContact} onChange={e => setAdminContact(e.target.value)} placeholder="01XXXXXXXXX" />
              <Input label="LOGO URL (ঐচ্ছিক)" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." />
              
              <button 
                onClick={handleSavePayments} 
                disabled={saving}
                className="w-full bg-brand-light hover:bg-brand-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-light/20 mt-2 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                 <Save className="w-4 h-4" /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
              </button>
           </div>
        </Card>

        {/* Fine Rules */}
        <Card title="জরিমানার নিয়ম">
           <div className="space-y-4">
              <Input label="মাসিক চাঁদা (৳)" type="number" value={monthlyDeposit} onChange={e => setMonthlyDeposit(e.target.value)} />
              <Input label="১০ তারিখের পর জরিমানা (৳)" type="number" value={fineAfter10} onChange={e => setFineAfter10(e.target.value)} />
              <Input label="২০ তারিখের পর জরিমানা (৳)" type="number" value={fineAfter20} onChange={e => setFineAfter20(e.target.value)} />
              
              <div className="pt-2">
                 <button 
                  onClick={handleSaveFines} 
                  disabled={saving}
                  className="w-full bg-brand-light hover:bg-brand-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-light/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                   <Save className="w-4 h-4" /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
           </div>
        </Card>
      </div>

      {/* Admin Management Section */}
      <Card title="অ্যাডমিন ম্যানেজমেন্ট">
         <div className="flex justify-end mb-4">
            <button 
               onClick={() => (window as any).setActiveTab?.('members')}
               className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center gap-2 hover:bg-green-500 hover:text-white transition-all shadow-sm"
            >
               <Users className="w-4 h-4" /> নতুন অ্যাডমিন
            </button>
         </div>
         <div className="relative overflow-hidden overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead>
                  <tr className="bg-white/3">
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-text-dark">নাম</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-text-dark">ইমেইল</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-text-dark">ভূমিকা</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-text-dark text-right">অ্যাকশন</th>
               </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {admins.map(a => (
                     <tr key={a.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-4 py-4 font-bold text-white leading-none">
                           {a.full_name}
                           <div className="text-[8px] text-text-dark mt-1 font-medium">{a.id.slice(0, 8)}</div>
                        </td>
                        <td className="px-4 py-4 text-text-muted text-xs">{a.email}</td>
                        <td className="px-4 py-4">
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${a.role === 'super_admin' ? 'bg-orange-500/15 text-orange-500 border border-orange-500/10' : 'bg-blue-500/15 text-blue-500 border border-blue-500/10'}`}>
                              {a.role === 'super_admin' ? 'সুপার অ্যাডমিন' : 'অ্যাডমিন'}
                           </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                           <button 
                             onClick={() => deleteAdmin(a.id, a.full_name)}
                             disabled={a.id === user.id}
                             className="p-2 bg-white/3 text-text-muted hover:bg-brand-danger hover:text-white rounded-lg transition-all disabled:opacity-20"
                           >
                              <Trash2 className="w-3.5 h-3.5" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
      
      <div className="bg-white/3 border border-white/7 rounded-2xl p-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/5 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-light/10 transition-all" />
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-brand-light" /> সিস্টেম স্ট্যাটাস 
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Supabase Connected</span>
            </div>
         </div>
         <p className="text-[10px] text-text-muted leading-relaxed font-medium">Youngster Welfare Foundation Fund Management System v2.5.0-pro. All transactions and user records are securely synchronized with Supabase PostgreSQL database in the Asian-East region.</p>
         <div className="mt-4 flex gap-4 pt-4 border-t border-white/5">
            <div>
               <div className="text-[8px] font-black text-text-dark uppercase mb-1">ভার্সন</div>
               <div className="text-[10px] font-bold text-white">2.5.0-pro</div>
            </div>
            <div>
               <div className="text-[8px] font-black text-text-dark uppercase mb-1">এনভায়রনমেন্ট</div>
               <div className="text-[10px] font-bold text-white">Production</div>
            </div>
         </div>
      </div>
    </div>
  );
}

function InvestmentsView({ user, onToast }: { user: UserData, onToast: (m: string, t?: any) => void }) {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ywf_investments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setInvestments(data);
    if (error) onToast('ডাটা লোড করা যায়নি: ' + error.message, 'e');
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!name || !amount || !date) {
      onToast('অনুগ্রহ করে সব তথ্য দিন', 'e');
      return;
    }

    setUploading(true);
    try {
      let imageUrl = editingItem?.image_url || null;

      if (image) {
        const fileName = `${Date.now()}_${image.name}`;
        const { error: uploadError } = await supabase.storage.from('ywf-photos').upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('ywf-photos').getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      const payload = {
        name,
        amount: parseFloat(amount),
        date,
        description,
        image_url: imageUrl,
        status: 'active',
        added_by: user.id
      };

      let error;
      if (editingItem) {
        const { error: err } = await supabase.from('ywf_investments').update(payload).eq('id', editingItem.id);
        error = err;
      } else {
        const { error: err } = await supabase.from('ywf_investments').insert(payload);
        error = err;
      }

      if (error) throw error;

      onToast(editingItem ? 'বিনিয়োগ আপডেট করা হয়েছে' : 'নতুন বিনিয়োগ যোগ করা হয়েছে', 's');
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (err: any) {
      onToast('ত্রুটি: ' + err.message, 'e');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setImage(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই বিনিয়োগটি মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('ywf_investments').delete().eq('id', id);
    if (!error) {
      onToast('বিনিয়োগ মুছে ফেলা হয়েছে', 's');
      fetchData();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setAmount(item.amount.toString());
    setDate(item.date);
    setDescription(item.description || '');
    setImage(null);
    setIsModalOpen(true);
  };

  const totalInv = investments.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">বিনিয়োগ</h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">ফাউন্ডেশনের সকল বিনিয়োগ রেকর্ড</p>
        </div>
        {user.role !== 'member' && (
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-brand-success text-white px-6 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> নতুন বিনিয়োগ
          </button>
        )}
      </div>

      <div className="bg-white/3 border border-white/7 rounded-3xl p-6 flex flex-col justify-center w-fit min-w-[200px]">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">মোট বিনিয়োগ</div>
        <div className="text-3xl font-black text-brand-light">৳{fmt(totalInv)}</div>
      </div>

      <div className="bg-white/3 border border-white/7 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">বিনিয়োগের নাম</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">পরিমাণ</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">তারিখ</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">অবস্থা</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">যোগ করেছেন</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="py-20 text-center"><div className="sp mx-auto" /></td></tr>
              ) : investments.length === 0 ? (
                <tr><td colSpan={6} className="py-20 text-center text-text-muted opacity-30 font-bold uppercase tracking-widest text-xs">কোনো বিনিয়োগ নেই</td></tr>
              ) : investments.map(i => (
                <tr key={i.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        {i.image_url ? (
                          <img src={i.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-text-dark" />
                        )}
                      </div>
                      <div className="font-bold text-sm text-white">{i.name || i.note || 'Unnamed'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-black text-brand-light">৳{fmt(i.amount)}</td>
                  <td className="px-6 py-5 text-xs text-text-muted">{fd(i.date)}</td>
                  <td className="px-6 py-5 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${i.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-text-muted'}`}>
                      {i.status === 'active' ? 'সক্রিয়' : 'বন্ধ'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-text-muted font-bold font-bangla">{i.added_by ? 'অ্যাডমিন' : 'সিস্টেম'}</td>
                  <td className="px-6 py-5 text-right">
                    {user.role !== 'member' && (
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(i)} className="p-2 border border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(i.id)} className="p-2 border border-brand-danger/20 text-brand-danger hover:bg-brand-danger hover:text-white rounded-lg transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { if(!uploading) setIsModalOpen(false); }} title={editingItem ? "বিনিয়োগ এডিট করুন" : "বিনিয়োগ যোগ করুন"}>
        <div className="space-y-4">
          <Input label="বিনিয়োগের নাম *" value={name} onChange={e => setName(e.target.value)} placeholder="বিনিয়োগ প্রকল্পের নাম" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="পরিমাণ (৳) *" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
            <Input label="তারিখ *" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">বিবরণ</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light min-h-[100px]"
              placeholder="বিস্তারিত বিবরণ..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">ছবি (ঐচ্ছিক)</label>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm text-text-muted flex items-center justify-between">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden" 
                id="inv-img"
              />
              <label htmlFor="inv-img" className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <Camera className="w-4 h-4" />
                <span>{image ? image.name : (editingItem?.image_url ? 'ছবি পরিবর্তন করুন' : 'ছবি আপলোড করুন')}</span>
              </label>
              {image && (
                <button onClick={() => setImage(null)} className="text-brand-danger hover:scale-110 transition-transform">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <button 
            disabled={uploading}
            onClick={handleSubmit} 
            className="w-full bg-brand-success text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-500/20 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {uploading ? 'প্রসেস হচ্ছে...' : editingItem ? 'আপডেট করুন' : 'বিনিয়োগ যোগ করুন'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

function ProfitsView({ user, title, onToast }: { user: UserData, title?: string, onToast: (m: string, t?: any) => void }) {
  const [profits, setProfits] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [investmentId, setInvestmentId] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [r1, r2] = await Promise.all([
      supabase.from('ywf_profits').select('*').order('created_at', { ascending: false }),
      supabase.from('ywf_investments').select('id, name, note').eq('status', 'active')
    ]);
    
    if (r1.data) setProfits(r1.data);
    if (r2.data) setInvestments(r2.data.map(i => ({ ...i, name: i.name || i.note || 'Unnamed' })));
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!amount) {
      onToast('পরিমাণ প্রদান করুন', 'e');
      return;
    }

    setIsSubmitting(true);
    try {
      const mk = `${year}-${month}`;
      const payload = {
        investment_id: investmentId === 'direct' || investmentId === '' ? null : investmentId,
        month_year: mk,
        amount: parseFloat(amount),
        note,
        date,
        added_by: user.id
      };

      const { error } = await supabase.from('ywf_profits').insert(payload);
      if (error) throw error;

      onToast('লাভের রেকর্ড যোগ করা হয়েছে', 's');
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (err: any) {
      onToast('ত্রুটি: ' + err.message, 'e');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setInvestmentId('');
    setAmount('');
    setNote('');
    setDate(new Date().toISOString().split('T')[0]);
    setMonth(String(new Date().getMonth() + 1).padStart(2, '0'));
    setYear(String(new Date().getFullYear()));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('ywf_profits').delete().eq('id', id);
    if (!error) {
      onToast('রেকর্ড মুছে ফেলা হয়েছে', 's');
      fetchData();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  const totalProfit = profits.reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{title || 'লাভ / লভ্যাংশ'}</h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">বিনিয়োগ থেকে অর্জিত আয়ের রেকর্ড</p>
        </div>
        {user.role !== 'member' && (
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-brand-success text-white px-6 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> লাভ যোগ করুন
          </button>
        )}
      </div>

      <div className="bg-white/3 border border-white/7 rounded-3xl p-6 flex flex-col justify-center w-fit min-w-[200px]">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">মোট লাভ</div>
        <div className="text-3xl font-black text-brand-success">৳{fmt(totalProfit)}</div>
      </div>

      <div className="bg-white/3 border border-white/7 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest font-bangla">মাস</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">বিনিয়োগের নাম</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">লাভ</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">নোট</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">তারিখ</th>
                <th className="px-6 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="py-20 text-center"><div className="sp mx-auto" /></td></tr>
              ) : profits.length === 0 ? (
                <tr><td colSpan={6} className="py-20 text-center text-text-muted opacity-30 font-bold uppercase tracking-widest text-xs">কোনো লাভের রেকর্ড নেই</td></tr>
              ) : profits.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5 font-bold font-bangla">
                    {p.month_year ? (MB[parseInt(p.month_year.split('-')[1]) - 1] + ' ' + p.month_year.split('-')[0]) : '—'}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${p.investment_id ? 'bg-blue-500' : 'bg-green-500'}`} />
                       <span className="text-sm font-medium">
                         {p.investment_id ? (investments.find(i => i.id === p.investment_id)?.name || 'বিনিয়োগ') : 'সরাসরি লাভ'}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-black text-brand-success">৳{fmt(p.amount)}</td>
                  <td className="px-6 py-5 text-[11px] text-text-muted max-w-[200px] truncate">{p.note || '—'}</td>
                  <td className="px-6 py-5 text-xs text-text-muted">{fd(p.date)}</td>
                  <td className="px-6 py-5 text-right">
                    {user.role !== 'member' && (
                      <button onClick={() => handleDelete(p.id)} className="p-2 border border-brand-danger/20 text-brand-danger hover:bg-brand-danger hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { if(!isSubmitting) setIsModalOpen(false); }} title="লাভ যোগ করুন">
        <div className="space-y-4">
          <Select 
            label="বিনিয়োগ (ঐচ্ছিক)" 
            value={investmentId} 
            onChange={e => setInvestmentId(e.target.value)}
            options={[
              { value: '', label: '-- বিনিয়োগ সিলেক্ট করুন --' },
              { value: 'direct', label: 'সরাসরি লাভ' },
              ...investments.map(i => ({ value: i.id, label: i.name }))
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="মাস" 
              value={month} 
              onChange={e => setMonth(e.target.value)}
              options={MB.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))}
            />
            <Select 
              label="বছর" 
              value={year} 
              onChange={e => setYear(e.target.value)}
              options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="লাভের পরিমাণ (৳) *" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
            <Input label="তারিখ *" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">নোট</label>
            <textarea 
              value={note} 
              onChange={e => setNote(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light min-h-[100px]"
              placeholder="অতিরিক্ত নোট..."
            />
          </div>
          <button 
            disabled={isSubmitting}
            onClick={handleSubmit} 
            className="w-full bg-brand-success text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-500/20 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isSubmitting ? 'প্রসেস হচ্ছে...' : 'লাভে যোগ করুন'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

function FinanceView({ user, type, title, onToast }: { user: UserData, type: 'expense', title?: string, onToast: (m: string, t?: any) => void }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('ywf_expenses').select('*').order('created_at', { ascending: false });
    if (data) setData(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!amount || !note) {
      onToast('অনুগ্রহ করে পরিমাণ এবং বিবরণ দিন', 'e');
      return;
    }
    setLoading(true);

    try {
      if (editingItem) {
        const { error } = await supabase.from('ywf_expenses').update({
          amount: parseFloat(amount),
          note,
          date,
        }).eq('id', editingItem.id);
        
        if (error) throw error;
        
        onToast('খরচ সফলভাবে আপডেট করা হয়েছে', 's');
        setIsModalOpen(false);
        setEditingItem(null);
        setAmount('');
        setNote('');
        fetchData();
      } else {
        const { error } = await supabase.from('ywf_expenses').insert({
          amount: parseFloat(amount),
          note,
          date
        });

        if (error) throw error;

        onToast('খরচ সফলভাবে যোগ করা হয়েছে', 's');
        setIsModalOpen(false);
        setAmount('');
        setNote('');
        fetchData();
      }
    } catch (err: any) {
      onToast('ত্রুটি: ' + err.message, 'e');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('ywf_expenses').delete().eq('id', id);
    if (!error) {
       onToast('সফলভাবে মুছে ফেলা হয়েছে', 's');
       fetchData();
    } else {
       onToast('মুছে ফেলা যায়নি: ' + error.message, 'e');
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setAmount(item.amount.toString());
    setNote(item.note);
    setDate(item.date || item.created_at.split('T')[0]);
    setIsModalOpen(true);
  };

  const gT = () => {
     if (title) return title;
     return 'খরচের রেকর্ড';
  };

  if (loading && data.length === 0) return <div className="flex justify-center py-20"><div className="sp" /></div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">{gT()}</h2>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">মোট: ৳{fmt(data.reduce((s, x) => s + x.amount, 0))}</p>
          </div>
          {user.role !== 'member' && (
            <button onClick={() => { setEditingItem(null); setAmount(''); setNote(''); setIsModalOpen(true); }} className="bg-brand-success text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
               <Plus className="w-4 h-4" /> নতুন এন্ট্রি
            </button>
          )}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(x => (
             <div key={x.id}>
               <Card className="hover:bg-white/5 transition-all group h-full">
                <div className="flex justify-between items-start mb-3">
                   <div className="text-lg font-black text-white">৳{fmt(x.amount)}</div>
                   <div className="text-[10px] text-text-muted font-bold uppercase">{fd(x.date || x.created_at)}</div>
                </div>
                <p className="text-xs text-text-primary leading-relaxed">{x.note}</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                    {user.role !== 'member' && (
                      <div className="flex gap-2">
                         <button onClick={() => openEdit(x)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm" title="সম্পাদনা">
                            <Edit2 className="w-3.5 h-3.5" />
                         </button>
                         <button onClick={() => handleDelete(x.id)} className="p-2 bg-brand-danger/10 text-brand-danger rounded-lg hover:bg-brand-danger hover:text-white transition-all shadow-sm" title="মুছে ফেলুন">
                            <Trash2 className="w-3.5 h-3.5" />
                         </button>
                      </div>
                    )}
                </div>
             </Card>
           </div>
          ))}
          {data.length === 0 && <div className="col-span-full py-20 text-center opacity-20"><TrendingUp className="w-16 h-16 mx-auto mb-2" /><p>কোনো রেকর্ড নেই</p></div>}
       </div>

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${editingItem ? 'এডিট করুন' : gT() + ' যোগ করুন'}`}>
          <div className="space-y-4">
             <Input label="পরিমাণ (৳) *" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
             <Input label="তারিখ *" type="date" value={date} onChange={e => setDate(e.target.value)} />
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">বিবরণ *</label>
                <textarea value={note || ''} onChange={e => setNote(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white outline-none focus:border-brand-light min-h-24" />
             </div>
             <button onClick={handleAdd} className="w-full bg-brand-success text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-500/20">
               {editingItem ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
             </button>
          </div>
       </Modal>
    </div>
  );
}

function PaymentRequestsView({ user, onToast }: { user: UserData, onToast: (m: string, t?: any) => void }) {
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [historyReqs, setHistoryReqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: allReqs, error } = await supabase
        .from('ywf_payment_requests')
        .select('*, member:ywf_users!member_id(full_name, account_number)')
        .order('created_at', { ascending: false });
      
      if (error) {
        onToast('ডাটা লোড করতে সমস্যা: ' + error.message, 'e');
      } else if (allReqs) {
        setPendingReqs(allReqs.filter(r => r.status === 'pending'));
        setHistoryReqs(allReqs.filter(r => r.status !== 'pending').slice(0, 50));
      }
    } catch (err: any) {
      onToast('সার্ভার ত্রুটি: ' + err.message, 'e');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject', req: any) => {
    if (action === 'approve') {
       const { error: tErr } = await supabase.from('ywf_transactions').insert({
          member_id: req.member_id,
          amount: req.amount,
          type: req.type,
          month_year: req.month_year,
          payment_method: req.payment_method,
          note: `TrxID: ${parseTrx(req.note)}`,
          status: 'approved'
       });
       if (tErr) {
         onToast('লেনদেন তৈরি করা যায়নি', 'e');
         return;
       }

       if (req.type === 'fine') {
          const { data: pendingFines } = await supabase
            .from('ywf_fines')
            .select('id')
            .eq('member_id', req.member_id)
            .eq('status', 'pending')
            .order('created_at', { ascending: true })
            .limit(1);
          
          if (pendingFines && pendingFines.length > 0) {
             await supabase.from('ywf_fines').update({ status: 'paid' }).eq('id', pendingFines[0].id);
          }
       }
    }

    const { error } = await supabase
      .from('ywf_payment_requests')
      .update({ 
        status: action === 'approve' ? 'approved' : 'rejected', 
        processed_by: user.id, 
        processed_at: new Date().toISOString() 
      })
      .eq('id', id);
    
    if (!error) {
      onToast(action === 'approve' ? 'অনুমোদিত হয়েছে' : 'প্রত্যাখ্যাত হয়েছে', 's');
      fetchData();
    } else {
      onToast('ত্রুটি: ' + error.message, 'e');
    }
  };

  const handleDeleteHistory = async (id: string) => {
    if (!window.confirm('আপনি কি এই রিকোয়েস্ট হিস্টোরি মুছে ফেলতে চান? এটি শুধুমাত্র রেকর্ড মুছবে, লেনদেন নয়।')) return;
    const { error } = await supabase.from('ywf_payment_requests').delete().eq('id', id);
    if (!error) {
       onToast('মুছে ফেলা হয়েছে', 's');
       fetchData();
    } else onToast('ত্রুটি: ' + error.message, 'e');
  };

  const parseTrx = (note: string) => {
    if (!note) return '—';
    return note.replace('TrxID:', '').trim();
  };

  const filteredHistory = historyReqs.filter(r => {
    const s = search.toLowerCase();
    const name = (r.member?.full_name || '').toLowerCase();
    const ac = (r.member?.account_number || '').toLowerCase();
    const trx = parseTrx(r.note).toLowerCase();
    return name.includes(s) || ac.includes(s) || trx.includes(s);
  });

  if (loading && pendingReqs.length === 0 && historyReqs.length === 0) 
    return <div className="flex justify-center py-20"><div className="sp" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
             onClick={() => (window as any).setActiveTab?.('dashboard')}
             className="p-3 bg-white/3 border border-white/7 rounded-2xl hover:bg-white/10 transition-all text-white group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white font-bangla">পেমেন্ট রিকোয়েস্ট</h2>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Youngster Welfare Foundation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-light/10 border border-brand-light/20 rounded-full font-bangla">
           <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
           <span className="text-[10px] font-black text-brand-light uppercase tracking-widest">{pendingReqs.length} টি পেন্ডিং</span>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div className="bg-white/3 border border-white/7 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20">
         <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h3 className="text-base font-black text-white flex items-center gap-3 font-bangla">
               অপেক্ষমান রিকোয়েস্ট
               {pendingReqs.length > 0 && (
                 <span className="bg-brand-danger text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-bounce">{pendingReqs.length}টি</span>
               )}
            </h3>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">সদস্য</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">মাস</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-right font-bangla">পরিমাণ</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-center font-bangla">পদ্ধতি</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-center">TRANSACTION ID</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">তারিখ</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-right font-bangla">অ্যাকশন</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {pendingReqs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center">
                        <div className="flex flex-col items-center opacity-20">
                          <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
                          <p className="text-[11px] font-black uppercase tracking-[0.3em]">সব ক্লিয়ার!</p>
                        </div>
                      </td>
                    </tr>
                  ) : pendingReqs.map(r => (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-5">
                          <div className="text-sm font-black text-white font-bangla">{r.member?.full_name || 'অজানা সদস্য'}</div>
                          <div className="text-[10px] text-text-muted mt-0.5">{r.member?.account_number || 'ID: ' + r.member_id}</div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="text-xs font-bold text-white uppercase font-bangla">
                            {r.month_year ? (MB[parseInt(r.month_year.split('-')[1]) - 1] + ' ' + r.month_year.split('-')[0]) : '—'}
                          </div>
                          <div className={`text-[9px] font-black uppercase tracking-tighter mt-1 ${r.type === 'deposit' ? 'text-brand-light' : 'text-brand-danger'}`}>
                            {r.type === 'deposit' ? 'মাসিক চাঁদা' : 'জরিমানা'}
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="text-sm font-black text-brand-light font-bangla">৳{fmt(r.amount)}</div>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <span className="text-[10px] px-3 py-1 rounded-full bg-brand-light/10 border border-brand-light/20 font-black text-brand-light uppercase font-bangla">{r.payment_method}</span>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <div className="text-[11px] font-mono text-text-muted bg-white/5 px-3 py-1 rounded-lg border border-white/5">{parseTrx(r.note)}</div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="text-[11px] text-text-muted font-bangla">{new Date(r.created_at).toLocaleDateString('bn-BD', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-3">
                             <button 
                                onClick={() => handleAction(r.id, 'approve', r)}
                                className="p-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 active:scale-95"
                                title="অনুমোদন"
                             >
                                <Check className="w-5 h-5 sm:w-4 sm:h-4" />
                             </button>
                             <button 
                                onClick={() => handleAction(r.id, 'reject', r)}
                                className="p-3 bg-brand-danger text-white rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-brand-danger/20 active:scale-95"
                                title="বাতিল"
                             >
                                <X className="w-5 h-5 sm:w-4 sm:h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Processed Requests History Section */}
      <div className="bg-white/3 border border-white/7 rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/10">
         <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
            <h3 className="text-base font-black text-white flex items-center gap-3 font-bangla">
               প্রক্রিয়াকৃত রিকোয়েস্ট
            </h3>
            <div className="relative w-full sm:w-72">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
               <input 
                 type="text" 
                 placeholder="সদস্য বা TrxID খুঁজুন..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs font-bangla focus:outline-none focus:border-brand-light transition-all"
               />
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">সদস্য</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">মাস</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-right font-bangla">পরিমাণ</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-center font-bangla">অবস্থা</th>
                     <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest font-bangla">তারিখ</th>
                     {user.role === 'super_admin' && <th className="px-8 py-5 text-[11px] font-bold text-text-muted uppercase tracking-widest text-right">অ্যাকশন</th>}
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-text-muted italic text-[11px] opacity-30 font-bangla">কোনো ইতিহাস পাওয়া যায়নি</td>
                    </tr>
                  ) : filteredHistory.map(r => (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-5">
                          <div className="text-sm font-black text-white font-bangla">{r.member?.full_name || 'অজানা সদস্য'}</div>
                          <div className="text-[10px] text-text-muted font-mono">{r.member?.account_number || parseTrx(r.note)}</div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="text-[11px] text-white font-bangla">
                            {r.month_year ? (MB[parseInt(r.month_year.split('-')[1]) - 1] + ' ' + r.month_year.split('-')[0]) : '—'}
                          </div>
                          <div className="text-[9px] font-black text-text-muted uppercase tracking-tighter mt-1">{r.type === 'deposit' ? 'চাঁদা' : 'জরিমানা'}</div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="text-sm font-black text-white font-bangla">৳{fmt(r.amount)}</div>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <span className={`text-[10px] px-3 py-1 rounded-full font-black font-bangla ${r.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-brand-danger/10 text-brand-danger border border-brand-danger/20'}`}>
                            {r.status === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="text-[11px] text-text-muted font-bangla">{new Date(r.processed_at || r.created_at).toLocaleDateString('bn-BD', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                       </td>
                       {user.role === 'super_admin' && (
                         <td className="px-8 py-5 text-right">
                            <button 
                               onClick={() => handleDeleteHistory(r.id)}
                               className="p-2 text-brand-danger/20 hover:text-brand-danger hover:bg-brand-danger/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </td>
                       )}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}


function PayNowView({ user, settings, onToast }: { user: UserData, settings: any, onToast: (m: string, t?: any) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<'deposit' | 'fine'>('deposit');
  const [amount, setAmount] = useState(settings?.monthlyDeposit || '1000');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [method, setMethod] = useState('bkash');
  const [trnId, setTrnId] = useState('');

  useEffect(() => {
    // Check for pre-filled params
    if ((window as any).paymentParams) {
      const params = (window as any).paymentParams;
      if (params.type) setType(params.type);
      if (params.amount) setAmount(params.amount.toString());
      delete (window as any).paymentParams;
    }
  }, []);

  const submitRequest = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('সঠিক পরিমাণ দিন');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('ywf_payment_requests').insert({
      member_id: user.id,
      amount: parseFloat(amount),
      type: type,
      month_year: `${year}-${month}`,
      payment_method: method,
      note: trnId ? `TrxID: ${trnId}` : '',
      status: 'pending'
    });
    if (!error) {
       onToast('অনুরোধ পাঠানো হয়েছে! অ্যাডমিন যাচাই করার পর আপনার বকেয়া আপডেট হবে।', 's');
       setTrnId('');
       if (type === 'deposit') setAmount(settings?.monthlyDeposit || '1000');
       else setAmount('');
    } else {
       onToast('ত্রুটি: ' + error.message, 'e');
    }
    setSubmitting(false);
  };

  const getMethodNumber = () => {
     if (method === 'bkash') return settings?.bkash || '—';
     if (method === 'nagad') return settings?.nagad || '—';
     if (method === 'rocket') return settings?.rocket || '—';
     return '—';
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
       <Card title="টাকা পরিশোধ করুন">
          <div className="space-y-4">
             {/* Payment Number Display */}
             <div className="p-4 bg-brand-light/10 border border-brand-light/20 rounded-2xl flex flex-col items-center text-center">
                <p className="text-[10px] font-black text-brand-light uppercase tracking-[0.2em] mb-1">{method} নম্বর</p>
                <h3 className="text-2xl font-black text-white tracking-widest">{getMethodNumber()}</h3>
                <p className="text-[10px] text-text-dark font-medium mt-2">উপরের নম্বরে টাকা পাঠানোর পর নিচের ফর্মটি পূরণ করুন</p>
             </div>

             <div className="space-y-1.5 px-1">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">আপনি কীসের টাকা জমা দিচ্ছেন?</label>
                <div className="grid grid-cols-2 gap-3">
                   <button 
                     onClick={() => { setType('deposit'); setAmount(settings?.monthlyDeposit || '1000'); }} 
                     className={`relative py-4 rounded-2xl text-sm font-black border-2 transition-all flex flex-col items-center gap-1 ${type === 'deposit' ? 'bg-brand-light/10 border-brand-light text-brand-light ring-4 ring-brand-light/10' : 'bg-white/3 border-white/5 text-text-dark hover:border-white/10'}`}
                   >
                     <span>মাসিক চাঁদা</span>
                     <span className="text-[9px] opacity-60">৳{settings?.monthlyDeposit || '১০০০'}</span>
                     {type === 'deposit' && <CheckCircle className="w-4 h-4 absolute -top-2 -right-2 bg-brand-light text-white rounded-full p-0.5" />}
                   </button>
                   <button 
                     onClick={() => { setType('fine'); setAmount(''); }} 
                     className={`relative py-4 rounded-2xl text-sm font-black border-2 transition-all flex flex-col items-center gap-1 ${type === 'fine' ? 'bg-brand-danger/10 border-brand-danger text-brand-danger ring-4 ring-brand-danger/10' : 'bg-white/3 border-white/5 text-text-dark hover:border-white/10'}`}
                   >
                     <span>জরিমানা</span>
                     <span className="text-[9px] opacity-60">বকেয়া জরিমানা</span>
                     {type === 'fine' && <CheckCircle className="w-4 h-4 absolute -top-2 -right-2 bg-brand-danger text-white rounded-full p-0.5" />}
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <Select label="মাস" value={month} onChange={e => setMonth(e.target.value)} options={MB.map((m, i) => ({ value: String(i+1).padStart(2, '0'), label: m }))} />
                <Select label="বছর" value={year} onChange={e => setYear(e.target.value)} options={Array.from({length: 2100 - 2023 + 1}, (_, i) => (2023 + i).toString()).map(y => ({ value: y, label: y }))} />
             </div>
             <Input label={`পরিমাণ (৳) ${type === 'fine' ? '*' : ''}`} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={type === 'fine' ? 'জরিমানার পরিমাণ লিখুন' : (settings?.monthlyDeposit || '১০০০')} />
             <Select label="পেমেন্ট মেথড" value={method} onChange={e => setMethod(e.target.value)} options={[{ value: 'bkash', label: 'বিকাশ' }, { value: 'nagad', label: 'নগদ' }, { value: 'rocket', label: 'রকেট' }]} />
             <Input label="Transaction ID / রেফারেন্স" placeholder="পেমেন্টের পর প্রাপ্ত ID দিন" value={trnId} onChange={e => setTrnId(e.target.value)} />
             
             <button 
               onClick={submitRequest}
               disabled={submitting}
               className={`w-full text-white py-4 rounded-2xl font-black text-sm shadow-xl transition-all ${type === 'fine' ? 'bg-brand-danger shadow-brand-danger/20' : 'bg-brand-light shadow-brand-light/20'}`}
             >
                {submitting ? 'পাঠানো হচ্ছে...' : 'পেমেন্ট রিকোয়েস্ট পাঠান'}
             </button>

             <div className="mt-4 text-center">
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">জরুরী প্রয়োজনে যোগাযোগ করুন</p>
                <p className="text-sm font-black text-white mt-1">{settings?.adminContact || '—'}</p>
             </div>
          </div>
       </Card>
    </div>
  );
}

function StatementView({ user, userId, onToast }: { user: UserData, userId?: string, onToast: (m: string, t?: any) => void }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    let q = supabase.from('ywf_transactions').select('*, member:ywf_users!member_id(full_name)').eq('status', 'approved').order('created_at', { ascending: false });
    if (userId) q = q.eq('member_id', userId);
    const { data: txns } = await q;
    if (txns) setData(txns);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই লেনদেনটি মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('ywf_transactions').delete().eq('id', id);
    if (!error) {
       onToast('সফলভাবে মুছে ফেলা হয়েছে', 's');
       fetchData();
    } else {
       onToast('ডিলিট করা যায়নি: ' + error.message, 'e');
    }
  };

  const handleEdit = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    const { error } = await supabase.from('ywf_transactions').update({
      amount: parseFloat(amount)
    }).eq('id', editingItem.id);

    if (!error) {
      setIsModalOpen(false);
      setEditingItem(null);
      fetchData();
    } else {
      alert('আপডেট করা যায়নি: ' + error.message);
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setAmount(item.amount.toString());
    setIsModalOpen(true);
  };

  if (loading && data.length === 0) return <div className="flex justify-center py-20"><div className="sp" /></div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">{userId ? 'আমার স্টেটমেন্ট' : 'লেনদেন রিপোর্ট'}</h2>
          <div className="text-[10px] font-bold text-text-muted uppercase px-3 py-1 bg-white/5 rounded-full border border-white/5">
              মোট এন্ট্রি: {data.length}
          </div>
       </div>

       <div className="bg-bg-secondary border border-white/5 rounded-[2rem] overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
             <thead>
                <tr className="bg-white/3 border-b border-white/5">
                   <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark">তারিখ</th>
                   {!userId && <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark">সদস্য</th>}
                   <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark">বিবরণ</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark">মেথড</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark text-right">পরিমাণ</th>
                   {user.role !== 'member' && <th className="px-6 py-4 text-[10px] font-black uppercase text-text-dark text-center">অ্যাকশন</th>}
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {data.map(t => (
                   <tr key={t.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-muted">{fd(t.created_at)}</td>
                      {!userId && <td className="px-6 py-4 font-bold text-white">{t.member?.full_name}</td>}
                      <td className="px-6 py-4">
                         <div className="font-bold text-white">{t.month_year ? (MB[parseInt(t.month_year.split('-')[1]) - 1] + ' ' + t.month_year.split('-')[0]) : fd(t.created_at)}</div>
                         <div className="text-[10px] text-text-dark uppercase">{t.type === 'deposit' ? 'চাঁদা' : t.type === 'fine' ? 'জরিমানা' : 'অন্যান্য'}</div>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold uppercase text-text-dark">{t.payment_method}</td>
                      <td className="px-6 py-4 text-right font-black text-white">৳{fmt(t.amount)}</td>
                      {user.role !== 'member' && (
                        <td className="px-6 py-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openEdit(t)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all" title="সম্পাদনা"><Edit2 className="w-3.5 h-3.5" /></button>
                              {user.role === 'super_admin' && <button onClick={() => handleDelete(t.id)} className="p-2 bg-brand-danger/10 text-brand-danger rounded-lg hover:bg-brand-danger hover:text-white transition-all" title="ডিলিট"><Trash2 className="w-3.5 h-3.5" /></button>}
                           </div>
                        </td>
                      )}
                   </tr>
                ))}
             </tbody>
          </table>
          {data.length === 0 && (
             <div className="py-20 text-center opacity-20">
                <FileText className="w-16 h-16 mx-auto mb-2" />
                <p>কোনো লেনদেন পাওয়া যায়নি</p>
             </div>
          )}
       </div>

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="লেনদেন এডিট করুন">
          <div className="space-y-4">
             <Input label="পরিমাণ (৳) *" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
             <div className="p-4 bg-white/5 rounded-2xl">
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest mb-1">সদস্য</p>
                <p className="text-sm font-bold text-white">{editingItem?.member?.full_name}</p>
                 <p className="text-[10px] font-medium text-brand-light mt-2">{editingItem?.month_year ? (MB[parseInt(editingItem.month_year.split('-')[1]) - 1] + ' ' + editingItem.month_year.split('-')[0]) : fd(editingItem?.created_at)}</p>
             </div>
             <button onClick={handleEdit} className="w-full bg-brand-light text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-light/20">আপডেট করুন</button>
          </div>
       </Modal>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [role, setRole] = useState<Role>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড দিন');
      return;
    }
    setLoading(true);
    setError('');

    let finalEmail = email;
    if (/^[0-9+\s]+$/.test(email)) {
      finalEmail = email.replace(/\s/g, '') + '@ywf.com';
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: finalEmail,
      password,
    });

    if (signInError) {
      setError('ইমেইল বা পাসওয়ার্ড ভুল');
      setLoading(false);
      return;
    }

    // After login, we don't strictly enforce role tab here anymore to prevent JAR
    // The App component will fetch user data and show the appropriate UI.
    // If the account doesn't exist in ywf_users, App will handle it.
    onLogin();
  };

  return (
    <div className="min-h-screen bg-bg-main flex relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(15,76,42,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(245,166,35,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,122,69,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(26,122,69,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="hidden lg:flex flex-1 flex-col justify-center p-20 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shrink-0 overflow-hidden">
             <img 
               src="https://enifukjimtnvkwzmervg.supabase.co/storage/v1/object/public/ywf-photos/e7e3698d-46b8-427f-a88c-5fc7c3e94293/logo.jpeg" 
               alt="YWF" 
               className="w-full h-full object-contain" 
             />
          </div>
          <div>
            <h1 className="text-xl font-black leading-tight text-white">Youngster Welfare<br />Foundation</h1>
            <span className="text-xs text-text-muted">Fund Management System</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-black leading-[1.1] mb-6 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">
          স্বচ্ছ ও<br />নিরাপদ<br />ফান্ড ম্যানেজমেন্ট
        </h2>
        <p className="text-text-muted text-sm leading-relaxed max-w-sm mb-12">
          আপনার সঞ্চয় সুরক্ষিত রাখুন। প্রতিটি লেনদেন ট্র্যাক করুন এবং ভবিষ্যতের জন্য বিনিয়োগ নিশ্চিত করুন।
        </p>

        <div className="flex gap-10">
          <div>
            <div className="text-3xl font-black text-brand-accent">৩০+</div>
            <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">সদস্য</div>
          </div>
          <div>
            <div className="text-3xl font-black text-brand-accent">১০০%</div>
            <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">স্বচ্ছতা</div>
          </div>
          <div>
            <div className="text-3xl font-black text-brand-accent">২৪/৭</div>
            <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1">অ্যাক্সেস</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[480px] flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 w-full shadow-2xl"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-black mb-1">স্বাগতম! 👋</h3>
            <p className="text-text-muted text-xs">আপনার অ্যাকাউন্টে লগইন করুন</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl gap-1 mb-8">
            <button 
              onClick={() => setRole('member')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'member' ? 'bg-brand-light text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
            >
              সদস্য
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-brand-light text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
            >
              অ্যাডমিন
            </button>
            <button 
              onClick={() => setRole('super_admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'super_admin' ? 'bg-brand-light text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
            >
              সুপার
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-brand-danger/10 border border-brand-danger/30 text-brand-danger px-4 py-2 text-xs rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">ইমেইল / ফোন নম্বর</label>
              <div className="relative">
                <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-brand-light focus:bg-brand-light/5 transition-all"
                  placeholder="ইমেইল অথবা ফোন নম্বর"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">পাসওয়ার্ড</label>
              <div className="relative">
                <LogOut className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark rotate-90" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-brand-light focus:bg-brand-light/5 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-brand-light hover:bg-brand-primary disabled:opacity-50 text-white font-black text-sm py-4 rounded-2xl shadow-xl shadow-brand-light/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <div className="sp w-4 h-4 border-2" /> : <LogOut className="w-4 h-4" />}
              লগইন করুন
            </button>
          </form>

          <button className="w-full text-center mt-6 text-text-dark hover:text-text-muted text-xs font-medium transition-colors">
            পাসওয়ার্ড ভুলে গেছেন?
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 w-full text-center">
        <button 
          onClick={() => (window as any).showDevModal()} 
          className="text-[10px] text-white/20 hover:text-white/40 font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Developed by <span className="text-white/30 hover:text-white/50 border-b border-white/10 pb-0.5 ml-1">Zahid Hasan</span>
        </button>
      </div>
    </div>
  );
}
