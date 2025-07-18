import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function FloatingSOSButton() {
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
    console.log('S.O.S ACTIVATED!');
    setIsRecording(true);
    setTapCount(0);
    
    // Simulate emergency activation
    // In a real app, this would:
    // 1. Start video recording with black screen
    // 2. Enable GPS tracking
    // 3. Send notifications to emergency contacts
    // 4. Alert community members
    // 5. Switch phone to vibrate mode
    
    // For demo, show alert
    alert('S.O.S ACTIVATED! Emergency services and contacts have been notified.');
    
    // Auto-stop after demo (in real app, user would triple-tap again to stop)
    setTimeout(() => {
      setIsRecording(false);
    }, 5000);
  };

  const handleStopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      alert('S.O.S Recording stopped. Video saved for 96 hours.');
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const getTooltipText = () => {
    if (isRecording) {
      return 'Recording Active - Triple tap to stop';
    } else if (tapCount > 0) {
      return `${tapCount}/3 taps to activate S.O.S`;
    } else {
      return 'Triple tap to activate S.O.S';
    }
  };

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
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap">
            {getTooltipText()}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
          </div>
        )}
      </div>
      
      {isListening && (
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}