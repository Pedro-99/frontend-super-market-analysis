import React, { useState, useEffect } from 'react';
import superMarketService from '../../features/chart.service';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',

    },
    title: {
      display: true,
      text: 'Total number of purchases by customer type',
      color: 'white'
    },

  },
};



export default function VerticalBarChart() {

  const [stats, setStats] = useState([])
  const [customData, setCustomData] = useState({
    labels : [],
    datasets : []
  })
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');





  useEffect(() => {
    superMarketService.getSallesGroupedByTypeAndGender()
      .then((result) => {
        setIsLoading(true);
        
        let nestedLabels = null;
        let customerTypes = null;
        let datasets = [];
        let arr = [];
        result.map((item) => {
           arr.push({ ...item._id, total: item.total })
        })

        // remove redanduncy to get our labels - (Member & Normal)
        // i sort it because the chart docs force me to follow this pattern
        customerTypes = [... new Map(arr?.map(item => [item['Customer type'], item['Customer type']])).values()].sort()
        // remove redanduncy to get our nested labels - (Female & Male)
        // i sort it because the chart docs force me to follow this pattern
        nestedLabels = [... new Map(arr?.map(item => [item.Gender, item.Gender])).values()].sort()
    

        // first element for Female Member customer type and the second for Female Normal customer type
        let dataFemales = [];

        // first element for Male Member customer type and the second for Male Normal customer type
        let dataMales = [];

        arr?.map((item) => {
          if (item.Gender === 'Female' && item['Customer type'] === 'Member') {
            dataFemales[0] = item.total;
          }
          if (item.Gender === 'Female' && item['Customer type'] === 'Normal') {
            dataFemales[1] = item.total;
          }
          if (item.Gender === 'Male' && item['Customer type'] === 'Member') {
            dataMales[0] = item.total;
          }
          if (item.Gender === 'Male' && item['Customer type'] === 'Normal') {
            dataMales[1] = item.total;
          }

        })


        for (let gender of nestedLabels) {

          if (gender === "Female") {
            datasets.push({
              label: gender,
              data: dataFemales,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            })
          } else {
            datasets.push({
              label: gender,
              data: dataMales,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            })
          }


        }

        const dataObj = {};
        dataObj.labels = customerTypes;
        dataObj.datasets = datasets;

        setCustomData(dataObj);
        setIsLoading(false);

      })
      .catch((err) => {
        setMessage("Error: something went wrong")
        setIsError(true)
        console.log("error :", err)

      })

  }, [isError, isLoading])

  if (isLoading) return <div> Loading... </div>

  if (isError) return <details>
   
    <summary>{message}</summary>
  </details>

  return (
    <div className="border w-100 h-100 d-flex align-items-center" >

      <Bar options={options} data={customData}   />
    </div>
  )
}
