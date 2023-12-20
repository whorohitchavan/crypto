import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {


    const [name,setName]=useState("UserName");
    const [email,setEmail]=useState('UserEmail');

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
            setName(data.data.userid)
            setEmail(data.data.email);
        })
    })

    const handleout=()=>{
        alert("Logged out SuccessFully")
    }
    return (
        <>
            <div className='navbar'>
                
                <Link to='/home'><h1> Crypto <span className='purple'>Tracker</span></h1></Link>
                <nav>
                    <ul>      
                        <li><Link className='nav-item' to='/home'>Home</Link></li>
                        <li><Link className='Mob-nav-item' to='/home'><i className="fa-solid fa-house"></i></Link></li>
                        <li><Link className='nav-item' to='/wishlist'>Wishlist</Link></li>
                        <li><Link className='Mob-nav-item' to='/home'><i class="fa-solid fa-clipboard"></i></Link></li>
                        <li>
                        <i className="fa-solid fa-circle-user large"></i>
                            <div className="nav-item user-det">
                                <div className='drop-btn'>Hi... {name.toUpperCase()} </div>
                                <div><span className='secon'>{email}</span></div>
                            </div>
                        </li>
                        <li>
                            <Link className='log-out' onClick={handleout} to="/">Log Out</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default Navbar
