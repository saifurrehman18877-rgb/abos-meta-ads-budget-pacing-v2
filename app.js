const csvUpload = document.getElementById('csv-upload');
const targetBudgetInput = document.getElementById('target-budget');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const thresholdPercentageInput = document.getElementById('threshold-percentage');
const calculateButton = document.getElementById('calculate-button');
const dailyPacingElement = document.getElementById('daily-pacing');
const currentPacingElement = document.getElementById('current-pacing');
const onTrackElement = document.getElementById('on-track');
const thresholdAmountElement = document.getElementById('threshold-amount');
const dailyThresholdElement = document.getElementById('daily-threshold');
const totalImpressionsElement = document.getElementById('total-impressions');
const totalClicksElement = document.getElementById('total-clicks');
const totalConversionsElement = document.getElementById('total-conversions');
const totalSpendElement = document.getElementById('total-spend');
const ctrElement = document.getElementById('ctr');
const cpaElement = document.getElementById('cpa');

let csvData = null;

csvUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            csvData = e.target.result;
        };
        reader.readAsText(file);
    }
});

calculateButton.addEventListener('click', () => {
    if (!csvData) {
        alert('Please upload a CSV file.');
        return;
    }

    const targetBudget = parseFloat(targetBudgetInput.value);
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const thresholdPercentage = parseFloat(thresholdPercentageInput.value);

    if (isNaN(targetBudget) || isNaN(thresholdPercentage) || !startDate || !endDate) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const dailyPacingResult = calculateDailyPacing(csvData, targetBudget, startDate, endDate);
    dailyPacingElement.textContent = dailyPacingResult.dailyPacing.toFixed(2);
    currentPacingElement.textContent = dailyPacingResult.currentPacing.toFixed(2);
    onTrackElement.textContent = dailyPacingResult.isOnTrack ? 'Yes' : 'No';

    const budgetThresholdResult = calculateBudgetThreshold(csvData, thresholdPercentage, startDate, endDate);
    thresholdAmountElement.textContent = budgetThresholdResult.thresholdAmount.toFixed(2);
    dailyThresholdElement.textContent = budgetThresholdResult.dailyThreshold.toFixed(2);

    const adPerformanceResult = calculateAdPerformance(csvData, startDate, endDate);
    totalImpressionsElement.textContent = adPerformanceResult.totalImpressions;
    totalClicksElement.textContent = adPerformanceResult.totalClicks;
    totalConversionsElement.textContent = adPerformanceResult.totalConversions;
    totalSpendElement.textContent = adPerformanceResult.totalSpend.toFixed(2);
    ctrElement.textContent = adPerformanceResult.ctr.toFixed(2);
    cpaElement.textContent = adPerformanceResult.cpa.toFixed(2);
});