function calculateDailyPacing(csvData, targetBudget, startDate, endDate) {
  const Papa = typeof require !== 'undefined' ? require('papaparse') : window.Papa;
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  let totalSpend = 0;
  parsedData.forEach(row => {
    const date = new Date(row['Date']);
    if (date >= start && date <= end) {
      totalSpend += parseFloat(row['Amount Spent (USD)']);
    }
  });

  const dailyPacing = targetBudget / totalDays;
  const currentPacing = totalSpend / totalDays;

  return {
    dailyPacing: dailyPacing,
    currentPacing: currentPacing,
    isOnTrack: currentPacing <= dailyPacing
  };
}

function calculateBudgetThreshold(csvData, thresholdPercentage, startDate, endDate) {
  const Papa = typeof require !== 'undefined' ? require('papaparse') : window.Papa;
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  let totalSpend = 0;
  parsedData.forEach(row => {
    const date = new Date(row['Date']);
    if (date >= start && date <= end) {
      totalSpend += parseFloat(row['Amount Spent (USD)']);
    }
  });

  const thresholdAmount = (thresholdPercentage / 100) * totalSpend;
  const dailyThreshold = thresholdAmount / totalDays;

  return {
    thresholdAmount: thresholdAmount,
    dailyThreshold: dailyThreshold
  };
}

function calculateAdPerformance(csvData, startDate, endDate) {
  const Papa = typeof require !== 'undefined' ? require('papaparse') : window.Papa;
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalConversions = 0;
  let totalSpend = 0;

  parsedData.forEach(row => {
    const date = new Date(row['Date']);
    if (date >= start && date <= end) {
      totalImpressions += parseInt(row['Impressions']);
      totalClicks += parseInt(row['Clicks']);
      totalConversions += parseInt(row['Conversions']);
      totalSpend += parseFloat(row['Amount Spent (USD)']);
    }
  });

  const ctr = (totalClicks / totalImpressions) * 100;
  const cpa = totalSpend / totalConversions;

  return {
    totalImpressions: totalImpressions,
    totalClicks: totalClicks,
    totalConversions: totalConversions,
    totalSpend: totalSpend,
    ctr: ctr,
    cpa: cpa
  };
}

if (typeof module !== 'undefined') module.exports = {
  calculateDailyPacing,
  calculateBudgetThreshold,
  calculateAdPerformance
};