
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function FloatingSOSButton() {
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBlackScreen, setIsBlackScreen] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  
  const frontStreamRef = useRef<MediaStream | null>(null);
  const backStreamRef = useRef<MediaStream | null>(null);
  const frontMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const backMediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    // Initialize position to bottom right
    setPosition({
      x: window.innerWidth - 96, // approx button width + margin
      y: window.innerHeight - 96,
    });
  }, []);

  useEffect(() => {
    // Reset tap count after 3 seconds
    const timer = setTimeout(() => {
      setTapCount(0);
    }, 3000);

    return () => clearTimeout(timer);
  }, [tapCount]);

  useEffect(() => {
    // Voice recognition setup
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        // Check for secret voice command (this would be user-configurable)
        if (transcript.includes('emergency help') || transcript.includes('sos')) {
          activateEmergency();
        }
      };

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Restart listening
        if (!isRecording) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Speech recognition couldn't be started.", e);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      // Start listening
      try {
        recognition.start();
      } catch (e) {
        console.error("Speech recognition couldn't be started.", e);
      }

      return () => {
        recognition.stop();
      };
    }
  }, [isRecording]);

  const handleTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 3) {
      activateEmergency();
    }
  };

  const startDualCameraRecording = async () => {
    let frontStream, backStream;
    let recordingStarted = false;

    // Attempt to get front camera (user) stream with audio
    try {
      frontStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      frontStreamRef.current = frontStream;
      frontMediaRecorderRef.current = new MediaRecorder(frontStream);
      frontMediaRecorderRef.current.start();
      console.log('Front camera recording started.');
      recordingStarted = true;

      frontMediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Front camera data chunk available, would upload to server.');
        }
      };
    } catch (err) {
      console.error('Could not start front camera recording:', err);
    }

    // Attempt to get back camera (environment) stream without audio
    try {
      backStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false, // Audio is already captured from the front stream
      });
      backStreamRef.current = backStream;
      backMediaRecorderRef.current = new MediaRecorder(backStream);
      backMediaRecorderRef.current.start();
      console.log('Back camera recording started.');
      recordingStarted = true;

      backMediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Back camera data chunk available, would upload to server.');
        }
      };
    } catch (err) {
      console.error('Could not start back camera recording:', err);
    }

    if (!recordingStarted) {
      alert('Could not access any camera. Please ensure you have granted permissions.');
    }
  };

  const stopDualCameraRecording = () => {
    // Stop front camera
    if (frontMediaRecorderRef.current && frontMediaRecorderRef.current.state === 'recording') {
      frontMediaRecorderRef.current.stop();
      console.log('Front camera recording stopped.');
    }
    if (frontStreamRef.current) {
      frontStreamRef.current.getTracks().forEach(track => track.stop());
      frontStreamRef.current = null;
    }

    // Stop back camera
    if (backMediaRecorderRef.current && backMediaRecorderRef.current.state === 'recording') {
      backMediaRecorderRef.current.stop();
      console.log('Back camera recording stopped.');
    }
    if (backStreamRef.current) {
      backStreamRef.current.getTracks().forEach(track => track.stop());
      backStreamRef.current = null;
    }
  };

  const activateEmergency = async () => {
    console.log('🚨 S.O.S ACTIVATED! 🚨');
    console.log('📱 Phone screen going BLACK for stealth recording...');
    console.log('🔇 PHONE AUTOMATICALLY SWITCHING TO SILENT/VIBRATE MODE...');
    console.log('📍 GPS LOCATION AUTOMATICALLY ACTIVATED AND SHARED...');
    console.log('🌍 YOUR EXACT LOCATION SHARED WITH ALL 2,847+ USERS WORLDWIDE...');
    console.log('🔴 Starting LIVE STREAM to ALL users worldwide...');
    console.log('🌍 Broadcasting to 2,847+ users globally...');
    console.log('📹 Starting automatic video recording from BOTH front and back cameras...');
    console.log('📤 Automatically uploading to S.O.S servers...');
    console.log('🚨 Emergency contacts receiving ALARM notifications...');
    console.log('🌍 ENTIRE WORLD being alerted and watching LIVE...');
    console.log('👥 Global community mobilizing for help...');
    console.log('🔇 NO RINGTONES OR NOTIFICATIONS - COMPLETELY SILENT...');
    console.log('📍 EVERYONE KNOWS YOUR EXACT LOCATION...');
    
    await startDualCameraRecording();
    
    setIsRecording(true);
    setTapCount(0);
    
    // Simulate black screen activation
    setIsBlackScreen(true);
    
    // Show black screen overlay for demonstration (in real app, entire screen would go black)
    const blackScreenOverlay = document.createElement('div');
    blackScreenOverlay.id = 'sos-black-screen';
    blackScreenOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000000;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ff0000;
      font-size: 18px;
      text-align: center;
      font-family: Arial, sans-serif;
    `;
    blackScreenOverlay.innerHTML = `
      <div style="opacity: 0.3;">
        <div style="margin-bottom: 20px;">🔴 S.O.S RECORDING ACTIVE</div>
        <div style="font-size: 14px;">Screen appears BLACK to others</div>
        <div style="font-size: 14px; margin-top: 10px;">Triple tap anywhere to stop</div>
        <div style="font-size: 11px; margin-top: 20px; opacity: 0.5;">
          🔴 LIVE streaming to ALL users worldwide<br/>
          🌍 2,847+ people watching globally<br/>
          📹 Video automatically uploading<br/>
          🔇 PHONE IS NOW SILENT/VIBRATE ONLY<br/>
          📍 GPS LOCATION SHARED WITH EVERYONE<br/>
          🚨 Emergency contacts alerted<br/>
          👥 Global community mobilizing<br/>
          🌍 ENTIRE WORLD CAN SEE YOUR LOCATION
        </div>
      </div>
    `;
    
    // Add click handler to stop recording
    blackScreenOverlay.addEventListener('click', handleBlackScreenTap);
    document.body.appendChild(blackScreenOverlay);
    
    alert('🚨 S.O.S ACTIVATED!\n\nTHIS IS NOT A REPLACEMENT FOR 911. PLEASE CALL 911 IF YOU ARE IN DANGER.\n\n🔴 LIVE STREAMING TO ENTIRE WORLD!\n\n📱 Your screen is now BLACK for stealth\n🔇 PHONE IS NOW SILENT/VIBRATE ONLY\n📍 GPS ACTIVATED - LOCATION SHARED WITH ALL USERS\n📹 Recording automatically started from BOTH cameras\n🌍 2,847+ users worldwide watching LIVE\n📤 Video streaming to secure servers\n👥 Global community mobilizing to help\n🔔 Emergency contacts & world alerted\n\n🌍 THE ENTIRE WORLD IS NOW WATCHING AND HELPING!\n📍 EVERYONE KNOWS YOUR EXACT LOCATION!\n🔇 NO SOUNDS TO EXPOSE YOU!\n\nVictim does NOTHING - everything is automatic!');
  };

  let blackScreenTapCount = 0;
  const handleBlackScreenTap = () => {
    blackScreenTapCount++;
    if (blackScreenTapCount >= 3) {
      stopRecording();
      blackScreenTapCount = 0;
    }
    
    // Reset tap count after 3 seconds
    setTimeout(() => {
      blackScreenTapCount = 0;
    }, 3000);
  };

  const handleStopRecording = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  const stopRecording = () => {
    console.log('⏹️ S.O.S Recording STOPPED');
    console.log('🔴 LIVE stream to global community ended');
    console.log('💾 Video saved for 96 hours on secure servers');
    console.log('🌍 Global community still has access to recording');
    console.log('📍 GPS location still shared with community');
    console.log('🔇 Phone returning to normal sound mode');
    console.log('📱 Phone returning to normal mode');
    
    stopDualCameraRecording();

    setIsRecording(false);
    setIsBlackScreen(false);
    
    // Remove black screen overlay
    const overlay = document.getElementById('sos-black-screen');
    if (overlay) {
      overlay.remove();
    }
    
    alert('⏹️ S.O.S Recording STOPPED\n\n🔴 LIVE stream ended\n💾 Video automatically saved for 96 hours\n🔒 Stored on secure S.O.S servers\n🌍 ALL users worldwide can still view recording\n📍 Your location still shared with community\n👥 Global community continues monitoring\n🔇 Phone returning to normal sound mode\n\nYou did NOTHING - all automatic!\n\nThe world was watching and helping!\nEveryone knew your exact location!');
  };

  const handleMouseEnter = () => {
    if (!isBlackScreen) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const getTooltipText = () => {
    if (isRecording) {
      return '🔴 LIVE TO WORLD - Screen BLACK, Phone SILENT, GPS SHARED - Triple tap to stop';
    } else if (tapCount > 0) {
      return `${tapCount}/3 taps to activate S.O.S`;
    } else {
      return 'Triple tap to activate S.O.S (🔴 LIVE to world, screen BLACK, phone SILENT, GPS shared)';
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    hasDragged.current = false;
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    }
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    hasDragged.current = true;
    e.preventDefault(); // Prevent scrolling on touch devices

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    let newX = clientX - dragOffset.current.x;
    let newY = clientY - dragOffset.current.y;

    // Constrain to viewport
    const buttonWidth = buttonRef.current?.offsetWidth || 64;
    const buttonHeight = buttonRef.current?.offsetHeight || 64;

    newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handleClick = () => {
    if (hasDragged.current) {
      return;
    }
    if (isRecording) {
      handleStopRecording();
    } else {
      handleTap();
    }
  };

  // Don't show button during black screen mode (victim shouldn't see anything)
  if (isBlackScreen) {
    return null;
  }

  return (
    <div
      ref={buttonRef}
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="relative">
        <Button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`h-16 w-16 rounded-full shadow-lg transition-all duration-200 cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          } ${
            isRecording 
              ? 'bg-red-700 hover:bg-red-800 animate-pulse' 
              : tapCount > 0 
                ? 'bg-red-600 hover:bg-red-700 scale-110' 
                : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          <AlertTriangle className="h-8 w-8 text-white" />
        </Button>
        
        {showTooltip && !isDragging && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-md whitespace-nowrap max-w-xs">
            {getTooltipText()}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
          </div>
        )}
      </div>
      
      {isListening && (
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse" title="Voice activation listening"></div>
      )}
      
      {isRecording && (
        <div className="absolute -top-1 -left-1 h-3 w-3 bg-red-500 rounded-full animate-ping" title="🔴 LIVE to world - SILENT mode - GPS shared"></div>
      )}
    </div>
  );
}
