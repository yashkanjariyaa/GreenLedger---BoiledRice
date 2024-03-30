import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { waste } from '../constants/wastebar';

Chart.register(...registerables);

const WasteBar = () => {
    const today = new Date(); // Get today's date
    const labels = []; // Array to store labels for the last 7 days

    // Function to format date with Indian time
    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    // Loop to generate labels for the last 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i); // Subtract days from today
        const formattedDate = formatDate(date); // Format date with Indian time
        labels.push(formattedDate); // Add date to labels array
    }

    const data = {
        labels: labels, // Use the dynamically generated labels
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
        scales: {
            y: {
                beginAtZero: true,
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
