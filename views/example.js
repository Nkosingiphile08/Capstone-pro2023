function app() {
    return {
        systolic: '',
        diastolic: '',
        pulse: '',
        data: [],
        chart: null,

        logData() {
            if (!this.systolic || !this.diastolic || !this.pulse) {
                alert('Please enter all values.');
                return;
            }

            const newData = {
                systolic: parseFloat(this.systolic),
                diastolic: parseFloat(this.diastolic),
                pulse: parseFloat(this.pulse),
                timestamp: new Date().toLocaleString(),
            };

            // Simulate saving data to a database (you would replace this with an actual API call)
            this.data.push(newData);

            // Clear input fields
            this.systolic = '';
            this.diastolic = '';
            this.pulse = '';

            // Update the chart
            this.updateChart();
        },

        updateChart() {
            if (this.chart) {
                this.chart.destroy();
            }

            const ctx = document.getElementById('chart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data.map(item => item.timestamp),
                    datasets: [{
                        label: 'Systolic BP',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        data: this.data.map(item => item.systolic),
                        fill: false,
                    }, {
                        label: 'Diastolic BP',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: this.data.map(item => item.diastolic),
                        fill: false,
                    }, {
                        label: 'Pulse',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        data: this.data.map(item => item.pulse),
                        fill: false,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
    };
}
