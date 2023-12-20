import React from 'react'

const ImgCard = (props) => {
  
    return (
        <>
        <div>
            <div className='cardimg'>
                <img className="card-img"src={props.url} alt={props.namre} />
            </div>
            <div className='card-content'>
                <p>{props.name}</p>
                <p>Rank: {props.rank}  </p>
                <p>Price(USD): {props.usdprice} </p>
                <p>Price(INR): {props.inrprice} </p>
                <p>MarketCap: {props.marketCap} USD</p>
            </div>
        </div>
        </>
      )
    
  
}

export default ImgCard
