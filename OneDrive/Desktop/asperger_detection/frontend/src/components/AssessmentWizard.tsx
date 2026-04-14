import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   CheckCircle2, ShieldAlert,
   Activity, Brain, ShieldCheck, Zap,
   User, Terminal, Sparkles, ArrowLeft, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { questionnaires } from '../services/questionnaires';
import VideoCapture from './VideoCapture';
import EyeTracking from './EyeTracking';
import AudioCapture from './AudioCapture';

const steps = [
   { name: 'Identity', icon: User, desc: 'Demographic Attribution' },
   { name: 'Spectrum Survey', icon: Terminal, desc: 'Behavioral Quantification' },
   { name: 'Ocular Trace', icon: Zap, desc: 'Gaze Heatmap Synthesis' },
   { name: 'Acoustic Pulse', icon: Activity, desc: 'Prosody Synchronization' }
];

const AssessmentWizard = () => {
   const navigate = useNavigate();
   const [currentStep, setCurrentStep] = useState(0);
   const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: '',
      familyHistory: false,
      jaundice: false,
      responses: {} as Record<string, string>,
      videoBlob: null as Blob | null,
      gazeData: null as any,
      audioBlob: null as Blob | null,
      videoFilename: null as string | null,
      audioFilename: null as string | null
   });
   const [isAnalyzing, setIsAnalyzing] = useState(false);
   const [analysisStep, setAnalysisStep] = useState('');

   const activeQuestionnaire = useMemo(() => {
      const age = parseInt(formData.age);
      if (isNaN(age)) return null;
      if (age <= 3) return questionnaires.toddler;
      if (age <= 17) return questionnaires.child;
      return questionnaires.adult;
   }, [formData.age]);

   const nextStep = async () => {
      if (currentStep === 0 && !activeQuestionnaire) {
         alert("Please enter a valid age.");
         return;
      }
      if (currentStep === steps.length - 1) {
         await handleSubmit();
      } else {
         setCurrentStep((prev) => prev + 1);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const handleSubmit = async () => {
      setIsAnalyzing(true);
      const analysisPhases = [
         'Normalizing Multi-Modal Bias...',
         'Synthesizing Ocular Latency Hubs...',
         'Analyzing Spectral Prosody Harmonics...',
         'Generating Clinical Inference...'
      ];

      for (const phase of analysisPhases) {
         setAnalysisStep(phase);
         await new Promise(r => setTimeout(r, 1200));
      }

      try {
         const response = await fetch('http://localhost:8000/api/assessment/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: formData.name,
               age: parseInt(formData.age),
               gender: formData.gender,
               familyHistory: formData.familyHistory,
               jaundice: formData.jaundice,
               responses: formData.responses,
               gazeData: formData.gazeData,
               video_filename: formData.videoFilename,
               audio_filename: formData.audioFilename
            })
         });
         const data = await response.json();
         setIsAnalyzing(false);
         navigate('/dashboard', { state: { results: data.results } });
      } catch (err) {
         console.error("Submission error:", err);
         setIsAnalyzing(false);
         navigate('/dashboard');
      }
   };

   return (
      <div className="space-y-32">

         {/* Refined Header Pod */}
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-primary text-[9px] font-black uppercase tracking-[0.3em] shadow-sm">
                     Active Session
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                     <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Protocol Lock</span>
                  </div>
               </div>
               <h1 className="text-6xl font-black tracking-tighter text-foreground leading-none">
                  Diagnostic <span className="text-gradient-premium">Sequence.</span>
               </h1>
            </div>

            <div className="glass-card-premium p-6 flex items-center gap-5 border-4 border-white bg-white/40">
               <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-2xl">
                  <Brain className="text-white w-6 h-6" />
               </div>
               <div className="text-left">
                  <p className="text-[8px] font-black text-primary/40 uppercase tracking-[0.4em]">Subject</p>
                  <h2 className="text-lg font-black text-foreground tracking-tight leading-none">{formData.name || 'Awaiting Initial'}</h2>
               </div>
            </div>
         </header>

         {/* Industrial Stepper Matrix */}
         <div className="relative px-6">
            <div className="relative flex justify-between z-10">
               {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const StepIcon = step.icon;

                  return (
                     <div key={step.name} className="flex flex-col items-center flex-1">
                        <motion.div
                           animate={{
                              scale: isActive ? 1.15 : 1,
                              backgroundColor: isActive || isCompleted ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                              color: isActive || isCompleted ? '#ffffff' : 'hsl(var(--muted-foreground))',
                           }}
                           className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-700 shadow-xl ${isActive || isCompleted ? 'border-primary' : 'border-muted'
                              }`}
                        >
                           {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <StepIcon className="w-7 h-7" />}
                        </motion.div>
                        <div className="mt-8 text-center space-y-1">
                           <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-primary' : 'text-muted-foreground opacity-40'}`}>{step.name}</p>
                           {isActive && <div className="w-1 h-1 bg-primary rounded-full mx-auto" />}
                        </div>
                     </div>
                  );
               })}
            </div>
            <div className="absolute top-7 md:top-8 left-0 right-0 h-1 bg-muted -z-0 rounded-full overflow-hidden mx-24">
               <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: "circOut" }}
               />
            </div>
         </div>

         {/* Main Content Matrix */}
         <main className="min-h-[600px] relative">
            <AnimatePresence mode="wait">
               <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
               >
                  {currentStep === 0 && (
                     <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Demographic Pods */}
                        <div className="glass-card-premium p-10 bg-white border-4 border-white space-y-10">
                           <h2 className="text-3xl font-black text-foreground tracking-tighter">Identity Attribution</h2>
                           <div className="space-y-8">
                              <div className="space-y-3">
                                 <label className="text-[9px] font-black text-primary/40 uppercase tracking-[0.4em]">Full Name</label>
                                 <input
                                    type="text"
                                    placeholder="Lakshay Goel..."
                                    className="w-full bg-muted/20 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-6 py-4 text-lg font-bold outline-none transition-all shadow-inner"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                 />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-3">
                                    <label className="text-[9px] font-black text-primary/40 uppercase tracking-[0.4em]">Age</label>
                                    <input
                                       type="number"
                                       className="w-full bg-muted/20 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-6 py-4 text-lg font-bold outline-none transition-all shadow-inner"
                                       value={formData.age}
                                       onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[9px] font-black text-primary/40 uppercase tracking-[0.4em]">Biological Sex</label>
                                    <select
                                       className="w-full bg-muted/20 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-6 py-4 text-lg font-bold outline-none transition-all shadow-inner"
                                       value={formData.gender}
                                       onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                       <option value="">Select</option>
                                       <option value="male">Male</option>
                                       <option value="female">Female</option>
                                       <option value="other">Other</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Marker Pods */}
                        <div className="space-y-8">
                           {[
                              { key: 'familyHistory', title: 'Genetic History', icon: ShieldAlert, desc: 'Known spectrum markers in pedigree.' },
                              { key: 'jaundice', title: 'Neonatal Status', icon: Activity, desc: 'History of neonatal jaundice exposure.' }
                           ].map((marker) => (
                              <div
                                 key={marker.key}
                                 onClick={() => setFormData({ ...formData, [marker.key]: !formData[marker.key] as any })}
                                 className={`p-8 rounded-[2.5rem] border-4 transition-all duration-300 cursor-pointer flex items-center justify-between group ${formData[marker.key as keyof typeof formData]
                                       ? `bg-white border-primary shadow-2xl`
                                       : 'bg-white/40 border-white hover:border-primary/20'
                                    }`}
                              >
                                 <div className="flex items-center gap-6 text-left">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData[marker.key as keyof typeof formData] ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-muted text-muted-foreground'
                                       }`}>
                                       <marker.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                       <h4 className="text-xl font-black text-foreground tracking-tight">{marker.title}</h4>
                                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{marker.desc}</p>
                                    </div>
                                 </div>
                                 <div className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${formData[marker.key as keyof typeof formData] ? 'bg-primary border-primary text-white' : 'border-muted'
                                    }`}>
                                    {formData[marker.key as keyof typeof formData] && <CheckCircle2 className="w-4 h-4" />}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {currentStep === 1 && activeQuestionnaire && (
                     <div className="grid md:grid-cols-2 gap-8 items-start">
                        {activeQuestionnaire.questions.map((q, idx) => (
                           <div key={q.id} className="p-10 glass-card-premium bg-white border-4 border-white space-y-8 text-left h-full flex flex-col justify-between">
                              <div className="space-y-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black">
                                       {idx + 1}
                                    </div>
                                    <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.4em]">Behavioral Marker</span>
                                 </div>
                                 <p className="text-2xl font-black text-foreground tracking-tighter leading-tight">
                                    {q.text}
                                 </p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                 {['Definitely Agree', 'Slightly Agree', 'Slightly Disagree', 'Definitely Disagree'].map((option) => (
                                    <button
                                       key={option}
                                       onClick={() => setFormData({ ...formData, responses: { ...formData.responses, [q.id]: option } })}
                                       className={`px-4 py-6 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border-2 ${formData.responses[q.id] === option
                                             ? 'bg-primary border-primary text-white shadow-lg'
                                             : 'bg-muted/50 border-transparent text-muted-foreground hover:border-primary/20'
                                          }`}
                                    >
                                       {option}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {(currentStep === 2 || currentStep === 3) && (
                     <div className="glass-card-premium p-16 bg-white border-4 border-white flex flex-col items-center text-center space-y-12">
                        <div className="space-y-4">
                           <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
                              <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                           </div>
                           <h2 className="text-4xl font-black text-gradient-premium tracking-tighter">Biometric Sync</h2>
                        </div>
                        <div className="w-full max-w-4xl p-6 bg-muted/20 border-4 border-dashed border-primary/5 rounded-[3rem]">
                           {currentStep === 2 ? (
                              <EyeTracking onComplete={(data) => setFormData({ ...formData, gazeData: data })} />
                           ) : (
                              <AudioCapture onComplete={async (blob) => {
                                 const audioData = new FormData();
                                 audioData.append('file', blob);
                                 const res = await fetch('http://localhost:8000/api/assessment/upload-media', { method: 'POST', body: audioData });
                                 const data = await res.json();
                                 setFormData({ ...formData, audioBlob: blob, audioFilename: data.filename });
                              }} />
                           )}
                        </div>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </main>

         {/* Tactile Controls */}
         <footer className="flex justify-between items-center bg-white/40 p-5 rounded-[2.5rem] border-4 border-white shadow-2xl backdrop-blur-xl">
            <button
               onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
               disabled={currentStep === 0}
               className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all px-10 py-5 rounded-2xl ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
            >
               <ArrowLeft className="w-5 h-5" />
               Previous
            </button>

            <div className="hidden md:block h-2 w-32 bg-muted rounded-full overflow-hidden">
               <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
               />
            </div>

            <button
               onClick={nextStep}
               className="btn-primary-premium flex items-center gap-4 px-12 py-5 shadow-2xl shadow-primary/20"
            >
               <span className="text-[10px] font-black uppercase tracking-widest">
                  {currentStep === steps.length - 1 ? 'Analyze Pack' : 'Next Protocol'}
               </span>
               <ArrowRight className="w-5 h-5" />
            </button>
         </footer>

         {/* Minimal Analysis Modal */}
         <AnimatePresence>
            {isAnalyzing && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center"
               >
                  <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
                     <motion.div
                        animate={{ rotate: 360, borderRadius: ["30%", "50%", "30%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-primary/20 shadow-2xl"
                     />
                     <Brain className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                  <div className="text-center space-y-6">
                     <h2 className="text-4xl font-black tracking-tighter text-foreground">Extracting Intelligence</h2>
                     <p className="text-primary font-black text-[9px] uppercase tracking-[0.4em] bg-primary/5 px-6 py-2 rounded-lg border border-primary/10">{analysisStep}</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default AssessmentWizard;
