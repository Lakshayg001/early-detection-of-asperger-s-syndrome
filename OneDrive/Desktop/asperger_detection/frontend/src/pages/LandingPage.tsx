import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Brain, Zap, Activity, 
  ShieldCheck, Globe, Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { 
      title: 'Neural Gaze Trace', 
      desc: 'Analyzing foveal latency and social stimulus fixation patterns via high-fidelity ocular mapping.',
      icon: Zap,
      color: 'bg-primary/10 text-primary'
    },
    { 
      title: 'Acoustic Prosody', 
      desc: 'Spectral analysis of speech rhythm, pitch modulation, and monotone variance markers.',
      icon: Activity,
      color: 'bg-accent/10 text-accent'
    },
    { 
      title: 'Behavioral Sync', 
      desc: 'Multi-modal fusion engine quantifying clinical markers across social interaction archetypes.',
      icon: Brain,
      color: 'bg-primary/10 text-primary'
    }
  ];

  const stats = [
    { label: 'Signal Purity', value: '99.4%', icon: Sparkles },
    { label: 'Regional Hubs', value: 'Global', icon: Globe },
    { label: 'Secure Protocol', value: 'Level 4', icon: ShieldCheck },
    { label: 'Unique Identifiers', value: 'Biometric', icon: Fingerprint }
  ];

  return (
    <div className="space-y-40">
      {/* Refined Minimalist Hero */}
      <section className="text-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-primary/10 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol v4.2 Diagnostic Core</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground">
            Precision <br/>
            <span className="text-gradient-premium">Intelligence.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-bold max-w-2xl mx-auto leading-relaxed">
            A minimalist portal for high-fidelity autistic spectrum screening. 
            Powered by multi-modal biometric fusion for clinical-grade behavioral insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <button 
              onClick={() => navigate('/assessment')}
              className="btn-primary-premium px-12 py-6 rounded-3xl flex items-center gap-4 group"
            >
              Start Diagnostic Link
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="btn-secondary-premium px-12 py-6 rounded-3xl border-4 text-sm">
              Science & Methodology
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid - "More Cards" Minimalism */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-premium p-10 bg-white/40 border-4 border-white flex flex-col items-start text-left space-y-8 group hover:bg-white transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.color}`}>
              <f.icon className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
               Learn Protocol <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Stats Board Section */}
      <section className="glass-card-premium p-12 md:p-20 bg-primary/5 border-primary/5">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-primary/5">
                    <s.icon className="w-6 h-6 text-primary" />
                 </div>
                 <div className="space-y-1 text-left">
                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">{s.label}</p>
                    <p className="text-3xl font-black text-foreground tracking-tighter">{s.value}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Corporate/Minimalist CTA */}
      <section className="py-20 text-center space-y-12 border-t-4 border-primary/5">
         <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground/80 leading-none">
            Ready to initiate <br/> behavioral synchronization?
         </h2>
         <button 
           onClick={() => navigate('/assessment')}
           className="btn-primary-premium px-16 py-8 rounded-[2rem]"
         >
            Initialize Diagnostic Packet
         </button>
      </section>

      {/* Minimal Footer */}
      <footer className="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30 text-[9px] font-black uppercase tracking-widest px-4 border-t-2 border-primary/5">
          <p>AspireSense Diagnostics • Global Tier-1 Node</p>
          <div className="flex gap-10">
             <a href="#" className="hover:text-primary">HIPAA Protocol</a>
             <a href="#" className="hover:text-primary">Medical Compliance</a>
             <a href="#" className="hover:text-primary">Secure Kernel v4.2</a>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;
