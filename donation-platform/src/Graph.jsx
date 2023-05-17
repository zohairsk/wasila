import { useEffect, useState } from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';


ChartJS.register(
    ArcElement, Tooltip, Legend
)

export default function Graph(){
    const [graphData, setGraphData] = useState([
        {
          "count(user_donates.UserID)": 6,
          "name": "Edhi Foundation"
        },
        {
          "count(user_donates.UserID)": 9,
          "name": "Health Oriented Preventive Education"
        },
        {
          "count(user_donates.UserID)": 4,
          "name": "Saylani Welfare Trust"
        },
        {
          "count(user_donates.UserID)": 7,
          "name": "Shaukat Khanum Memorial Hospital"
        },
        {
          "count(user_donates.UserID)": 2,
          "name": "Chhipa Welfare Association"
        }])
    //const [labels, setLabels] = useState([])
    // const [data, setData] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8080/api/graph`) 
        .then(response => response.json())
        .then(data => setGraphData(data))
        .catch(error => console.error(error))
    },[]);

    // graphData.map(
    //     graph => {
    //         // setInput((values) => ({ ...values, [name]: value }));
    //             setLabels((labels) => ([...labels, graph.name]));
    //             setData((data) => ([...data, graph['count(user_donates.UserID)']]));
    //     }
    // )
    const labelsArray = graphData.map(item => item.name);
    const dataArray = graphData.map(item => item['count(user_donates.UserID)'])

    const data = {
        labels: labelsArray,
        datasets: [
            {
                data: dataArray,
                backgroundColor: ['aqua', 'lilac', 'purple', 'aliceblue', 'pink']
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