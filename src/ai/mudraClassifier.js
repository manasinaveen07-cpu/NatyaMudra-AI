import { analyzeHand } from "./fingerAnalyzer";

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