// Array to store full history of data points for each chart
const fullDataHistory = [[], [], [], []]; // One array for each plot

function generateDataPoint(x, frequency) {
    const harmonicValue = Math.sin(x * 0.1 * frequency) * 2; // Harmonic function
    const noise = (Math.random() * 2 - 1); // Small random value (-1 to 1)
    return harmonicValue + noise;
}

// Update chart dynamically while preserving history
function updateChart(chart, frequency, index) {
    const x = fullDataHistory[index].length; // Get the next X value (based on history length)
    const newY = generateDataPoint(x, frequency); // Calculate the new Y value

    // Add new data point to full history
    fullDataHistory[index].push({ x, y: newY });

    // Update chart display with only the last 100 points
    const recentPoints = fullDataHistory[index].slice(-100); // Get the last 100 points
    chart.data.labels = recentPoints.map(point => point.x); // Update X-axis labels
    chart.data.datasets[0].data = recentPoints.map(point => point.y); // Update Y-axis data

    chart.update(); // Refresh the chart
}

// Create an animated chart with history tracking
function createAnimatedChart(canvasId, frequency, color, index) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Start with an empty array
            datasets: [{
                label: `Frequency ${frequency}`,
                data: [], // Start with an empty array
                borderColor: color,
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X-axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y-axis'
                    }
                }
            }
        }
    });

    // Continuously update the chart
    setInterval(() => updateChart(chart, frequency, index), 100);

    return chart;
}

// Create four animated plots with history tracking
createAnimatedChart('chart1', 1, 'red', 0);
createAnimatedChart('chart2', 2, 'blue', 1);
createAnimatedChart('chart3', 3, 'green', 2);
createAnimatedChart('chart4', 4, 'orange', 3);

