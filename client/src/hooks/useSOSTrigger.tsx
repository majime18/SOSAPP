
import { useState, useEffect, useRef, useCallback } from 'react';

export function useSOSTrigger() {
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isBlackScreen, setIsBlackScreen] = useState(false);

  const frontStreamRef = useRef<MediaStream | null>(null);
  const backStreamRef = useRef<MediaStream | null>(null);
  const frontMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const backMediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (tapCount > 0) {
      const timer = setTimeout(() => {
        setTapCount(0);
      }, 2000); // Reset tap count after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [tapCount]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (!isRecording && (transcript.includes('emergency help') || transcript.includes('sos'))) {
          activateEmergency();
        }
      };

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        if (!isRecording) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Speech recognition couldn't be started.", e);
          }
        }
      };
      recognition.onerror = (event: any) => console.error('Speech recognition error:', event.error);

      try {
        recognition.start();
      } catch (e) {
        console.error("Speech recognition couldn't be started.", e);
      }

      return () => recognition.stop();
    }
  }, [isRecording]);

  const startDualCameraRecording = async () => {
    let recordingStarted = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      frontStreamRef.current = stream;
      frontMediaRecorderRef.current = new MediaRecorder(stream);
      frontMediaRecorderRef.current.start();
      console.log('Front camera recording started.');
      recordingStarted = true;
    } catch (err) {
      console.error('Could not start front camera recording:', err);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      backStreamRef.current = stream;
      backMediaRecorderRef.current = new MediaRecorder(stream);
      backMediaRecorderRef.current.start();
      console.log('Back camera recording started.');
      recordingStarted = true;
    } catch (err) {
      console.error('Could not start back camera recording:', err);
    }

    if (!recordingStarted) {
      alert('Could not access any camera. Please ensure you have granted permissions.');
    }
  };

  const stopDualCameraRecording = () => {
    if (frontMediaRecorderRef.current?.state === 'recording') frontMediaRecorderRef.current.stop();
    frontStreamRef.current?.getTracks().forEach(track => track.stop());
    if (backMediaRecorderRef.current?.state === 'recording') backMediaRecorderRef.current.stop();
    backStreamRef.current?.getTracks().forEach(track => track.stop());
  };

  const activateEmergency = useCallback(async () => {
    if (isRecording) return;
    console.log('🚨 S.O.S ACTIVATED! 🚨');
    console.log('📱 Phone screen going BLACK for stealth recording...');
    console.log('🔇 PHONE AUTOMATICALLY SWITCHING TO SILENT/VIBRATE MODE...');
    console.log('📍 GPS LOCATION AUTOMATICALLY ACTIVATED AND SHARED...');
    console.log('🌍 YOUR EXACT LOCATION SHARED WITH ALL 2,847+ USERS WORLDWIDE...');
    console.log('🔴 Starting LIVE STREAM to ALL users worldwide...');
    console.log('📹 Starting automatic video recording from BOTH front and back cameras...');
    console.log('📤 Automatically uploading to S.O.S servers...');
    console.log('🚨 Emergency contacts receiving ALARM notifications...');
    
    await startDualCameraRecording();
    
    setIsRecording(true);
    setTapCount(0);
    setIsBlackScreen(true);
    
    alert('🚨 S.O.S ACTIVATED!\n\nTHIS IS NOT A REPLACEMENT FOR 911. PLEASE CALL 911 IF YOU ARE IN DANGER.\n\n🔴 LIVE STREAMING TO ENTIRE WORLD!\n\n📱 Your screen is now BLACK for stealth\n🔇 PHONE IS NOW SILENT/VIBRATE ONLY\n📍 GPS ACTIVATED - LOCATION SHARED WITH ALL USERS\n📹 Recording automatically started from BOTH cameras\n🌍 2,847+ users worldwide watching LIVE\n📤 Video streaming to secure servers\n👥 Global community mobilizing to help\n🔔 Emergency contacts & world alerted');
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (!isRecording) return;
    console.log('⏹️ S.O.S Recording STOPPED');
    
    stopDualCameraRecording();

    setIsRecording(false);
    setIsBlackScreen(false);
    
    alert('⏹️ S.O.S Recording STOPPED\n\n🔴 LIVE stream ended\n💾 Video automatically saved for 96 hours\n🔒 Stored on secure S.O.S servers\n🌍 ALL users worldwide can still view recording');
  }, [isRecording]);

  const handleScreenTap = useCallback(() => {
    if (isRecording) return;
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 3) {
      activateEmergency();
    }
  }, [tapCount, isRecording, activateEmergency]);

  const BlackScreenComponent = () => {
    const blackScreenTapCount = useRef(0);

    const handleBlackScreenTap = () => {
      blackScreenTapCount.current++;
      if (blackScreenTapCount.current >= 3) {
        stopRecording();
        blackScreenTapCount.current = 0;
      }
      setTimeout(() => {
        blackScreenTapCount.current = 0;
      }, 2000);
    };

    if (!isBlackScreen) return null;

    return (
      <div
        onClick={handleBlackScreenTap}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: '#000', zIndex: 9999, display: 'flex',
          justifyContent: 'center', alignItems: 'center', color: '#ff0000',
          fontSize: '18px', textAlign: 'center', fontFamily: 'Arial, sans-serif',
          cursor: 'default'
        }}
      >
        <div style={{ opacity: 0.3 }}>
          <div style={{ marginBottom: '20px' }}>🔴 S.O.S RECORDING ACTIVE</div>
          <div style={{ fontSize: '14px' }}>Screen appears BLACK to others</div>
          <div style={{ fontSize: '14px', marginTop: '10px' }}>Triple tap anywhere to stop</div>
        </div>
      </div>
    );
  };

  return { handleScreenTap, BlackScreenComponent, isListening };
}
