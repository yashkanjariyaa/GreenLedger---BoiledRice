    import React from 'react';
    import { Bar } from 'react-chartjs-2';
    import { Chart, registerables } from 'chart.js';
    import  {waste}  from '../constants/wastebar'
    Chart.register(...registerables);
    const WasteBar = () => {
    const data = {
        // Labels for the bars
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday'],
        datasets: [
        {
            label: 'Waste Amount (in kgs)',
            data: waste, // Sample data for the bars
            backgroundColor: '#25B08D', // Optional bar color
            borderColor: 'rgba(255, 99, 132, 1)', // Optional bar border color
        },
        ],
    };

    const options = {
        // Basic configuration options
        scales: {
        y: {
            beginAtZero: true,
            // Start the y-axis at 0
        },
        },
    };

    return (
        <div className='w-full'>
        <h1 className="text-[1.3rem] my-5">Your progress so far</h1>
        <Bar data={data} options={options} />
        </div>
    );
    };

    export default WasteBar;
