import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import superMarketService from '../../features/chart.service';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            color: 'white',
            display: true,
            text: 'Average rating based on gender',
        },
    },
};



export default function HorizontalBarChar() {

    const [stats, setStats] = useState([]);
    const [customData, setCustomData] = useState({
        labels: [],
        datasets: []
    });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        superMarketService.getRatingByGender()
            .then((d) => {

                setIsLoading(true);
                let labels = ['rating'];
                let data = [];
                d.map((item) => {

                    // labels.push(item._id);
                    if (item._id === 'Female') {
                        data.push({
                            label: 'female',
                            data: [item.avg],
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        });
                    } else {
                        data.push({
                            label: 'male',
                            data: [item.avg],
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        });
                    }
                    setIsLoading(false);



                }
                )

                const dataObj = {};
                dataObj.labels = labels;
                dataObj.datasets = data;

                setCustomData(dataObj);
                setIsLoading(false);
            })
            .catch(e => {
                setMessage(e);
                setIsError(true)
            })
    }, [])

    if (isLoading) return <div className='alert alert-info'> Loading... </div>

    if (isError) return <div className='alert alert-danger'>

        <details>
            {message}
        </details>
    </div>

    return (
        <Bar options={options} data={customData}  className="border"  />
    )
}
