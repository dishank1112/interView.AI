"use client";
import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "../component/progressbar/page";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [nervousness, setNervousness] = useState<number | null>(null);
  const router = useRouter();


  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    setTimeout(()=>{
        startVideo();
    },2000)
  }, []);
   // well Hello there I am Jir
  // Placeholder function for voice-to-text and AI backend integration
  const handleStartInterview = () => {
    // Simulate voice transcription and backend call
    router.push("/interviewai")
  };

  useEffect(()=>{

  },[])

  // Placeholder function for facial recognition analysis
  const analyzeFacialExpressions = () => {
    // Simulate confidence and nervousness analysis
    setConfidence(Math.floor(Math.random() * 100));
    setNervousness(Math.floor(Math.random() * 100));
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-black text-white overflow-y-hidden overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-6 bg-slate-700 bg-opacity-30  rounded-2xl shadow-lg">
        {/* Left Side: AI Assistant Avatar with Subtitles */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center relative">
            {/* Placeholder for AI Assistant Avatar */}
            <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              AI
            </div>
            {/* AI Assistant Subtitle */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center text-lg text-gray-200 w-full">
              <div>{transcript || "Waiting for your input..."}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Video Feed and Analysis */}
        <div className="flex flex-col items-center space-y-6">
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

          {/* Confidence and Nervousness Display */}
          <div className="text-center">
            <p className="text-xl">
              <strong>Hello Harshit</strong> 
              <div className="text-sm">Start your interview......</div>
            </p>
          </div>

          {/* Start/Stop Buttons for Simulated Integration */}
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              onClick={handleStartInterview}
            >
              Start Interview
            </button>
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              onClick={() => {
                setTranscript("");
                setConfidence(null);
                setNervousness(null);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
