import "./DetectMudra.css";
import { useRef, useState } from "react";
import {
  initializeHandDetector,
  detectHand,
  HAND_CONNECTIONS,
} from "../ai/handDetector";
import { mudraData } from "../ai/mudraData";
import { detectPataka } from "../ai/mudraClassifier";

function DetectMudra() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [detectedMudra, setDetectedMudra] = useState("No Mudra");
  const [confidence, setConfidence] = useState(0);

  const currentMudra = mudraData[detectedMudra] || {
    name: "No Mudra",
    meaning: "-",
    usage: "Show your hand clearly in front of the camera.",
  };

  // ----------------------------
  // Start Camera
  // ----------------------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const video = videoRef.current;
      video.srcObject = stream;

      await initializeHandDetector();

      setCameraOn(true);

      video.onloadeddata = () => {
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const detectFrame = async () => {
          if (!videoRef.current) return;

          const landmarks = detectHand(video);

          const ctx = canvas.getContext("2d");

          // Clear previous drawing
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (landmarks) {
            // ----------------------------
            // Draw Red Landmark Dots
            // ----------------------------
            ctx.fillStyle = "red";

            landmarks.forEach((point, index) => {
              const x = point.x * canvas.width;
              const y = point.y * canvas.height;

              ctx.beginPath();
              ctx.arc(x, y, 5, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = "yellow";
              ctx.font = "12px Arial";
              ctx.fillText(index, x + 8, y - 8);

              ctx.fillStyle = "red";
            });

            // ----------------------------
            // Draw Green Skeleton
            // ----------------------------
            ctx.strokeStyle = "lime";
            ctx.lineWidth = 2;

            HAND_CONNECTIONS.forEach(([start, end]) => {
              const startPoint = landmarks[start];
              const endPoint = landmarks[end];

              ctx.beginPath();

              ctx.moveTo(
                startPoint.x * canvas.width,
                startPoint.y * canvas.height
              );

              ctx.lineTo(
                endPoint.x * canvas.width,
                endPoint.y * canvas.height
              );

              ctx.stroke();
            });

            // ----------------------------
            // Detect Mudras
            // ----------------------------
            const isPataka = detectPataka(landmarks);

if (isPataka) {
  setDetectedMudra("Pataka");
  setConfidence(95);
} else {
  setDetectedMudra("No Mudra");
  setConfidence(0);
}
          } else {
            // ----------------------------
            // No Hand Detected
            // ----------------------------
            setDetectedMudra("No Mudra");
            setConfidence(0);
          }

          animationRef.current = requestAnimationFrame(detectFrame);
        };

        detectFrame();
      };
    } catch (error) {
      alert("Unable to access camera.");
      console.error(error);
    }
  };

  // ----------------------------
  // Stop Camera
  // ----------------------------
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;

      stream.getTracks().forEach((track) => track.stop());

      videoRef.current.srcObject = null;
      videoRef.current.load();
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setCameraOn(false);
    setDetectedMudra("No Mudra");
    setConfidence(0);
  };

  return (
    <div className="detect-page">
      <h1>📷 Detect Bharatanatyam Mudra</h1>

      <div className="camera-box">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-video"
        />

        <canvas
          ref={canvasRef}
          className="camera-canvas"
        />
      </div>

      <button onClick={cameraOn ? stopCamera : startCamera}>
        {cameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      <div className="result-box">
        <h2>🎭 Prediction</h2>

        <p>
          <strong>Detected Mudra:</strong> {currentMudra.name}
        </p>

        <p>
          <strong>Meaning:</strong> {currentMudra.meaning}
        </p>

        <p>
          <strong>Usage:</strong> {currentMudra.usage}
        </p>

        <div className="confidence-section">
          <strong>Confidence:</strong>

          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>

          <p>{confidence}%</p>
        </div>
      </div>
    </div>
  );
}

export default DetectMudra;