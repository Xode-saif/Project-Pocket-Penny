import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const BASE_URL = 'http://localhost:4000';
function Signup() {
    const navigate = useNavigate()
    const [name,setName] =useState()
    const [email,setEmail] =useState()
    const [password,setPassword] =useState()

    const handleclick = async()=>{
        try {
            const response = await axios.post(`${BASE_URL}/user/signup`,{
                name:name,
                email:email,
                password:password,
            })
            if(response.data.success){
                navigate('/login')
            }else{
                console.log('Login failed',response.data.message);
            }
        } catch (error) {
            console.log('error in signup',error);
        }
    }
  return (

    <div className='parent-cont'>
        <div className='container first'>
            <form className='form'>
                <input className='input' placeholder='Name' type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
                <input className='input' placeholder='Email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input className='input' placeholder='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className='btn' type='submit' onClick={handleclick}>Sign Up</button>
                <div className='flex'>
                    <p>Already a user?</p>
                    <button onClick={()=>navigate('/login')} className='btn' type='submit'>Log in</button>
                </div>
            </form>
        </div>
        <div className='container second'>
            <img src="/doodle.png" alt="" />
        </div>
    </div>

  )
}

export default Signup