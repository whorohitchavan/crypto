import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import axios from "axios";
import moment from "moment-timezone";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export default function CoinChart(props){
  
  const [currency,setCurrency]=useState('usd');
  const [days,setDays]=useState('7');
  const [coinval,setCoindata]=useState()
  const {id}=props;
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
     axios.get(url).then(
        (res) => { setCoindata(res.data); }               
    )
},[id,currency,days]);


  const coinChartData= ()=>{
    if(coinval){
     return coinval.prices.map(value=>({
        x:value[0],y:value[1].toFixed(2)
      }));
      
    }
  }
/*if(coinval){
  console.log(coinChartData().map(value=>value.y));
}*/
  
const x=()=>{
  if(coinval){
    return coinChartData().map(value=>{ return moment(value.x).format('YY MMM DD')})
  }
}
const y=()=>{
  if(coinval){
   return coinChartData().map(value=>value.y)
  }
}
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${id} Chart`,
      },
    },
  };
  
  
 const data = {
    labels:x(),
    datasets: [
      {
        label: `${id} in ${currency}`,
        data:y(),
        borderColor: "rgb(255, 99, 133)",
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const handleCurrency=(e)=>{
    setCurrency(e.target.value);
    
}
const handledays=(e)=>{
    setDays(e.target.value);
}
  return(
    <>
      <div className="chart-drop">
        <select className="choose" onChange={handleCurrency} value={currency}>
            <option value="usd" >USD</option>
            <option value="inr" >INR</option>
        </select>
        <select className="choose" onChange={handledays} value={days}>
            <option value="7" >7 days</option>
            <option value="30" >1 Month</option>
            <option value="182" >6 Months</option>
            <option value="365" >1 Year</option>
        </select>
      </div>
      <Line options={options} data={data} />
    </>
)

}
/*

const {coinval,setCoindata}=useState(()=>{
        const coinUrl = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=7`
    axios.get(coinUrl).then(
        (res) => { console.log(res.data);
        return res.data;
    })});
    console.log(coin.id);
    console.log(coinval);
    const [data,setData]=useState({
        labels:[1,2,3,4,5,6,7]
        /*coinChartData.map(value=>{
                  moment(value.x).format('MMMDD')
                }),
                datasets: [
                  {
                    label: `${coin.id} in ${currency}`,
                    data:[1,2,3,4,5,6,7],
                    //coinChartData.map(value=>value.y),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              })
        
  
  
  const coinUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
        axios.get(coinUrl).then(
            (res) => { setCoindata(res.data)
            console.log(res.data);
        })
        
        const coinChartData=coinval.prices.map(value=>({
        x:value[0],y:value[1].toLocalString().toFixed(2)
      }));

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${coin.id} Chart`,
          },
        },
      };

*/