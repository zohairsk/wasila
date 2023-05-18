import { useEffect, useState } from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';


ChartJS.register(
    ArcElement, Tooltip, Legend
)

export default function UserGraph({userID}){
    const [graphData, setGraphData] = useState([])

      const fetchUserGraphData = async ()=>{
      const res = await fetch(`http://localhost:8080/api/user/graph/${userID}`);
      const data = await res.json();
      setGraphData(data);
    }

    useEffect(() => {
      fetchUserGraphData();
    },[]);

    const labelsArray = graphData.map(item => item.name);
    const dataArray = graphData.map(item => item['sum(amount)'])

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
                return `${label}: ${value}`;
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