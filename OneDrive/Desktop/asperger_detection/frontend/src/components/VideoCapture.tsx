import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, StopCircle, RefreshCw, CheckCircle2, Video, AlertCircle, Play, ShieldCheck, Activity } from 'lucide-react';

interface VideoCaptureProps {
  onComplete: (blob: Blob, filename: string) => void;
}

const VideoCapture = ({ onComplete }: VideoCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      console.error("Camera error:", err);
    }
  }, []);

  const startRecording = () => {
    if (!stream) return;
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setCapturedBlob(blob);
      
      const formData = new FormData();
      formData.append('file', blob);
      const res = await fetch('http://localhost:8000/api/assessment/upload-media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      onComplete(blob, data.filename);
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
    setTimeLeft(60);
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

  useEffect(() => {
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [startCamera]);

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-12">
      <div className="flex justify-between items-end px-6">
         <div className="space-y-4 text-left">
            <h3 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
               <Video className="text-primary w-8 h-8" />
               Visual Biometrics Hub
            </h3>
            <p className="text-muted-foreground font-semibold text-sm flex items-center gap-3">
               <ShieldCheck className="w-5 h-5 text-accent" />
               High-Frequency Neural Trace Active
            </p>
         </div>
         {recording && (
            <div className="bg-primary/10 border-2 border-primary/20 rounded-[2rem] px-8 py-4 flex items-center gap-4 shadow-xl">
               <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
               <span className="text-2xl font-black text-foreground tracking-tighter tabular-nums">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
               <span className="text-[10px] font-black text-primary uppercase tracking-widest border-l border-primary/20 pl-4">Recording Active</span>
            </div>
         )}
      </div>

      <div className="relative group rounded-[3.5rem] overflow-hidden bg-muted border-8 border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className={`w-full aspect-[16/9] object-cover transition-opacity duration-700 ${recording ? 'opacity-100' : 'opacity-80'}`}
        />
        
        <AnimatePresence>
           {!recording && !capturedBlob && (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center"
              >
                 <div className="text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto shadow-2xl">
                       <Play className="text-primary w-10 h-10 fill-current" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-foreground p-4 bg-white/80 rounded-2xl backdrop-blur-md">Ready for Trace Sync</p>
                 </div>
              </motion.div>
           )}
        </AnimatePresence>

        {/* Scan line effect during recording */}
        {recording && (
           <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(13,148,136,0.8)] z-10"
           />
        )}
      </div>

      <div className="flex justify-center gap-8 pt-6">
        {!capturedBlob ? (
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`btn-premium px-16 py-8 text-lg ${recording ? 'bg-red-500 text-white shadow-red-200' : 'btn-primary-premium shadow-primary/30'}`}
          >
            {recording ? (
              <span className="flex items-center gap-4">
                 <StopCircle className="w-8 h-8" />
                 Terminate Trace
              </span>
            ) : (
              <span className="flex items-center gap-4">
                 <Camera className="w-8 h-8" />
                 Initialize Capture
              </span>
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-8">
             <div className="flex items-center gap-6 p-6 bg-accent/10 border-2 border-accent/20 rounded-[2.5rem] shadow-2xl">
                <CheckCircle2 className="w-12 h-12 text-accent" />
                <div className="text-left">
                   <p className="text-xs font-black text-accent uppercase tracking-widest">Trace Successful</p>
                   <p className="text-xl font-bold text-foreground">Multi-Modal Sync Finalized</p>
                </div>
             </div>
             <button
               onClick={() => { setCapturedBlob(null); startCamera(); }}
               className="btn-secondary-premium flex items-center gap-3 px-10 py-5 text-xs uppercase tracking-widest"
             >
               <RefreshCw className="w-5 h-5" />
               Repeat Capture
             </button>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 flex items-start gap-6 text-left group">
         <AlertCircle className="w-8 h-8 text-primary shrink-0 group-hover:scale-110 transition-transform" />
         <div className="space-y-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Protocol Advisory</p>
            <p className="text-sm font-bold text-muted-foreground leading-relaxed">Please ensure high-quality lighting and maintain ocular focus on the visual stimulus markers during the entire 60-second window.</p>
         </div>
      </div>
    </div>
  );
};

export default VideoCapture;
