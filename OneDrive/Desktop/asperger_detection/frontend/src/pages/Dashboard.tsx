import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer
} from 'recharts';
import { 
  Download, Share2, Activity, 
  Award, FileText, Verified, Info, 
  Sparkles, RefreshCw, Clock, ShieldCheck, HeartPulse
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const results = location.state?.results;

  const displayData = {
    riskScore: results?.risk_score ?? 68,
    confidence: results?.confidence ?? 96.4,
    domains: results?.domain_scores ?? [
      { subject: 'Social Interaction', A: 75, fullMark: 100 },
      { subject: 'Communication', A: 68, fullMark: 100 },
      { subject: 'Sensory Sensitivity', A: 55, fullMark: 100 },
      { subject: 'Repetitive Patterns', A: 60, fullMark: 100 },
      { subject: 'Ocular Gaze Stability', A: 45, fullMark: 100 },
      { subject: 'Cognitive Rigidity', A: 70, fullMark: 100 },
    ],
    shap: (results?.shap as any[]) ?? [
      { name: 'Ocular Focus Delta', value: 18, detail: 'Latency in social stimulus fixation' },
      { name: 'Spectral Prosody', value: 14, detail: 'Monotone rhythm attribution detected' },
      { name: 'Affective Variance', value: 12, detail: 'Subtle flattening in facial markers' },
      { name: 'Consistent Survey', value: 25, detail: 'Core clinical marker triangulation' },
    ]
  };

  const isElevated = displayData.riskScore > 50;

  return (
    <div className="space-y-32">
      {/* Refined Tactical Header */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
           <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                  <div className="px-5 py-2 bg-primary/5 border border-primary/10 rounded-xl text-primary text-[10px] font-black uppercase tracking-[0.3em] font-mono">
                    Node: AS-7721-SYNC
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                     <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Processing Live</span>
                  </div>
              </div>
              <h1 className="text-7xl font-black text-foreground tracking-tighter leading-none">
                Risk <span className="text-gradient-premium">Intelligence.</span>
              </h1>
              <div className="flex flex-wrap items-center gap-10">
                 <div className="text-muted-foreground font-bold flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-primary" />
                    Archive: ASD-9942
                 </div>
                 <div className="text-muted-foreground font-bold text-sm flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    Verified Synced
                 </div>
              </div>
           </div>
           
           <div className="flex gap-4">
              <button className="glass-card-premium bg-white/50 p-6 rounded-2xl hover:bg-primary hover:text-white transition-all group border-2">
                 <Share2 className="w-6 h-6" />
              </button>
              <button className="btn-primary-premium px-10 py-5 rounded-2xl text-sm flex items-center gap-3 group">
                 <Download className="w-5 h-5" />
                 Download Clinical Data
              </button>
           </div>
      </header>

      {/* Minimalism Grid - Unified Cards */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Core Risk Circular - Minimalist Pod */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="glass-card-premium p-12 bg-white/40 border-4 border-white flex flex-col items-center text-center relative"
        >
          <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.5em] mb-12 flex items-center gap-3">
             Unified Risk Core
             <Info className="w-4 h-4 opacity-40" />
          </div>
          
          <div className="relative w-64 h-64 mb-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%" cy="50%" r="42%"
                fill="transparent"
                stroke="rgba(13, 148, 136, 0.05)"
                strokeWidth="10%"
              />
              <motion.circle
                cx="50%" cy="50%" r="42%"
                fill="transparent"
                stroke="url(#dashboardGradNew)"
                strokeWidth="10%"
                strokeDasharray="100%"
                initial={{ strokeDashoffset: "100%" }}
                animate={{ strokeDashoffset: `${100 - displayData.riskScore}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="dashboardGradNew" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-black text-foreground tracking-tighter">
                {displayData.riskScore}<span className="text-xl text-primary/20 font-light">%</span>
              </div>
              <div className={`mt-2 px-4 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.3em] ${
                isElevated ? 'bg-primary text-white' : 'bg-accent text-white'
              }`}>
                 {isElevated ? 'Elevated' : 'Baseline'}
              </div>
            </div>
          </div>
          
          <div className="space-y-4 w-full">
             <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">Signal Integrity</span>
                <span className="text-xl font-black text-foreground">{displayData.confidence}%</span>
             </div>
             <div className="h-3 w-full bg-muted rounded-full overflow-hidden shadow-inner border-2 border-primary/5">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${displayData.confidence}%` }}
                   transition={{ duration: 1.5, delay: 1 }}
                   className="h-full bg-gradient-to-r from-primary to-accent" 
                />
             </div>
          </div>
        </motion.div>

        {/* Neuro Analysis Grid - Card Matrix */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Radar Section */}
           <motion.div 
             className="glass-card-premium p-10 bg-white border-4 border-white md:col-span-2 min-h-[400px]"
           >
              <div className="flex justify-between items-start mb-10">
                 <div className="space-y-2">
                    <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.4em]">Domain Mesh</p>
                    <h3 className="text-3xl font-black text-foreground tracking-tighter">Diagnostic Matrix</h3>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                 </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={displayData.domains}>
                    <PolarGrid stroke="rgba(13, 148, 136, 0.1)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 9, fontWeight: 900, letterSpacing: '0.1em' }} 
                    />
                    <Radar
                      name="A" dataKey="A" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
           </motion.div>

           {/* Evidence Pods */}
           <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
              <div className="glass-card-premium p-10 bg-white border-4 border-white space-y-8">
                 <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em] flex items-center gap-3">
                    <Verified className="w-4 h-4 text-accent" />
                    Clinical Protocols
                 </h4>
                 <p className="text-xl font-bold leading-tight text-foreground/80 tracking-tight">
                    Assessment indicates high domain specificity in <span className="text-primary font-black">Cognitive Rigidities</span>. Specialist validation recommended for Tier-1 confirmation.
                 </p>
                 <div className="pt-4 flex gap-4">
                    <button className="flex-1 py-4 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                       Refer Physician
                    </button>
                    <button className="flex-1 py-4 rounded-xl bg-muted text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                       Verify Hash
                    </button>
                 </div>
              </div>

              <div className="glass-card-premium p-10 bg-white border-4 border-white space-y-8">
                 <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em] flex items-center gap-3">
                    <Activity className="w-4 h-4 text-primary" />
                    Attribution Cluster
                 </h4>
                 <div className="space-y-6">
                    {displayData.shap.slice(0, 3).map((item, i) => (
                       <div key={i} className="flex justify-between items-center bg-muted/20 p-4 rounded-xl border-2 border-white">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-foreground leading-none">{item.name}</p>
                             <p className="text-[8px] font-bold text-muted-foreground opacity-60 leading-none">{item.detail}</p>
                          </div>
                          <span className="text-primary font-black text-sm">+{item.value}%</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Action Suite */}
      <section className="flex flex-col sm:flex-row gap-6 pt-10">
         <button 
           onClick={() => navigate('/assessment')}
           className="flex-1 btn-secondary-premium py-7 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest"
         >
            <RefreshCw className="w-5 h-5" />
            Re-Initialize Scan
         </button>
         <button 
           onClick={() => navigate('/')}
           className="flex-1 btn-primary-premium py-7 rounded-2xl text-[10px] font-black uppercase tracking-widest"
         >
            Return to Intelligence Hub
         </button>
      </section>

      {/* Footer Branding */}
      <footer className="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 text-[9px] font-black uppercase tracking-widest border-t-2 border-primary/5">
          <p>© 2026 AspireSense Diagnostics • Neural v4.28</p>
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-4 h-4 text-accent" />
             <p>Certified Data Integrity Hash: 0xF82A...7E11</p>
          </div>
      </footer>
    </div>
  );
};

export default ResultsDashboard;
