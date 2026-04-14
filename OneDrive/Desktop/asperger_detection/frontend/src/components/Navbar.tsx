import { useNavigate, NavLink } from 'react-router-dom';
import { Brain, Menu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Hub', path: '/' },
    { name: 'Archives', path: '/history' },
    { name: 'Intelligence', path: '/report' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-primary/5 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-all duration-500">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-foreground tracking-tighter">
            Aspire<span className="text-primary">Sense</span>
          </span>
        </div>

        {/* Global Hub Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary" 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Tactical Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 bg-accent/5 rounded-lg border border-accent/10">
             <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
             <span className="text-[8px] font-black text-accent uppercase tracking-widest">Protocol Live</span>
          </div>
          
          <button 
            onClick={() => navigate('/assessment')}
            className="hidden md:flex btn-primary-premium items-center gap-3 px-8 py-3.5 shadow-xl text-[9px] group"
          >
            Launch Sync
            <Zap className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
          </button>

          <button className="lg:hidden p-3 rounded-xl bg-muted/50 text-foreground">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
