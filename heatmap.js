// Get the discount factor slider element
const discountFactorSlider = document.getElementById('discount-factor');
// Get the heatmap container element
const heatmapContainer = d3.select('#heatmap');

// Function to generate heatmap
function generateHeatmap(discountFactor) {
  const data = [];
  const numTrials = 10;  // Number of successes and failures to consider

  // Generate data for heatmap
  for (let successes = 0; successes <= numTrials; successes++) {
    for (let failures = 0; failures <= numTrials; failures++) {
      const gittins = calculateGittins(successes, failures, discountFactor);
      data.push({ successes, failures, gittins });
    }
  }

  // Clear existing heatmap
  heatmapContainer.selectAll('*').remove();

  const svg = heatmapContainer.append("svg")
    .attr("width", numTrials * 50 + 100)
    .attr("height", numTrials * 50 + 100);

  // Create color scale
  const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
    .domain(d3.extent(data, d => d.gittins));

    const squares = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => d.successes * 50 + 50)
    .attr('y', d => d.failures * 50 + 50)
    .attr('width', 50)
    .attr('height', 50)
    .style('fill', d => colorScale(d.gittins))
    .style('stroke', 'white')
    .style('stroke-width', 1)
    .attr('data-toggle', 'tooltip')
    .attr('title', d => d.gittins.toFixed(2));
  
  // Append text to each square to display the Gittins value
  const text = svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => d.successes * 50 + 75)
    .attr('y', d => d.failures * 50 + 75)
    .attr('dy', '0.35em')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .text(d => d.gittins.toFixed(2));

  const xAxisLabel = svg.append('text')
    .attr('class', 'axis-label')
    .attr('x', numTrials * 50 + 75)
    .attr('y', numTrials * 50 + 100)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Successes');
  
  // Add y-axis label
  const yAxisLabel = svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(numTrials * 50 + 50))
    .attr('y', -50)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Failures');
  
}

// Event listener for discount factor slider
discountFactorSlider.addEventListener('input', function () {
  const discountFactor = parseFloat(this.value);
  generateHeatmap(discountFactor);
});

// Initial heatmap generation with default discount factor
const initialDiscountFactor = parseFloat(discountFactorSlider.value);
generateHeatmap(initialDiscountFactor);
