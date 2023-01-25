import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import superMarketService from '../../features/chart.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const [stats, setStats] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    superMarketService.getSalles()
      .then((d) => {
        setIsLoading(true);
        setStats(d);
        setIsLoading(false);
      })
      .catch(e => {
        setMessage(e);
        setIsError(true)
      })
  }, [])


 

  const dt = {
    labels: stats.map((i) => i._id),
    datasets: [
      {
        label: 'count',
        data: stats.map((i) => i.count)  ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        
      }
    ]
  }

  const config = {
    data: dt,
    options: {
      interaction: {
        intersect: false,
        mode: 'index',
        
      },
    
      plugins: {
        title: {
          display: true,
          color : "white",
          text: 'Gross volume grouped by product line',
        },
     
      }
    }
  };

  if (isError) return <div className='alert alert-danger'>
    <details>{message}</details>
  </div>
  if (isLoading) return <div className=' w-100 '>
    loading...
  </div>

  return (
    <Doughnut {...config}  className="border"  />
  )
}
