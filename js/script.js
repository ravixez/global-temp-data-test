(async function() {
    const data = await getData();

    const chart = new Chart(
        document.getElementById('chart'),
        {
            type: 'line',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Global Average Temperature in °C',
                        data: data.map(row => row.temp),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(126, 198, 153)',
                        borderWidth: 1,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, values) {
                                return value.toFixed(1) + '°'; // Append ° to the y-axis labels
                            }
                        }
                    }
                }
            }
        }
    );

    // Trigger chart resize on window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
})();

async function getData() {
    const response = await fetch('csv/ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    // split() - separate by line break, slice() - remove the first element of the array (index 0)
    const table = data.split('\n').slice(1);
    const newData = [];

    table.forEach(row => {
        const cols = row.split(',');
        const year = parseInt(cols[0]);
        const temp = parseFloat(cols[1]);
        newData.push({ year, temp });
    });
    return newData;
}