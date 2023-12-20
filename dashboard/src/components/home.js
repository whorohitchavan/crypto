import React, { useState } from "react";
import Navbar from "./Navbar";
import ImgCard from "./cardTemp";
import "./home.css"
import { Link } from "react-router-dom";
import Banner from "./banner";


export default function Home(props){

    const [search, setSearch] = useState('');
    const {data} =props;

    const handler = (e) => {
        setSearch(e.target.value);
    }

    const filteredCoins = data.filter(data =>
        data.name.toLowerCase().includes(search.toLowerCase()))
    
    return(
        <>
        <Navbar/>
        <Banner/>
        <div className="search-header">
                <input value={search} onChange={handler} placeholder="Search for crypto" />
        </div>

            
            <div className="grid-container">

                {filteredCoins
                .map(coin =>{
                    return(
                    <Link to={`/coin/${coin.id}`} className="grid-card" key={coin.id}>
                        <ImgCard
                            name={coin.name} rank={coin.market_data.market_cap_rank} usdprice={coin.market_data.current_price.usd.toLocaleString()} inrprice={coin.market_data.current_price.inr.toLocaleString()}
                            marketCap={coin.market_data.market_cap.usd.toLocaleString()} url={coin.image.large}
                        />
                    </Link>
                    
                    )
                                    
                })}

            </div>
            
        </>
    )
}