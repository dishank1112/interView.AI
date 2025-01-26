"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../component/simplebutton/Button";
import ProgressBar from "../component/progressbar/page";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";

// Check for browser support for SpeechRecognition

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [nervousness, setNervousness] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [timer, setTimer] = useState<number>(45 * 60); // 45 minutes in seconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Start video stream for facial recognition
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    startVideo();
  }, []);

  // Speech Recognition Setup (only run once on component mount)
  useEffect(() => {
    const setupRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        const recognitionInstance = new window.webkitSpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: any) => {
          const lastResult = event.results[event.results.length - 1][0];
          setTranscript(lastResult.transcript); // Update transcript based on speech input
        };

        setRecognition(recognitionInstance);
      }
    };

    setupRecognition();

    return () => {
      // Cleanup recognition instance if component unmounts
      if (recognition) {
        recognition.stop();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Start the speech recognition
  const startRecording = () => {
    setTimeout(() => {
      if (recognition) {
        recognition.start();
        setIsRecording(true);
      }
    }, 1000);
  };

  // Stop the speech recognition
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  // Toggle recording state
  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Placeholder function for facial recognition analysis
  const analyzeFacialExpressions = () => {
    // Simulate confidence and nervousness analysis
    setConfidence(Math.floor(Math.random() * 100));
    setNervousness(Math.floor(Math.random() * 100));
  };

  // Start the timer
  const startTimer = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(id); // Stop the timer
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      startTimer();
      startRecording();
      console.log("d");
    }, 3000);
  }, []);

  // Stop video and reset data
  const handleEndSession = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop()); // Stop all tracks of the stream
    }
    setTranscript("");
    setConfidence(null);
    setNervousness(null);
    setTimer(45 * 60); // Reset timer to 45 minutes
    if (intervalId) {
      clearInterval(intervalId); // Stop the timer
    }
    setIntervalId(null);
  };

  // Format the time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-black text-white overflow-y-hidden overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  w-full max-w-full p-6 bg-slate-700 bg-opacity-30 rounded-2xl shadow-lg">
        {/* Left Side: AI Assistant Avatar with Subtitles */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center relative">
            {/* Placeholder for AI Assistant Avatar */}
            <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              AI
            </div>
            {/* AI Assistant Subtitle */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center text-lg text-gray-200 w-full">
              <p>{transcript || "Waiting for your input..."}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Video Feed and Analysis */}
        <div className="flex flex-col items-center space-y-6">
          {/* Timer */}
          <div className="text-center text-2xl text-white">
            <p>Session Time: {formatTime(timer)}</p>
          </div>

          {/* Video Feed Section */}
          <div className="flex justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-72 h-72 rounded-lg border border-slate-700"
              onPlay={analyzeFacialExpressions} // Trigger analysis when the video starts
            ></video>
          </div>

          <div className="flex flex-col w-screen items-center">
            <div className="text-sm flex flex-row w-1/5 gap-3">
              <strong>Confidence:</strong> <ProgressBar percentage={confidence} color="red" />
            </div>
            <div className="text-sm flex flex-row w-1/5 gap-3">
              <strong>Nervousness:</strong> <ProgressBar percentage={nervousness} color="green" />
            </div>
          </div>

          {/* Spoken Text Display */}
          <div className="text-center mt-4">
            <p className="text-xl">
              {transcript || ".............."}
            </p>
          </div>
          <div className="flex flex-row gap-3">
      {/* Mic Button */}
      <div className="flex justify-center gap-4 mt-6">
        <div
          className={`text-4xl flex justify-center items-center mb-2 p-3 rounded-full transition-colors duration-300 ${
            isRecording ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'
          }`}
          onClick={handleToggleRecording} // Toggle mic recording state
        >
          {isRecording ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </div>
      </div>

      {/* End Session Button */}
      <div className="flex justify-center mt-7 p-2">
        <Button text="End Session" onClick={handleEndSession} href={""} color="red" />
      </div>
    </div>

   </div>
      </div>
    </div>
  );
}
