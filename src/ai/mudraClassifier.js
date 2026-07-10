import { analyzeHand } from "./fingerAnalyzer";

// Detect Pataka
export function detectPataka(landmarks) {
  const hand = analyzeHand(landmarks);

  return (
    hand.indexExtended &&
    hand.middleExtended &&
    hand.ringExtended &&
    hand.littleExtended
  );
}

// Detect Tripataka
export function detectTripataka(landmarks) {
  const hand = analyzeHand(landmarks);

  return (
    hand.indexExtended &&
    hand.middleExtended &&
    hand.ringBent &&
    hand.littleExtended
  );
}