const assert = require('assert');
const { calculateDailyPacing, calculateBudgetThreshold, calculateAdPerformance } = require('./logic');

const testCsvData = `Date,Amount Spent (USD),Impressions,Clicks,Conversions
2023-01-01,100,1000,50,5
2023-01-02,150,1200,60,6
2023-01-03,200,1500,75,7
2023-01-04,250,1800,90,8
2023-01-05,300,2100,105,9
`;

const startDate = '2023-01-01';
const endDate = '2023-01-05';
const targetBudget = 1000;
const thresholdPercentage = 50;

const dailyPacingResult = calculateDailyPacing(testCsvData, targetBudget, startDate, endDate);
assert.strictEqual(dailyPacingResult.dailyPacing, 200);
assert.strictEqual(dailyPacingResult.currentPacing, 200);
assert.strictEqual(dailyPacingResult.isOnTrack, true);

const budgetThresholdResult = calculateBudgetThreshold(testCsvData, thresholdPercentage, startDate, endDate);
assert.strictEqual(budgetThresholdResult.thresholdAmount, 500);
assert.strictEqual(budgetThresholdResult.dailyThreshold, 100);

const adPerformanceResult = calculateAdPerformance(testCsvData, startDate, endDate);
assert.strictEqual(adPerformanceResult.totalImpressions, 7600);
assert.strictEqual(adPerformanceResult.totalClicks, 380);
assert.strictEqual(adPerformanceResult.totalConversions, 35);
assert.strictEqual(adPerformanceResult.totalSpend, 1000);
assert.strictEqual(adPerformanceResult.ctr, 5);
assert.strictEqual(adPerformanceResult.cpa, 28.571428571428573);

console.log('All tests passed!');