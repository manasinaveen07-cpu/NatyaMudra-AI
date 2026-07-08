import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

let handLandmarker = null;

export async function initializeHandDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });

  console.log("✅ Hand Detector Ready");
}

export function detectHand(video) {
  if (!handLandmarker) return;

  const results = handLandmarker.detectForVideo(
    video,
    performance.now()
  );

  if (results.landmarks.length > 0) {
  return results.landmarks[0];
}

return null;
}
// Hand Skeleton Connections
export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],      // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],      // Index
  [5, 9], [9, 10], [10, 11], [11, 12], // Middle
  [9, 13], [13, 14], [14, 15], [15, 16], // Ring
  [13, 17], [17, 18], [18, 19], [19, 20], // Little
  [0, 17], // Palm
];