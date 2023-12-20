import React, { useEffect, useState } from "react";

export default function Success(){
    const [name,setname]=useState('');
    const [email,setmail]=useState("");
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
            console.log(data,"userdata");
            setname(data.data.userid)
            setmail(data.data.email);
            setInt1(data.data.int1);
            setInt2(data.data.int2);
            setInt3(data.data.int3);
            setInt4(data.data.int4);
        })
    })
 
    return(
        <>
            <h1>Welcome {name}</h1>
            <div>
                your email: {email}
                <h3>Cryptocurrencies of your Interest</h3>
                Interest 1: {int1}
                Interest 2: {int2}
                Interest 3: {int3}
                Interest 4: {int4}
            </div>
        </>
    )
}