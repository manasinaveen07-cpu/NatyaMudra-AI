// Small tolerance to avoid false detections
const TOLERANCE = 0.02;

// Checks whether a finger is extended.
function isFingerExtended(landmarks, mcp, pip, dip, tip) {
  return (
    landmarks[tip].y < landmarks[dip].y + TOLERANCE &&
    landmarks[dip].y < landmarks[pip].y + TOLERANCE &&
    landmarks[pip].y < landmarks[mcp].y + TOLERANCE
  );
}

// Distance between two landmarks
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;

  return Math.sqrt(dx * dx + dy * dy);
}

// Analyze the current hand pose.
export function analyzeHand(landmarks) {
  if (!landmarks || landmarks.length !== 21) {
    return {
      thumbExtended: false,
      indexExtended: false,
      middleExtended: false,
      ringExtended: false,
      littleExtended: false,
      thumbDistance: 0,
    };
  }

  // Thumb tip (4) to index MCP (5)
  const thumbDistance = getDistance(
    landmarks[4],
    landmarks[5]
  );

  return {
    // Thumb is considered extended if it is far away from the palm
    thumbExtended: thumbDistance > 0.12,

    thumbDistance,

    indexExtended: isFingerExtended(
      landmarks,
      5,
      6,
      7,
      8
    ),

    middleExtended: isFingerExtended(
      landmarks,
      9,
      10,
      11,
      12
    ),

    ringExtended: isFingerExtended(
      landmarks,
      13,
      14,
      15,
      16
    ),

    littleExtended: isFingerExtended(
      landmarks,
      17,
      18,
      19,
      20
    ),
  };
}