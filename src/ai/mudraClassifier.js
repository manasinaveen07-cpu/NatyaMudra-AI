import { analyzeHand } from "./fingerAnalyzer";

// Detects the Pataka mudra using analyzed hand features.
export function detectPataka(landmarks) {
  const hand = analyzeHand(landmarks);

  return (
    hand.indexExtended &&
    hand.middleExtended &&
    hand.ringExtended &&
    hand.littleExtended &&
    !hand.thumbExtended
  );
}