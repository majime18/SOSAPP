import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function FloatingSOSButton() {
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBlackScreen, setIsBlackScreen] = useState(false);

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
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
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
          recognition.start();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      // Start listening
      recognition.start();

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

  const activateEmergency = () => {
    console.log('🚨 S.O.S ACTIVATED! 🚨');
    console.log('📱 Phone screen going BLACK for stealth recording...');
    console.log('📹 Starting automatic video recording...');
    console.log('📍 GPS location tracking activated...');
    console.log('🔇 Phone switched to VIBRATE mode...');
    console.log('📤 Automatically uploading to S.O.S servers...');
    console.log('🚨 Emergency contacts receiving ALARM notifications...');
    console.log('🌍 Community members being alerted worldwide...');
    
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
      font-size: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
    `;
    blackScreenOverlay.innerHTML = `
      <div style="opacity: 0.3;">
        <div style="margin-bottom: 20px;">🔴 S.O.S RECORDING ACTIVE</div>
        <div style="font-size: 14px;">Screen appears BLACK to others</div>
        <div style="font-size: 14px; margin-top: 10px;">Triple tap anywhere to stop</div>
        <div style="font-size: 12px; margin-top: 20px; opacity: 0.5;">
          ✅ Video automatically uploading<br/>
          ✅ GPS location shared<br/>
          ✅ Emergency contacts alerted<br/>
          ✅ Community members notified
        </div>
      </div>
    `;
    
    // Add click handler to stop recording
    blackScreenOverlay.addEventListener('click', handleBlackScreenTap);
    document.body.appendChild(blackScreenOverlay);
    
    // In real app, this would:
    // 1. Turn entire screen black (not just overlay)
    // 2. Start background video recording
    // 3. Enable GPS tracking
    // 4. Switch phone to vibrate/silent mode
    // 5. Send notifications to emergency contacts with ALARM sound
    // 6. Alert community members worldwide
    // 7. Automatically upload video stream to S.O.S servers
    // 8. Start 96-hour countdown for video storage
    
    alert('🚨 S.O.S ACTIVATED!\n\n📱 Your screen is now BLACK for stealth\n📹 Recording automatically started\n📤 Video uploading to secure servers\n🔔 Emergency contacts & community alerted\n\nVictim does NOTHING - everything is automatic!');
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
    console.log('💾 Video saved for 96 hours on secure servers');
    console.log('📱 Phone returning to normal mode');
    
    setIsRecording(false);
    setIsBlackScreen(false);
    
    // Remove black screen overlay
    const overlay = document.getElementById('sos-black-screen');
    if (overlay) {
      overlay.remove();
    }
    
    alert('⏹️ S.O.S Recording STOPPED\n\n💾 Video automatically saved for 96 hours\n🔒 Stored on secure S.O.S servers\n👥 Community can view in dashboard\n\nYou did NOTHING - all automatic!');
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
      return 'RECORDING ACTIVE - Screen is BLACK - Triple tap to stop';
    } else if (tapCount > 0) {
      return `${tapCount}/3 taps to activate S.O.S`;
    } else {
      return 'Triple tap to activate S.O.S (screen goes BLACK, auto-records & uploads)';
    }
  };

  // Don't show button during black screen mode (victim shouldn't see anything)
  if (isBlackScreen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={isRecording ? handleStopRecording : handleTap}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`h-16 w-16 rounded-full shadow-lg transition-all duration-200 ${
            isRecording 
              ? 'bg-red-700 hover:bg-red-800 animate-pulse' 
              : tapCount > 0 
                ? 'bg-red-600 hover:bg-red-700 scale-110' 
                : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          <AlertTriangle className="h-8 w-8 text-white" />
        </Button>
        
        {showTooltip && (
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
        <div className="absolute -top-1 -left-1 h-3 w-3 bg-red-500 rounded-full animate-ping" title="Recording active"></div>
      )}
    </div>
  );
}