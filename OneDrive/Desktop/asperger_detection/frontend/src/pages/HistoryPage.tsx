import { motion } from 'framer-motion';
import { 
  Calendar, TrendingUp, ChevronRight, Brain, 
  ShieldCheck, Activity, Search, Filter, 
  Plus, Zap, Award, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();
  
  const assessments = [
    { id: '1', date: 'March 10, 2026', score: 72, type: 'Initial Diagnostic', status: 'Elevated' },
    { id: '2', date: 'February 25, 2026', score: 68, type: 'Follow-up Trace', status: 'Moderate' },
    { id: '3', date: 'January 15, 2026', score: 65, type: 'Initial Diagnostic', status: 'Moderate' },
    { id: '4', date: 'December 20, 2025', score: 58, type: 'Baseline Sync', status: 'Stable' },
    { id: '5', date: 'November 12, 2025', score: 70, type: 'Initial Diagnostic', status: 'Follow-up' },
    { id: '6', date: 'October 05, 2025', score: 62, type: 'Clinical Audit', status: 'Verified' },
  ];

  return (
    <div className="space-y-32">
      {/* Elite Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-8">
          <h1 className="text-7xl font-black text-foreground tracking-tighter leading-none">
            Diagnostic <br/> <span className="text-gradient-premium">Archives.</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xl leading-relaxed max-w-xl">Longitudinal tracking of multi-modal behavioral synchronization markers and historical neural vector data.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter archives..."
              className="pl-16 pr-8 py-5 rounded-2xl bg-white border-4 border-white shadow-xl focus:border-primary/20 outline-none font-bold text-sm tracking-tight w-64 transition-all"
            />
          </div>
          <button className="p-6 rounded-2xl bg-white border-2 border-muted shadow-xl hover:bg-muted transition-all text-muted-foreground">
             <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Global Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
            { label: 'Total Syncs', val: '12', sub: '+2 this month', icon: Zap, color: 'primary' },
            { label: 'Avg Probability', val: '68.4%', sub: 'Within SD', icon: Activity, color: 'accent' },
            { label: 'Verified Status', val: 'Level 1', sub: 'Clinical Confirmed', icon: Award, color: 'primary' }
         ].map((stat, i) => (
            <div key={i} className="glass-card-premium p-10 flex items-center gap-8 bg-white/50 group overflow-hidden relative">
               <div className={`w-14 h-14 rounded-2xl ${stat.color === 'primary' ? 'bg-primary' : 'bg-accent'} flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform`}>
                  <stat.icon className="text-white w-7 h-7" />
               </div>
               <div className="text-left">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">{stat.label}</p>
                  <p className="text-3xl font-black text-foreground tracking-tighter">{stat.val}</p>
                  <p className="text-[9px] font-bold text-primary tracking-widest mt-1 opacity-60 italic">{stat.sub}</p>
               </div>
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            </div>
         ))}
      </div>

      {/* Archives Card Grid - "More Cards" Refined Alignment */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
           <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.5em] whitespace-nowrap">Historical Timeline Matrix</h4>
           <div className="flex-1 h-px bg-primary/5" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assessments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate('/dashboard')}
              className="glass-card-premium p-10 flex flex-col items-start text-left space-y-10 cursor-pointer overflow-hidden group border-4 border-white bg-white/60 shadow-xl hover:shadow-2xl hover:border-primary/10 transition-all hover:bg-white"
            >
              <div className="flex justify-between items-start w-full">
                <div className="w-16 h-16 rounded-2xl bg-muted border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                  <Brain className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <button className="p-3 rounded-xl bg-muted/30 text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                   <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 w-full">
                <div className="flex flex-col gap-2">
                  <div className={`w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 ${
                    item.score > 70 ? 'bg-primary border-primary text-white shadow-lg' : 'bg-muted border-border text-muted-foreground opacity-60'
                  }`}>
                    {item.status}
                  </div>
                  <h3 className="text-3xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors leading-none">{item.type}</h3>
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-black uppercase tracking-[0.1em] pt-4 border-t-2 border-primary/5">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {item.date}
                  </span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-foreground tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {item.score}<span className="text-xl text-primary/20 font-light">%</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Packet Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/assessment')}
            className="rounded-[3rem] border-8 border-dashed border-primary/5 bg-primary/5 flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-primary/10 transition-all p-12 min-h-[350px]"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-90 transition-transform duration-700">
               <Plus className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-2 tracking-tighter">Sync New Packet</h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Initiate Protocol Focus</p>
          </motion.div>
        </div>
      </div>

      {/* Footer Support Info */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-10 text-muted-foreground font-black tracking-widest opacity-20 text-[9px] uppercase border-t-2 border-primary/5 pt-10">
         <p>© 2026 AspireSense Intelligence Hub</p>
         <div className="flex gap-8">
            <p>Protocol v4.28 Stable</p>
            <p>Neural Core Verified</p>
         </div>
      </footer>
    </div>
  );
};

export default HistoryPage;
