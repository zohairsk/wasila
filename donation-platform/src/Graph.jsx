import { useEffect, useState } from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';


ChartJS.register(
    ArcElement, Tooltip, Legend
)

export default function Graph(){
    const [graphData, setGraphData] = useState([])

    const fetchGraphData = async ()=>{
      const res = await fetch(`http://localhost:8080/api/graph`);
      const data = await res.json();
      setGraphData(data);
    }
    useEffect(() => {
      fetchGraphData();
    },[]);

    const labelsArray = graphData.map(item => item.name);
    const dataArray = graphData.map(item => item['count(user_donates.UserID)'])

    const data = {
        labels: labelsArray,
        datasets: [
            {
                data: dataArray,
                backgroundColor: ['skyblue', 'black', 'purple', 'aliceblue', 'pink']
            }        
        ]
    }

    const options = {
        responsive: true,
        cutout: '60%', // Adjust the value to set the size of the center hole
        plugins: {
            tooltip: {
              callbacks: {
                label: context => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `${label}: ${percentage}%`;
                },
              },
            },
          },
      };

    return (
        <>
            <Pie
                data={data} options={options}
            ></Pie>
        </>
    )
}