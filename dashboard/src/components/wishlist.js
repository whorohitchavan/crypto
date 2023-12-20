import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ImgCard from "./cardTemp";
import { Link } from "react-router-dom";
import Coin from "../routes/Coin";

export default function WishList(props){
    const {coin}=props;
    const [int1,setInt1]=useState('');
    const [int2,setInt2]=useState('');
    const [int3,setInt3]=useState('');
    const [int4,setInt4]=useState('');

    useEffect(()=>{
        fetch("http://localhost:8000/success-log",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token")
            })

        })
        .then((res)=>res.json())
        .then((data)=>{
            setInt1(data.data.int1);
            setInt2(data.data.int2);
            setInt3(data.data.int3);
            setInt4(data.data.int4);
        });

    })
 
    const coinData=coin.filter((data)=>{

        return(data.name===int1 || data.name===int2 || data.name===int3 || data.name===int4);
    });

    return(
        <>
        <Navbar/>
                <h3>Cryptocurrencies of your Interest</h3>
            <div className="grid-container">
            {coinData
                .map(item =>{
                    return(
                    <Link to={`/coin/${item.id}`} className="grid-card" element={<Coin />} key={item.id}>
                        <ImgCard
                            name={item.name} rank={item.market_data.market_cap_rank} usdprice={item.market_data.current_price.usd.toLocaleString()} inrprice={item.market_data.current_price.inr.toLocaleString()}
                            marketCap={item.market_data.market_cap.usd.toLocaleString()} url={item.image.large}
                        />
                    </Link>)
                })}
            </div>
        </>
    )
}