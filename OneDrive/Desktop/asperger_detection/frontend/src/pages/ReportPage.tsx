import { FileText, Download, Printer, ShieldCheck, Mail, Zap, Activity, Verified, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PDFReportViewer = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-32">
      
      {/* Refined Tactical Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-16">
         <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="px-5 py-2 bg-primary/5 border border-primary/10 rounded-xl text-primary text-[10px] font-black uppercase tracking-[0.3em] font-mono shadow-sm">
                  Clinical Outcome Document
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Verified Trace</span>
               </div>
            </div>
            <h1 className="text-7xl font-black text-foreground tracking-tighter leading-none">
               Analytica <br/> <span className="text-gradient-premium">Clinical Pack.</span>
            </h1>
         </div>
         
         <div className="flex gap-4">
            <button className="w-14 h-14 bg-white border-2 border-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-xl group">
               <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-14 h-14 bg-white border-2 border-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-xl group">
               <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="btn-primary-premium px-10 py-5 text-sm font-black flex items-center gap-3 group">
               <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
               Export PDF
            </button>
         </div>
      </header>

      {/* Industrial-Scale Report Card */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white text-foreground rounded-[4rem] shadow-[0_80px_200px_-40px_rgba(0,0,0,0.08)] p-12 md:p-24 border-8 border-white ring-2 ring-primary/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 opacity-[0.01] pointer-events-none">
           <FileText className="w-[500px] h-[500px] -rotate-12" />
        </div>

        <header className="border-b-4 border-muted pb-16 mb-24 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
                <Zap className="text-white w-7 h-7" />
             </div>
             <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tighter">AspireSense.</h2>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Protocol Node 4.28</p>
             </div>
          </div>
          
          <div className="text-left md:text-right space-y-2">
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">SYNC HASH: AS-MAR-2026-X882</p>
            <p className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">Diagnostic Timestamp: March 12, 2026</p>
          </div>
        </header>

        <div className="space-y-24 relative z-10">
          {/* Identity Pod */}
          <section className="space-y-10">
            <h3 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.6em]">Subject Attribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-2">
                 <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Identity</p>
                 <p className="text-3xl font-black text-foreground tracking-tighter">Gupta, Lakshay</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Biological Age</p>
                 <p className="text-3xl font-black text-foreground tracking-tighter">24.0 Yrs</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Confidence</p>
                 <div className="flex items-center gap-3">
                    <Verified className="text-accent w-6 h-6" />
                    <p className="text-3xl font-black text-foreground tracking-tighter">High-Purity</p>
                 </div>
              </div>
            </div>
          </section>

          {/* Inference Pod */}
          <section className="space-y-10 p-12 bg-muted/20 rounded-[3rem] border-4 border-white shadow-inner">
            <h3 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.6em]">Clinical Narrative Inference</h3>
            <div className="space-y-10">
              <p className="text-3xl font-bold leading-relaxed text-foreground/80 tracking-tight max-w-4xl">
                Multi-modal synchronization indicates a <span className="text-primary font-black italic underline decoration-primary/10 underline-offset-8">Neural Probability Index of 72.4%</span>. Biometric factors represent high congruence with ASD Level 1 archetypes.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-10 rounded-[2.5rem] border-2 border-primary/5">
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-primary uppercase tracking-[0.5em]">Probabilistic Alpha</p>
                   <div className="flex items-baseline gap-4">
                      <span className="text-8xl font-black text-foreground tracking-tighter leading-none">0.72</span>
                      <span className="text-xl text-primary/40 font-black tracking-widest uppercase italic">Index</span>
                   </div>
                </div>
                <div className="text-left md:text-right max-w-xs space-y-4">
                   <div className="px-6 py-2 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-[0.3em] inline-block">
                      Elevated Alignment
                   </div>
                   <p className="text-xs text-muted-foreground font-black italic leading-relaxed uppercase tracking-widest">
                     "Verification mandated for clinical validation."
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* Evidence Pods - Card Matrix */}
          <section className="space-y-10">
            <h3 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.6em]">Biometric Evidence Grid</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                 { label: 'Spectral Prosody', val: 'Atypical acoustic rhythm modulation (+0.42 SYNC).', icon: Activity },
                 { label: 'Ocular Latency Delta', val: 'Reduced foveal fixation on social archetypes (+14.2% DEV).', icon: Zap }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 p-8 rounded-[2rem] bg-white border-4 border-white shadow-xl hover:border-primary/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                     <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-primary/40 tracking-[0.3em] uppercase leading-none">{item.label}</span>
                     <p className="text-xl font-black text-foreground/80 tracking-tighter leading-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-40 pt-16 border-t-4 border-muted flex justify-between items-center opacity-30 px-6">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">AspireSense Intelligence Hub • Node Verified • v4.2</p>
           <Verified className="w-10 h-10 text-primary" />
        </footer>
      </motion.div>

      {/* Hub Return */}
      <footer className="pt-20 text-center">
         <button 
           onClick={() => navigate('/')}
           className="btn-secondary-premium px-16 py-8 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 mx-auto group shadow-2xl"
         >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-3 transition-transform text-primary" />
            Return to Tactical Hub
         </button>
      </footer>
    </div>
  );
};

export default PDFReportViewer;
