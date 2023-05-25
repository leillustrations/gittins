// Function to calculate Gittins value
function calculateGittins(successes, failures, discountFactor) {
    const n = successes + failures + 1;  // Total number of trials
    const p = (successes + 1) / n;  // Estimated success probability
  
    // Calculate Gittins value
    const gittins = (p * (1 - discountFactor)) / (1 - discountFactor * (1 - p));
  
    return gittins;
  }
  