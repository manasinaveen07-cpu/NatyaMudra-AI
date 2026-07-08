// Small tolerance to avoid false detections
const TOLERANCE = 0.005;

// Checks whether a finger is extended.
function isFingerExtended(landmarks, mcp, pip, dip, tip) {
  return (
    landmarks[tip].y < landmarks[dip].y + TOLERANCE &&
    landmarks[dip].y < landmarks[pip].y + TOLERANCE &&
    landmarks[pip].y < landmarks[mcp].y + TOLERANCE
  );
}

// Calculates distance between two landmarks
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;

  return Math.sqrt(dx * dx + dy * dy);
}

// Analyze the current hand pose
export function analyzeHand(landmarks) {
  // Safety check
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

  // Analyze fingers
  const indexExtended = isFingerExtended(
    landmarks,
    5,
    6,
    7,
    8
  );

  const middleExtended = isFingerExtended(
    landmarks,
    9,
    10,
    11,
    12
  );

  const ringExtended = isFingerExtended(
    landmarks,
    13,
    14,
    15,
    16
  );

  const littleExtended = isFingerExtended(
    landmarks,
    17,
    18,
    19,
    20
  );

  const thumbExtended = thumbDistance > 0.12;

  // Debug information
  console.log({
    thumbDistance: thumbDistance.toFixed(3),
    thumbExtended,
    indexExtended,
    middleExtended,
    ringExtended,
    littleExtended,
  });

  return {
    thumbExtended,
    thumbDistance,

    indexExtended,
    middleExtended,
    ringExtended,
    littleExtended,
  };
}