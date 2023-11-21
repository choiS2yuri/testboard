'use client';
import { Bar } from 'react-chartjs-2';
import Chart, {registerables, BarElement, CategoryScale, LinearScale} from 'chart.js/auto';
import { useEffect } from 'react';



export default function ChartCom(){
    useEffect(() => {
        Chart.register(...registerables, BarElement, CategoryScale, LinearScale);
    }, []);
    // Chart.register(...registerables, BarElement, CategoryScale, LinearScale)
    const data = {
        labels:['orange',"pink","blue"],
        datasets:[
            {
                label: "차트",
                data: [20,48,15],
                barPercentage: 0.5,
                backgroundColor:[
                    'rgba(255, 153, 153, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 153, 153)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 205, 86)'
                ],
                borderWidth: 1
            }
        ]
    }


    const options ={
        scales : {
            y:{
                beginAtZero: true
            }
        }
    }
    console.log(options)
    return(
        <>
            <div className="max-w-7xl m-auto">
                <Bar data={data} options={options}/>
            </div>
        </>
    )
}