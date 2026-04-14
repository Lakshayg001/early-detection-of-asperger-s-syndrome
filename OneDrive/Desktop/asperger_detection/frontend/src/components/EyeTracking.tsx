import { useEffect, useRef, useState } from 'react';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    webgazer: any;
  }
}

const EyeTracking = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [calibrationPoints, setCalibrationPoints] = useState(0);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const gazeDataRef = useRef<any[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (window.webgazer) {
        try {
          window.webgazer.end();
          const wgElements = ['webgazerVideoContainer', 'webgazerVideoFeed', 'webgazerFaceOverlay', 'webgazerFaceFeedbackBox', 'webgazerGazeDot'];
          wgElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
          });
        } catch (e) {
          console.error("WebGazer cleanup error:", e);
        }
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const startCalibration = () => {
    if (!window.webgazer) return;
    
    window.webgazer.setGazeListener((data: any, elapsedTime: number) => {
      if (data == null) return;
      if (isCalibrated) {
        gazeDataRef.current.push({ x: data.x, y: data.y, t: elapsedTime });
      }
    }).begin();
    
    window.webgazer.showVideoPreview(true)
      .showPredictionPoints(true)
      .applyKalmanFilter(true);
  };

  const handlePointClick = () => {
    if (isCalibrated || isRecording) return;
    
    setCalibrationPoints(prev => {
      const next = prev + 1;
      if (next >= 9) {
        setIsCalibrated(true);
        setIsRecording(true);
        
        let timeLeft = 5;
        const interval = setInterval(() => {
          timeLeft -= 1;
          setCountdown(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(interval);
            setIsRecording(false);
            if (window.webgazer) {
              window.webgazer.showVideoPreview(false).showPredictionPoints(false);
              window.webgazer.pause();
            }
            onComplete(gazeDataRef.current);
          }
        }, 1000);
      }
      return next;
    });
  };

  if (!isScriptLoaded) return <div className="text-center py-32 text-primary font-black uppercase tracking-[0.4em] animate-pulse">Syncing Ocular Engine...</div>;

  return (
    <div className="relative min-h-[450px] flex flex-col items-center justify-center py-10 w-full">
      <style>{`
        #webgazerVideoContainer { 
          z-index: 20 !important; 
          border: 8px solid #ffffff !important;
          border-radius: 40px !important;
          overflow: hidden !important;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.2) !important;
        }
        #webgazerGazeDot { 
          z-index: 100 !important; 
          background-color: #0d9488 !important;
          width: 30px !important;
          height: 30px !important;
          box-shadow: 0 0 30px rgba(13, 148, 136, 0.8) !important;
          border: 4px solid white !important;
        }
      `}</style>

      {!isCalibrated ? (
        <div className="text-center space-y-10 max-w-lg">
          <div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter mb-4">Ocular Protocol</h2>
            <p className="text-muted-foreground font-bold text-sm leading-relaxed px-10">
              Synchronize the neural gaze tracking system by interacting with the targets as they manifest on the grid.
            </p>
          </div>

          {!window.webgazer?.isReady() && (
            <button onClick={startCalibration} className="btn-primary-premium px-12 py-6 shadow-2xl shadow-primary/30 text-[10px] font-black uppercase tracking-[0.3em]">
              Initialize Ocular Link
            </button>
          )}

          {window.webgazer?.isReady() && (
            <div className="grid grid-cols-3 gap-12 mt-12 p-8 bg-muted/30 rounded-[3rem] border-2 border-primary/5 shadow-inner">
              {[...Array(9)].map((_, i) => (
                <button
                  key={i}
                  onClick={handlePointClick}
                  disabled={i !== calibrationPoints}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 ${
                    i < calibrationPoints 
                      ? 'bg-accent border-accent text-white shadow-lg' 
                      : i === calibrationPoints
                        ? 'bg-white border-primary shadow-2xl shadow-primary/30 animate-pulse text-primary'
                        : 'bg-white/50 border-muted opacity-20 text-muted-foreground'
                  }`}
                  style={{ 
                    visibility: i <= calibrationPoints ? 'visible' : 'hidden',
                  }}
                >
                  {i < calibrationPoints ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-7 h-7" />}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-12 p-16 rounded-[4rem] bg-white border-4 border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
          <div className="relative w-40 h-40 mx-auto">
            <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${isRecording ? 'bg-primary/20' : 'bg-accent/20'}`} />
            <div className={`relative w-full h-full rounded-full flex items-center justify-center border-8 transition-all duration-700 ${isRecording ? 'bg-white border-primary shadow-2xl' : 'bg-white border-accent shadow-2xl'}`}>
              {isRecording ? (
                 <div className="text-6xl font-black text-foreground tracking-tighter tabular-nums">{countdown}</div>
              ) : (
                 <CheckCircle2 className="w-16 h-16 text-accent" />
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">
              {isRecording ? 'Capturing Gaze Vectors...' : 'Mapping Verified'}
            </h2>
            <p className="text-muted-foreground font-bold text-lg max-w-xs mx-auto leading-relaxed">
              {isRecording 
                ? 'Observation active. Focus on the central marker as the AI extracts ocular foveal latency.' 
                : 'Protocol success. Behavioral synchronization has been achieved.'}
            </p>
          </div>
        </div>
      )}
      
      {!isCalibrated && (
        <div className="mt-16 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground bg-white/50 shadow-sm px-8 py-4 rounded-full border border-primary/5">
          <AlertCircle className="w-5 h-5 text-primary" />
          Protocol Verification: Neutral Positioning Recommended
        </div>
      )}
    </div>
  );
};

export default EyeTracking;
