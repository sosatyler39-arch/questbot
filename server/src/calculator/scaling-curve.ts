export interface CalcCorrectGraphPoint {
  maxVal: number;
  maxGrowVal: number;
  adjPt: number;
}

export type CalcCorrectGraph = CalcCorrectGraphPoint[];

/**
 * Expands a CalcCorrectGraph's 5 breakpoints into a lookup array indexed by attribute
 * investment (1 to 148), interpolating between each pair of breakpoints. Ported verbatim from
 * ThomasJClark/elden-ring-weapon-calculator's regulationData.ts (MIT license).
 */
export function evaluateCalcCorrectGraph(calcCorrectGraph: CalcCorrectGraph): number[] {
  const arr: number[] = [];

  for (let i = 1; i < calcCorrectGraph.length; i++) {
    const prevStage = calcCorrectGraph[i - 1];
    const stage = calcCorrectGraph[i];

    const minAttributeValue = i === 1 ? 1 : prevStage.maxVal + 1;
    const maxAttributeValue = i === calcCorrectGraph.length - 1 ? 148 : stage.maxVal;

    for (
      let attributeValue = minAttributeValue;
      attributeValue <= maxAttributeValue;
      attributeValue++
    ) {
      if (!arr[attributeValue]) {
        let ratio = Math.max(
          0,
          Math.min(1, (attributeValue - prevStage.maxVal) / (stage.maxVal - prevStage.maxVal)),
        );

        if (prevStage.adjPt > 0) {
          ratio = ratio ** prevStage.adjPt;
        } else if (prevStage.adjPt < 0) {
          ratio = 1 - (1 - ratio) ** -prevStage.adjPt;
        }

        arr[attributeValue] =
          prevStage.maxGrowVal + (stage.maxGrowVal - prevStage.maxGrowVal) * ratio;
      }
    }
  }

  return arr;
}
