const datasets = [
    { label: 'Downloads', color: 'red' },
    { label: 'Rating', color: 'blue' },
    { label: 'Place', color: 'green' }
];

let myLineChart = null;

function track_form() {
    document.getElementById("track_form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        try {
            const response = await fetch("https://masterali2.pythonanywhere.com/tss/track/", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            const message = document.getElementById("track_message");
            message.hidden = false;
            message.textContent = result["message"];
            message.dataset.type = result["success"] === false ? "error" : "success";
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    });
}

function doGraph(data, datasets, annotations, startTime = null) {
    const isObjectFormat = data.length > 0 && typeof data[0] === 'object' && 'time' in data[0];
    
    const chartDatasets = datasets.map(ds => {
        let dataPoints;
        
        if (isObjectFormat) {
            dataPoints = data.map(point => ({
                x: new Date(point.time),
                y: point[ds.label] || 0
            }));
        } else {
            dataPoints = data.map((time, i) => ({
                x: new Date(time),
                y: ds.data[i] || 0
            }));
        }
        
        if (startTime) {
            const start = new Date(startTime);
            dataPoints = dataPoints.filter(point => point.x >= start);
        }
        
        return {
            label: ds.label,
            data: dataPoints,
            borderColor: ds.color || 'rgba(75, 192, 192, 1)',
            backgroundColor: ds.color ? ds.color.replace('1)', '0.1)').replace('rgb', 'rgba') : 'rgba(75, 192, 192, 0.1)',
            fill: false,
            tension: 0.5,
            pointRadius: 0,
            pointHoverRadius: 6
        };
    });

    let filteredAnnotations = annotations;
    if (startTime && annotations) {
        const start = new Date(startTime);
        filteredAnnotations = {};
        
        Object.keys(annotations).forEach(key => {
            const annotation = annotations[key];
            if (annotation.xMin) {
                const annotationTime = new Date(annotation.xMin);
                if (annotationTime >= start) {
                    filteredAnnotations[key] = annotation;
                }
            } else {
                filteredAnnotations[key] = annotation;
            }
        });
    }

    const ctx = document.getElementById('myLineChart').getContext('2d');
    
    if (myLineChart) myLineChart.destroy();

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: { datasets: chartDatasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: { 
                    display: true,
                    position: 'top'
                },
                tooltip: { 
                    enabled: true,
                    mode: 'index',
                    intersect: false
                },
                annotation: {
                    annotations: filteredAnnotations
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM dd, yyyy HH:mm',
                        displayFormats: {
                            hour: 'MMM dd HH:mm',
                            day: 'MMM dd',
                            week: 'MMM dd',
                            month: 'MMM yyyy'
                        },
                        unit: 'day',
                        stepSize: 1
                    },
                    ticks: {
                        maxTicksLimit: 8,
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 0
                    },
                    title: { 
                        display: true, 
                        text: 'Time' 
                    },
                    grid: {
                        display: true
                    }
                },
                y: {
                    beginAtZero: false,
                    title: { 
                        display: true, 
                        text: 'Value' 
                    },
                    grid: {
                        display: true
                    }
                }
            }
        }
    });
}

async function setupGraph() {
    try {
        const data = [];
        doGraph(data, datasets);
    } catch (err) {
        console.error("Error submitting form:", err);
    }
}

function graphForm() {
    document.getElementById("graph_form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        try {
            const response = await fetch("https://masterali2.pythonanywhere.com/tss/get-metrics/", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            const message = document.getElementById("graph_message");
            message.hidden = false;
            message.textContent = result["message"];

            if (result["success"] === false) {
                message.dataset.type = "error";
                return;
            } else {
                message.dataset.type = "success";
            }

            const now = new Date("2025-09-24");
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 2);

            let time = null;
            if (formData.get("time") === "week") {
                time = oneWeekAgo;
            } else if (formData.get("time") === "month") {
                time = oneMonthAgo;
            }

            const data = result["data"];
            doGraph(result["data"], datasets, result["anotations"], time);

            document.getElementById("text-stats").innerHTML = 
            `Total Downloads: ${data.at(-1)["Downloads"]}<br><br>Total Ratings: ${data.at(-1)["Rating"]}<br><br>Download Place: ${data.at(-1)["Place"]}         <br><br>
        
        Metrics/Entries: ${data.at(-1)["local_metrics_count"]}
        
            <br><br>
            <br><br>
        Global:
        <br><br>
        
        Packages Tracked: ${data.at(-1)["global_packages_count"]}

        <br><br>
        
        Global Metrics/Entries: ${data.at(-1)["global_metrics_count"]}
        <br><br>
        
        DB Size: ${data.at(-1)["global_db_size"]}MB`

        } catch (err) {
            console.error("Error submitting form:", err);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.ChartAnnotation) {
        Chart.register(window.ChartAnnotation);
    }
    
    track_form();
    graphForm();
    setupGraph();
    SetupFooter("footer");
});