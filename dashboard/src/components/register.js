import React, { useEffect, useState } from "react"
import "./register.css"


const Register = () => {
    const [userid,setUserid]=useState('');
    const [rname,setRname]=useState('');
    const [email,setRemail]=useState('');
    const [phn,setPhn]=useState('');
    const [rpass,setRpass]=useState('');
    const [address,setAddress]=useState('');
    const [city,setCity]=useState('');
    const [rstate,setRstate]=useState('');
    const [pin,setPin]=useState('');
    const [coinList,setList]=useState([{"id":'',"name":''}])
    const [int1,setInt1]=useState('');
    const [int2,setInt2]=useState('');
    const [int3,setInt3]=useState('');
    const [int4,setInt4]=useState('');

    useEffect(()=>{
        const coinData=async()=>{
            const res=await fetch(`https://api.coingecko.com/api/v3/coins/`)
            const resData=await res.json();
            console.log(resData); 
            setList(resData)
        };
        coinData();
    },[])
    
    const handleUserid =(e)=>{
        setUserid(e.target.value)
    }

    const handleRname =(e)=>{
        setRname(e.target.value)
    }

    const handleRemail =(e)=>{
        setRemail(e.target.value)
    }

    const handlePhn =(e)=>{
        setPhn(e.target.value)
    }

    const handleRpass =(e)=>{
        setRpass(e.target.value)
    }

    const handleAddress =(e)=>{
        setAddress(e.target.value)
    }

    const handleCity =(e)=>{
        setCity(e.target.value)
    }

    const handleState =(e)=>{
        setRstate(e.target.value)
    }

    const handlePin =(e)=>{
        setPin(e.target.value)
    }

    const handleInt1 =(e)=>{
        setInt1(e.target.value)
    }

    const handleInt2 =(e)=>{
        setInt2(e.target.value)
    }

    const handleInt3 =(e)=>{
        setInt3(e.target.value)
    }

    const handleInt4 =(e)=>{
        setInt4(e.target.value)
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        console.log(userid,email,rpass);
                fetch('http://localhost:8000/register', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userid,
                        rname,
                        email,
                        phn,
                        rpass,
                        address,
                        city,
                        rstate,
                        pin,
                        int1,
                        int2,
                        int3,
                        int4, 
                    })
                  })
                    .then((data) => data.json())
                    .then((res)=>{
                        console.log(res, "useRegistration")
                        if(res.status === "Ok"){
                            alert("Congrats!!! Registered Successfull")
                            window.location.href="/";
                        }
                    })
                 }


    return (
        <>
        <h1 className='Home-head'>Welcome to Crypto<span>Tracker</span></h1>
        <div className="ReglogContainer">
            <div className="RegLcontainer">
                <h1>Welcome!!</h1>
                <h2>By Registering <span className='purple'>to CrytoTracker you can explore some features of our website</span></h2>
            </div>
            <div className="RegRcontainer">
                <form onSubmit={handleRegister} className="register">
                    <h3>Register</h3>
                    <input type="text" name="userid" value={userid} placeholder="Your User id" onChange={handleUserid}/>
                    <input type="text" name="rname" value={rname} placeholder="Your Name" onChange={handleRname}/>
                    <input type="text" name="email" value={email} placeholder="Your Email" onChange={handleRemail}/>
                    <input type="tel" name="phn" value={phn} placeholder="Your Phone Number" onChange={handlePhn}/>
                    <input type="password" name="password" value={rpass} placeholder="Your Password" onChange={handleRpass} autoComplete="true"/>
                    <input type="text" name="address" value={address} placeholder="Your Addrees" onChange={handleAddress}/>
                    <input type="text" name="city" value={city} placeholder="Your City" onChange={handleCity}/>
                    <input type="text" name="state" value={rstate} placeholder="Your State" onChange={handleState}/>
                    <input type="tel" name="pin" value={pin} placeholder="Your PIN" onChange={handlePin}/>
                    <label> <span className='purple'>Mention CrytoCurrencies of your interest</span></label>
                    <br/>
                    <label className="black">Interest 1 : </label>
                    <select value={int1} className="opt" onChange={handleInt1}>
                        <option value="">Choose the Cryptocurrecy</option>
                        {
                            coinList.map((coin)=>(
                                <option value={coin.name}key={coin.id}>{coin.name}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <label className="black">Interest 2 : </label>
                    <select value={int2} className="opt" onChange={handleInt2}>
                        <option value="">Choose the Cryptocurrecy</option>
                        {
                            coinList.map((coin)=>(
                                <option value={coin.name}key={coin.id}>{coin.name}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <label className="black">Interest 3 : </label>
                    <select value={int3} className="opt" onChange={handleInt3}>
                        <option value="">Choose the Cryptocurrecy</option>
                        {
                            coinList.map((coin)=>(
                                <option value={coin.name}key={coin.id}>{coin.name}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <label className="black">Interest 4 : </label>
                    <select value={int4} className="opt" onChange={handleInt4}>
                        <option value="">Choose the Cryptocurrecy</option>
                        {
                            coinList.map((coin)=>(
                                <option value={coin.name}key={coin.id}>{coin.name}</option>
                            ))
                        }
                    </select>
                        <br/>
                    <button className="button" >Register</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register