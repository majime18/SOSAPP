import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle } from 'lucide-react';

export function FloatingSOSButton() {
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={isRecording ? handleStopRecording : handleTap}
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
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>
            {isRecording 
              ? 'Recording Active - Triple tap to stop' 
              : tapCount > 0 
                ? `${tapCount}/3 taps to activate S.O.S` 
                : 'Triple tap to activate S.O.S'
            }
          </p>
        </TooltipContent>
      </Tooltip>
      
      {isListening && (
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}