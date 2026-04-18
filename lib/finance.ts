/**
 * חישוב ריבית דריבית עם הפקדות חודשיות
 * Monthly contribution with compound interest
 *
 * @param initial - סכום התחלתי
 * @param monthly - הפקדה חודשית
 * @param annualRate - ריבית שנתית (לדוגמה 0.07 = 7%)
 * @param years - מספר שנים
 * @returns מערך של נקודות {year, value, contributed}
 */
export function compoundGrowth(
  initial: number,
  monthly: number,
  annualRate: number,
  years: number
): Array<{ year: number; value: number; contributed: number; interest: number }> {
  const monthlyRate = annualRate / 12;
  const data: Array<{ year: number; value: number; contributed: number; interest: number }> = [];
  let balance = initial;
  let totalContributed = initial;

  // Start point
  data.push({
    year: 0,
    value: Math.round(balance),
    contributed: Math.round(totalContributed),
    interest: 0,
  });

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
      totalContributed += monthly;
    }
    data.push({
      year: y,
      value: Math.round(balance),
      contributed: Math.round(totalContributed),
      interest: Math.round(balance - totalContributed),
    });
  }

  return data;
}

/**
 * חישוב פשוט של סכום סופי
 */
export function finalValue(
  initial: number,
  monthly: number,
  annualRate: number,
  years: number
): number {
  const points = compoundGrowth(initial, monthly, annualRate, years);
  return points[points.length - 1].value;
}

/**
 * פורמט מטבע שקל
 */
export function formatILS(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("he-IL").format(n);
}
