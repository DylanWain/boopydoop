import React, { useState, useEffect, useRef } from 'react';

// Intersection Observer hook for scroll animations
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return [ref, isInView];
};

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isInView] = useInView();
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ 
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Icons as inline SVGs (no external dependencies)
const Icons = {
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  FileText: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

// Main Landing Page Component
export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Grain texture overlay */}
      <div className="grain-overlay"></div>
      
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight">boopydoop</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#compare" className="text-sm text-zinc-400 hover:text-white transition-colors">Compare</a>
              <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</a>
              <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="#waitlist" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/20">
                Join Waitlist
              </a>
            </div>
            
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block text-sm text-zinc-400 hover:text-white">Features</a>
              <a href="#compare" className="block text-sm text-zinc-400 hover:text-white">Compare</a>
              <a href="#how-it-works" className="block text-sm text-zinc-400 hover:text-white">How it works</a>
              <a href="#pricing" className="block text-sm text-zinc-400 hover:text-white">Pricing</a>
              <a href="#waitlist" className="block w-full px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full text-center">
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm text-zinc-400">Early access now open</span>
              </div>
            </AnimatedSection>
            
            {/* Main headline */}
            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
                <span className="text-white">Your admin work,</span>
                <br />
                <span className="text-white">handled automatically</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
                An AI assistant that manages your email, calendar, invoices, and tasks. 
                It drafts replies, schedules meetings, and sends reminders so you can focus on real work.
              </p>
            </AnimatedSection>
            
            {/* CTA */}
            <AnimatedSection delay={300}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
                {!submitted ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-8 py-3.5 bg-emerald-500 text-black font-semibold rounded-full hover:bg-emerald-400 transition-all duration-300 btn-glow flex items-center justify-center gap-2"
                    >
                      Get Early Access
                      <Icons.ArrowRight />
                    </button>
                  </>
                ) : (
                  <div className="flex-1 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-center flex items-center justify-center gap-2">
                    <Icons.Check />
                    You're on the list. We'll be in touch soon.
                  </div>
                )}
              </form>
              
              <p className="text-sm text-zinc-500">
                Launching January 2025. First 500 users get lifetime access for $50.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Hero Dashboard Mockup */}
          <AnimatedSection delay={400} className="mt-16 lg:mt-24">
            <div className="relative max-w-5xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl pointer-events-none"></div>
              
              {/* Main dashboard */}
              <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-zinc-800 rounded-md">
                      <span className="text-xs text-zinc-500">app.boopydoop.ai</span>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="flex min-h-[500px]">
                  {/* Sidebar */}
                  <div className="hidden lg:flex flex-col w-56 border-r border-zinc-800 bg-zinc-950 p-4">
                    <div className="flex items-center gap-2 mb-8">
                      <span className="font-semibold text-white">boopydoop</span>
                    </div>
                    
                    <nav className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 px-3 py-2.5 bg-zinc-800/50 rounded-lg text-white text-sm">
                        <span className="text-zinc-400"><Icons.Mail /></span>
                        <span>Inbox</span>
                        <span className="ml-auto px-2 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded-full">3</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                        <Icons.Calendar />
                        <span>Calendar</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                        <Icons.Check />
                        <span>Tasks</span>
                        <span className="ml-auto px-2 py-0.5 bg-zinc-800 text-zinc-500 text-xs rounded-full">7</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                        <Icons.FileText />
                        <span>Invoices</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                        <Icons.Users />
                        <span>Contacts</span>
                      </div>
                    </nav>
                    
                    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-500"><Icons.Clock /></span>
                        <span className="text-xs text-zinc-500">Time saved</span>
                      </div>
                      <p className="text-2xl font-bold text-white">11.4h</p>
                      <p className="text-xs text-zinc-500">this week</p>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 p-6 bg-zinc-950">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-zinc-500">Wednesday, January 15</p>
                        <h2 className="text-xl font-semibold text-white">Good morning</h2>
                      </div>
                      <button className="px-4 py-2 bg-emerald-500 text-black text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors">
                        Prepare My Day
                      </button>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-500"><Icons.Mail /></span>
                          <span className="text-xs text-zinc-500">Emails</span>
                        </div>
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-xs text-orange-500">3 urgent</p>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-500"><Icons.Calendar /></span>
                          <span className="text-xs text-zinc-500">Meetings</span>
                        </div>
                        <p className="text-2xl font-bold text-white">4</p>
                        <p className="text-xs text-blue-500">Next: 10am</p>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-purple-500"><Icons.Check /></span>
                          <span className="text-xs text-zinc-500">Tasks</span>
                        </div>
                        <p className="text-2xl font-bold text-white">7</p>
                        <p className="text-xs text-purple-500">2 due today</p>
                      </div>
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-emerald-500"><Icons.FileText /></span>
                          <span className="text-xs text-zinc-500">Invoices</span>
                        </div>
                        <p className="text-2xl font-bold text-white">$3.4k</p>
                        <p className="text-xs text-emerald-500">pending</p>
                      </div>
                    </div>
                    
                    {/* Email list */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-zinc-400">Needs your attention</h3>
                        <span className="text-sm text-emerald-500 cursor-pointer hover:underline">View all</span>
                      </div>
                      
                      {/* Urgent email with AI draft */}
                      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Urgent</span>
                          </div>
                          <span className="text-xs text-zinc-600">2 min ago</span>
                        </div>
                        <p className="text-sm font-medium text-white mb-1">john@bigclient.com</p>
                        <p className="text-sm text-zinc-400 mb-4">Contract question - need answer ASAP</p>
                        
                        {/* AI Draft box */}
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-black">
                              <Icons.Zap />
                            </div>
                            <span className="text-sm font-medium text-emerald-400">AI Draft Ready</span>
                          </div>
                          <p className="text-sm text-emerald-300/70 mb-3">"Hi John, the pricing for the enterprise tier is $2,400/year with full API access and priority support..."</p>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-emerald-500 text-black text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors flex items-center gap-2">
                              <Icons.Send /> Send
                            </button>
                            <button className="px-4 py-2 bg-transparent text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Auto-sent email */}
                      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 opacity-70">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 text-emerald-500">
                            <Icons.Check />
                            <span className="text-xs font-medium">Auto-sent</span>
                          </div>
                          <span className="text-xs text-zinc-600">15 min ago</span>
                        </div>
                        <p className="text-sm font-medium text-zinc-400 mb-1">mike@vendor.com</p>
                        <p className="text-sm text-zinc-500">Re: Can we reschedule to Thursday?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Social Proof Bar */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            <p className="text-sm text-zinc-500">Built for founders, freelancers, and small teams</p>
            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-xs text-zinc-500">hours saved weekly</p>
              </div>
              <div className="w-px h-12 bg-zinc-800"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-zinc-500">waitlist signups</p>
              </div>
              <div className="w-px h-12 bg-zinc-800"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-xs text-zinc-500">automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem / Solution */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                You didn't start a business to do admin work
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Yet every day, hours disappear into email, scheduling, follow-ups, and invoices. 
                Tasks that feel urgent but never move your business forward.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Without */}
            <AnimatedSection delay={100}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 lg:p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 text-red-400">
                  <Icons.X />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Without boopydoop</h3>
                <ul className="space-y-4">
                  {[
                    'Inbox overflowing with 50+ unread emails every morning',
                    'Constant context-switching between email, calendar, and to-do lists',
                    'Forgetting to follow up on important conversations',
                    'Chasing unpaid invoices for weeks',
                    'Spending 20+ hours per week on repetitive tasks'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0"></div>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* With */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-emerald-500/30 p-8 lg:p-10 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                    <Icons.Check />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">With boopydoop</h3>
                  <ul className="space-y-4">
                    {[
                      'Inbox pre-sorted with AI drafts ready for every email that needs a reply',
                      'One dashboard for email, calendar, tasks, and invoices — everything in sync',
                      'Automatic reminders when you haven\'t heard back from someone',
                      'Invoice reminders sent automatically at 3, 7, and 14 days overdue',
                      '10+ hours reclaimed every week for work that actually matters'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                        <span className="text-zinc-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">Features</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Everything you need, nothing you don't
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Not another tool to manage. An assistant that actually does the work.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Feature 1: Email Automation */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-500">
                    <Icons.Mail />
                  </div>
                  <span className="text-sm text-zinc-500 font-medium">Email Automation</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">
                  AI drafts your replies. You just hit send.
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Every email is automatically categorized as urgent, needs reply, or FYI. For emails requiring a response, 
                  AI generates a draft in your writing style. Review and send with one click, or let it send automatically.
                </p>
                <ul className="space-y-3">
                  {['Smart inbox categorization', 'AI drafts in your voice', 'Auto-send for routine replies', 'Follow-up detection'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-emerald-500"><Icons.Check /></span>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* Email Mockup */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-zinc-500">Inbox</span>
                  </div>
                </div>
                
                <div className="p-4 space-y-3 bg-zinc-950">
                  {/* Urgent email */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Urgent</span>
                      </div>
                      <span className="text-xs text-zinc-600">2 min ago</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-1">john@bigclient.com</p>
                    <p className="text-sm text-zinc-400 mb-3">Contract question - need answer ASAP</p>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-black">
                          <Icons.Zap />
                        </div>
                        <span className="text-xs font-medium text-emerald-400">AI Draft Ready</span>
                      </div>
                      <p className="text-xs text-emerald-300/70 leading-relaxed">"Hi John, the pricing for the enterprise tier is..."</p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1.5 bg-emerald-500 text-black text-xs font-semibold rounded-md">Send</button>
                        <button className="px-3 py-1.5 text-emerald-400 text-xs font-medium rounded-md border border-emerald-500/30">Edit</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Auto-sent */}
                  <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 opacity-60">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Icons.Check />
                        <span className="text-xs font-medium">Auto-sent</span>
                      </div>
                      <span className="text-xs text-zinc-600">15 min ago</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-400 mb-1">mike@vendor.com</p>
                    <p className="text-sm text-zinc-500">Re: Can we reschedule to Thursday?</p>
                  </div>
                  
                  {/* New lead */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-blue-400">New Lead</span>
                      <span className="text-xs text-zinc-600">1 hour ago</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-1">sarah@prospect.co</p>
                    <p className="text-sm text-zinc-400">Interested in your services</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Feature 2: Daily Briefing */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
            {/* Briefing Mockup */}
            <AnimatedSection delay={100} className="order-2 lg:order-1">
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-zinc-500">Daily Briefing</span>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-950">
                  <div className="mb-6">
                    <p className="text-zinc-500 text-sm mb-1">Good morning</p>
                    <h3 className="text-xl font-semibold text-white">Here's your Wednesday</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500"><Icons.Mail /></span>
                        <span className="text-xs text-zinc-500">Emails</span>
                      </div>
                      <p className="text-2xl font-bold text-white">8</p>
                      <p className="text-xs text-orange-500">3 urgent</p>
                    </div>
                    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-500"><Icons.Calendar /></span>
                        <span className="text-xs text-zinc-500">Meetings</span>
                      </div>
                      <p className="text-2xl font-bold text-white">4</p>
                      <p className="text-xs text-blue-500">Next: 10am</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Today's Schedule</p>
                    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="text-xs text-zinc-500 w-12">10:00</div>
                      <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white font-medium">Call with John Miller</p>
                        <p className="text-xs text-zinc-500">BigClient Inc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="text-xs text-zinc-500 w-12">14:00</div>
                      <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white font-medium">Team Standup</p>
                        <p className="text-xs text-zinc-500">Weekly sync</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="text-xs text-zinc-500 w-12">16:30</div>
                      <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white font-medium">Product Demo</p>
                        <p className="text-xs text-zinc-500">New prospect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-500">
                    <Icons.Calendar />
                  </div>
                  <span className="text-sm text-zinc-500 font-medium">Calendar & Briefings</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">
                  Start every day knowing exactly what matters
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Every morning at 7am, get a briefing email with your meetings, urgent emails, and top tasks. 
                  Before each meeting, receive a prep doc with attendee info, past interactions, and suggested talking points.
                </p>
                <ul className="space-y-3">
                  {['Daily briefing emails', 'Meeting prep documents', 'Smart scheduling suggestions', 'Automatic reschedule handling'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-emerald-500"><Icons.Check /></span>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Feature 3: Automation Settings */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-500">
                    <Icons.Settings />
                  </div>
                  <span className="text-sm text-zinc-500 font-medium">Full Control</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">
                  You decide what gets automated
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Not comfortable with AI sending emails on your behalf? No problem. Choose manual mode and review every draft. 
                  Or enable auto-send for specific categories like meeting confirmations while keeping VIP contacts on manual review.
                </p>
                <ul className="space-y-3">
                  {['Per-category automation rules', 'VIP contact exceptions', 'Undo window for auto-sent messages', 'Activity log of all AI actions'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-emerald-500"><Icons.Check /></span>
                      <span className="text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            {/* Automation Settings Mockup */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl p-6">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4">Automation Settings</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-blue-500">
                        <Icons.Calendar />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Meeting Reschedules</p>
                        <p className="text-xs text-zinc-500">Auto-respond with available times</p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-emerald-500 rounded-full p-1 flex items-center justify-end">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-orange-500">
                        <Icons.FileText />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Invoice Reminders</p>
                        <p className="text-xs text-zinc-500">Send after 3 days overdue</p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-emerald-500 rounded-full p-1 flex items-center justify-end">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-purple-500">
                        <Icons.Users />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">VIP Contacts</p>
                        <p className="text-xs text-zinc-500">Always draft, never auto-send</p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-zinc-700 rounded-full p-1 flex items-center">
                      <div className="w-5 h-5 bg-zinc-500 rounded-full shadow"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-500">
                        <Icons.Mail />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Thank You Replies</p>
                        <p className="text-xs text-zinc-500">Auto-send brief acknowledgments</p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-emerald-500 rounded-full p-1 flex items-center justify-end">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 border-t border-zinc-800 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">How it works</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Set up in 5 minutes, save 10 hours a week
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '1', title: 'Connect your accounts', desc: 'Link your Gmail and Google Calendar with one click. We\'ll sync your last 30 days of emails and learn your writing style.' },
              { num: '2', title: 'Set your preferences', desc: 'Tell us how aggressive you want automation to be. Conservative reviews everything; aggressive auto-sends routine messages.' },
              { num: '3', title: 'Let AI do the work', desc: 'Watch as your inbox gets organized, drafts appear, and routine tasks handle themselves. Check the dashboard anytime to see what\'s happening.' }
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                    <span className="text-lg font-bold text-emerald-400">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Features Section */}
      <section className="py-24 lg:py-32 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">Complete Platform</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Everything you need to run your business
              </h2>
              <p className="text-lg text-zinc-400">
                10 integrated modules that work together seamlessly
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 1. Email Automation */}
            <AnimatedSection delay={0}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Icons.Mail />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email Automation</h3>
                    <p className="text-sm text-zinc-400 mb-4">AI categorizes, drafts replies, and handles routine responses automatically.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Inbox triage', 'Smart replies', 'Follow-up detection', 'Auto-unsubscribe'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 2. Calendar & Scheduling */}
            <AnimatedSection delay={50}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Icons.Calendar />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Calendar & Scheduling</h3>
                    <p className="text-sm text-zinc-400 mb-4">Smart scheduling, automatic reschedules, and meeting prep delivered to your inbox.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Daily briefings', 'Meeting prep', 'Buffer time', 'Timezone magic'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 3. Invoicing & Payments */}
            <AnimatedSection delay={100}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0">
                    <Icons.FileText />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Invoicing & Payments</h3>
                    <p className="text-sm text-zinc-400 mb-4">Generate invoices, track payments, and auto-send reminders for overdue accounts.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Invoice generator', 'Payment tracking', 'Late reminders', 'Recurring billing'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 4. CRM & Contacts */}
            <AnimatedSection delay={150}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <Icons.Users />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">CRM & Client Management</h3>
                    <p className="text-sm text-zinc-400 mb-4">Auto-created profiles from emails, interaction history, and relationship insights.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Auto profiles', 'Interaction log', 'Deal pipeline', 'Lead scoring'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 5. Meeting Intelligence */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <Icons.Play />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Meeting Intelligence</h3>
                    <p className="text-sm text-zinc-400 mb-4">Auto-transcribe calls, generate summaries, and extract action items instantly.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Transcription', 'AI summaries', 'Action items', 'Searchable archive'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 6. Task Management */}
            <AnimatedSection delay={250}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 flex-shrink-0">
                    <Icons.Check />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Task & Project Management</h3>
                    <p className="text-sm text-zinc-400 mb-4">AI extracts tasks from emails and meetings, prioritizes, and tracks deadlines.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Auto extraction', 'Smart priority', 'Deadline alerts', 'Weekly review'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 7. Document Automation */}
            <AnimatedSection delay={300}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Document Automation</h3>
                    <p className="text-sm text-zinc-400 mb-4">Generate contracts, proposals, and documents. Send for e-signature with tracking.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Contract gen', 'Proposals', 'E-signatures', 'Templates'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 8. Social Media */}
            <AnimatedSection delay={350}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z"/><path d="M9 13h6"/><path d="M9 17h3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Social Media & Content</h3>
                    <p className="text-sm text-zinc-400 mb-4">AI writes posts in your voice, schedules across platforms, tracks engagement.</p>
                    <div className="flex flex-wrap gap-2">
                      {['AI copywriting', 'Scheduling', 'Analytics', 'Repurposing'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 9. Communication Hub */}
            <AnimatedSection delay={400}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <Icons.Bell />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Communication Hub</h3>
                    <p className="text-sm text-zinc-400 mb-4">Unified inbox for email, Slack, SMS, and WhatsApp. VIP alerts and smart routing.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Unified inbox', 'SMS automation', 'VIP alerts', 'Auto-responses'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* 10. Research & Intelligence */}
            <AnimatedSection delay={450}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Research & Intelligence</h3>
                    <p className="text-sm text-zinc-400 mb-4">Auto-research prospects before meetings. Monitor competitors and industry news.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Client research', 'Competitor alerts', 'News digest', 'Contact finder'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Bottom CTA */}
          <AnimatedSection delay={500}>
            <div className="mt-12 text-center">
              <p className="text-zinc-400 mb-6">All features included in lifetime access. No feature tiers, no upsells.</p>
              <a href="#waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 btn-glow">
                Get All Features for $50
                <Icons.ArrowRight />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* The Math Section */}
      <section className="py-24 lg:py-32 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">The Math</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Stop paying for 5 tools that don't talk to each other
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Current Stack */}
            <AnimatedSection delay={100}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <Icons.X />
                  </div>
                  <h3 className="text-lg font-semibold text-white">What you're paying now</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: 'Superhuman (email)', price: '$25' },
                    { name: 'Motion (calendar + tasks)', price: '$34' },
                    { name: 'Otter.ai (meeting notes)', price: '$16' },
                    { name: 'QuickBooks (invoicing)', price: '$30' },
                    { name: 'HubSpot CRM (contacts)', price: '$20' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-zinc-400">{item.name}</span>
                      <span className="text-zinc-500 font-mono">{item.price}/mo</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-zinc-800 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-red-400">$125/mo</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-zinc-500">
                  <p>+ Context switching between 5 apps</p>
                  <p>+ Nothing talks to each other</p>
                  <p>+ You still do the work manually</p>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Boopydoop */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-emerald-500/30 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Icons.Check />
                    </div>
                    <h3 className="text-lg font-semibold text-white">With boopydoop</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      'Email automation + AI drafts',
                      'Calendar sync + daily briefings',
                      'Meeting transcription + summaries',
                      'Invoice generation + reminders',
                      'Contact CRM + follow-up alerts',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-emerald-500"><Icons.Check /></span>
                        <span className="text-zinc-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-emerald-500/20 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-400">$15/mo</span>
                        <p className="text-xs text-emerald-500">or $50 lifetime</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-emerald-400/80">
                    <p>+ Everything connected in one dashboard</p>
                    <p>+ AI actually does the work for you</p>
                    <p>+ Save 10+ hours every week</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <p className="text-sm text-emerald-300">
                      <span className="font-semibold">You save:</span> $110/mo + 10 hours/week
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Why Not Just Use Section */}
      <section id="compare" className="py-24 lg:py-32 border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">Compare</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Why not just use...
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Great tools exist. But they only solve part of the problem.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {/* Superhuman */}
            <AnimatedSection delay={100}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Superhuman?</h3>
                  <span className="text-xs text-zinc-500 font-mono">$25/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">Fast email. That's it.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-500">You still need:</p>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• Calendar management</li>
                    <li>• Invoice generation</li>
                    <li>• Task management</li>
                    <li>• CRM / contacts</li>
                    <li>• Meeting notes</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-xs text-emerald-400">boopydoop does email AND everything else</p>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Motion */}
            <AnimatedSection delay={150}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Motion?</h3>
                  <span className="text-xs text-zinc-500 font-mono">$34/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">Great scheduling. Zero email.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-500">The problem:</p>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• Ignores your inbox completely</li>
                    <li>• Tasks must be entered manually</li>
                    <li>• No invoicing</li>
                    <li>• No contact management</li>
                    <li>• Doesn't pull tasks from emails</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-xs text-emerald-400">boopydoop starts with your inbox, where work begins</p>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Lindy */}
            <AnimatedSection delay={200}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Lindy?</h3>
                  <span className="text-xs text-zinc-500 font-mono">$50+/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">Powerful if you want to build it yourself.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-500">The problem:</p>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• Hours to set up properly</li>
                    <li>• You decide what to automate</li>
                    <li>• No unified dashboard</li>
                    <li>• Credits run out quickly</li>
                    <li>• Powerful but complex</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-xs text-emerald-400">boopydoop is pre-built and works in 5 minutes</p>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Human VA */}
            <AnimatedSection delay={250}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-full card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">A Human VA?</h3>
                  <span className="text-xs text-zinc-500 font-mono">$2-4k/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">Great, but expensive and limited.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-500">The problem:</p>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• Needs weeks of training</li>
                    <li>• Works 40 hours, not 168</li>
                    <li>• Takes PTO, gets sick</li>
                    <li>• Makes mistakes you may miss</li>
                    <li>• $24k-48k per year</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-xs text-emerald-400">boopydoop is $15/mo, works 24/7, never sleeps</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Comparison Table */}
          <AnimatedSection delay={300}>
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold text-white text-center mb-8">Feature Comparison</h3>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-4 text-zinc-400 font-medium">What you need</th>
                        <th className="p-4 text-center text-emerald-400 font-semibold bg-emerald-500/5">boopydoop</th>
                        <th className="p-4 text-center text-zinc-500 font-medium">Superhuman</th>
                        <th className="p-4 text-center text-zinc-500 font-medium">Motion</th>
                        <th className="p-4 text-center text-zinc-500 font-medium">Lindy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Email AI drafts', us: true, superhuman: true, motion: false, lindy: 'config' },
                        { feature: 'Auto-send (not just draft)', us: true, superhuman: false, motion: false, lindy: 'config' },
                        { feature: 'Calendar management', us: true, superhuman: false, motion: true, lindy: 'config' },
                        { feature: 'Daily briefing email', us: true, superhuman: false, motion: false, lindy: 'config' },
                        { feature: 'Meeting transcription', us: true, superhuman: false, motion: true, lindy: 'config' },
                        { feature: 'Task extraction', us: true, superhuman: false, motion: true, lindy: 'config' },
                        { feature: 'Invoice generation', us: true, superhuman: false, motion: false, lindy: false },
                        { feature: 'Payment reminders', us: true, superhuman: false, motion: false, lindy: 'config' },
                        { feature: 'Contact CRM', us: true, superhuman: false, motion: false, lindy: 'config' },
                        { feature: 'Follow-up detection', us: true, superhuman: true, motion: false, lindy: 'config' },
                        { feature: 'Works in 5 minutes', us: true, superhuman: true, motion: false, lindy: false },
                        { feature: 'One unified dashboard', us: true, superhuman: false, motion: false, lindy: false },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-zinc-800/50">
                          <td className="p-4 text-zinc-300">{row.feature}</td>
                          <td className="p-4 text-center bg-emerald-500/5">
                            {row.us ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">—</span>}
                          </td>
                          <td className="p-4 text-center">
                            {row.superhuman === true ? <span className="text-zinc-400">✓</span> : row.superhuman === 'config' ? <span className="text-zinc-600">⚙️</span> : <span className="text-zinc-700">—</span>}
                          </td>
                          <td className="p-4 text-center">
                            {row.motion === true ? <span className="text-zinc-400">✓</span> : row.motion === 'config' ? <span className="text-zinc-600">⚙️</span> : <span className="text-zinc-700">—</span>}
                          </td>
                          <td className="p-4 text-center">
                            {row.lindy === true ? <span className="text-zinc-400">✓</span> : row.lindy === 'config' ? <span className="text-zinc-600">⚙️</span> : <span className="text-zinc-700">—</span>}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-zinc-800/30">
                        <td className="p-4 text-zinc-300 font-medium">Price</td>
                        <td className="p-4 text-center bg-emerald-500/5 font-semibold text-emerald-400">$15/mo</td>
                        <td className="p-4 text-center text-zinc-500">$25/mo</td>
                        <td className="p-4 text-center text-zinc-500">$34/mo</td>
                        <td className="p-4 text-center text-zinc-500">$50+/mo</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-zinc-300 font-medium">Tools replaced</td>
                        <td className="p-4 text-center bg-emerald-500/5 font-semibold text-emerald-400">5</td>
                        <td className="p-4 text-center text-zinc-500">1</td>
                        <td className="p-4 text-center text-zinc-500">2</td>
                        <td className="p-4 text-center text-zinc-500">varies</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                  <p className="text-xs text-zinc-500 text-center">⚙️ = Possible if you configure/build it yourself</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Bottom CTA */}
          <AnimatedSection delay={400}>
            <div className="mt-16 text-center">
              <p className="text-lg text-zinc-400 mb-6">Everything they do. Plus everything they don't.</p>
              <a href="#waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 btn-glow">
                Get Started for $50 Lifetime
                <Icons.ArrowRight />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-4">Early Access Pricing</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Lock in lifetime access
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                First 500 users get permanent access for a one-time payment. No subscriptions, no hidden fees.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="max-w-lg mx-auto">
              <div className="relative bg-zinc-900 rounded-3xl border border-emerald-500/30 p-8 lg:p-10 overflow-hidden shadow-xl shadow-emerald-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-emerald-500 font-medium mb-1">Lifetime Access</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">$50</span>
                        <span className="text-zinc-500 line-through">$180/yr</span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-500 text-black text-xs font-bold rounded-full">
                      72% OFF
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 mb-8">
                    One payment, forever access. Join the waitlist to secure your spot.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'Email automation with AI drafts',
                      'Calendar sync & daily briefings',
                      'Task extraction & management',
                      'Invoice generation & reminders',
                      'Contact CRM',
                      'Meeting transcription & summaries',
                      'All future features included',
                      'Priority support'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="text-emerald-500 flex-shrink-0"><Icons.Check /></span>
                        <span className="text-zinc-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#waitlist"
                    className="block w-full py-4 bg-emerald-500 text-black text-center font-semibold rounded-xl hover:bg-emerald-400 transition-colors"
                  >
                    Join Waitlist for $50 Lifetime Access
                  </a>
                  
                  <p className="text-center text-xs text-zinc-500 mt-4">
                    Only 500 spots available. 327 remaining.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Final CTA */}
      <section id="waitlist" className="py-24 lg:py-32 bg-zinc-900/50 border-t border-zinc-800 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                Ready to reclaim your time?
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                Join 500+ founders and freelancers who are tired of drowning in admin work. 
                Get early access and lock in lifetime pricing before we launch.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                {!submitted ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-8 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 text-lg"
                    >
                      Join Waitlist
                      <Icons.ArrowRight />
                    </button>
                  </>
                ) : (
                  <div className="flex-1 px-5 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-center justify-center gap-2 text-lg">
                    <Icons.Check />
                    You're on the list. We'll be in touch soon.
                  </div>
                )}
              </form>
              
              <p className="text-sm text-zinc-500">
                No spam. We'll only email you when we're ready to launch.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-white">boopydoop</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</a>
              <a href="mailto:hello@boopydoop.ai" className="text-sm text-zinc-500 hover:text-white transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-zinc-600">
              2025 Boopydoop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
