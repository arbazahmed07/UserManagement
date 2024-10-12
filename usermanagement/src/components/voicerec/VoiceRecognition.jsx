import React, { useState, useEffect } from 'react';

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
        console.log("Transcript received:", currentTranscript);
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      speechRecognition.onstart = () => {
        console.log("Speech recognition started");
      };

      speechRecognition.onend = () => {
        console.log("Speech recognition ended");
        if (isListening) {
          speechRecognition.start();  // Auto-restart if still listening
        }
      };

      setRecognition(speechRecognition);
    } else {
      alert('Speech Recognition API is not supported in this browser.');
    }
  }, []);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceRecognition;
