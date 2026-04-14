import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, StopCircle, RefreshCw, CheckCircle2, Waves, Activity, ShieldCheck, Play } from 'lucide-react';

interface AudioCaptureProps {
  onComplete: (blob: Blob) => void;
}

const AudioCapture = ({ onComplete }: AudioCaptureProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(50).fill(0));

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      // Audio visualizer setup
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      source.connect(analyser);

      const updateLevels = () => {
        if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((p, c) => p + c, 0) / bufferLength;
        setAudioLevels(prev => [...prev.slice(1), average]);
        requestAnimationFrame(updateLevels);
      };
      updateLevels();

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setCapturedBlob(blob);
        onComplete(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setTimeLeft(60);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (recording && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      stopRecording();
    }
    return () => clearInterval(timer);
  }, [recording, timeLeft]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-6">
         <div className="space-y-4 text-center md:text-left">
            <h3 className="text-4xl font-black text-foreground tracking-tighter flex items-center justify-center md:justify-start gap-4">
               <Mic className="text-primary w-10 h-10" />
               Acoustic Rhythm Sync
            </h3>
            <p className="text-muted-foreground font-semibold text-sm flex items-center justify-center md:justify-start gap-3">
               <ShieldCheck className="w-5 h-5 text-accent" />
               Spectral Prosody Assessment Active
            </p>
         </div>
         {recording && (
            <div className="bg-primary px-10 py-5 rounded-[2.5rem] flex items-center gap-6 shadow-[0_20px_60px_-10px_rgba(13,148,136,0.3)]">
               <Waves className="w-6 h-6 text-white animate-pulse" />
               <span className="text-3xl font-black text-white tracking-tighter tabular-nums">0:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
         )}
      </div>

      <div className="h-64 glass-card-premium bg-white/50 backdrop-blur-3xl p-12 flex items-center justify-center relative group overflow-hidden border-2 border-primary/10">
         <div className="flex items-center gap-2 h-full w-full justify-center">
            {audioLevels.map((level, i) => (
               <motion.div
                  key={i}
                  animate={{ 
                    height: recording ? `${Math.max(4, level / 1.5)}%` : '4px',
                    backgroundColor: recording ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
                  }}
                  className="w-2 rounded-full shadow-[0_0_15px_rgba(13,148,136,0.2)]"
                  style={{ opacity: 0.1 + (i / 50) * 0.9 }}
               />
            ))}
         </div>
         <AnimatePresence>
            {!recording && !capturedBlob && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm"
               >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl relative mb-6">
                     <Play className="text-white w-8 h-8 fill-current ml-1" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Awaiting Voice Baseline</p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-10">
        {!capturedBlob ? (
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`btn-premium px-20 py-10 text-xl font-black shadow-2xl ${recording ? 'bg-red-500 text-white shadow-red-200' : 'btn-primary-premium shadow-primary/40'}`}
          >
            {recording ? (
               <span className="flex items-center gap-4">
                  <StopCircle className="w-8 h-8" />
                  End Sync
               </span>
            ) : (
               <span className="flex items-center gap-4">
                  <Mic className="w-8 h-8" />
                  Initialize Pulse
               </span>
            )}
          </button>
        ) : (
          <div className="space-y-10 flex flex-col items-center">
             <div className="flex items-center gap-8 p-8 bg-accent/10 border-2 border-accent/20 rounded-[3rem] shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg">
                   <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-left">
                   <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-1">Acoustic Trace Logged</p>
                   <p className="text-2xl font-black text-foreground tracking-tight">Spectral Harvest Finalized</p>
                </div>
             </div>
             <button
               onClick={() => setCapturedBlob(null)}
               className="btn-secondary-premium flex items-center gap-3 px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em]"
             >
               <RefreshCw className="w-5 h-5" />
               Re-initialize Protocol
             </button>
          </div>
        )}
        
        <div className="max-w-xl p-8 bg-secondary/50 rounded-[2.5rem] border border-primary/10 flex items-center gap-6">
           <Activity className="w-10 h-10 text-primary" />
           <p className="text-left text-sm font-bold text-muted-foreground leading-relaxed italic">
              "System ready. Speak clearly for 60 seconds regarding your daily flow. Neural prosody models will capture rhythmicity and tonal spectrum."
           </p>
        </div>
      </div>
    </div>
  );
};

export default AudioCapture;
