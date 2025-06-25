import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// const BASE_URL = 'http://127.0.0.1:4000';
function Login() {
    const navigate = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword]=useState('');

    // check auth
    const [isAuth , setIsAuth] = useState(false)
    useEffect(()=>{
        axios.post('/user/isauth',{},{withCredentials:true})
        .then((res)=>
            // console.log(res)
            setIsAuth(res.data.authentication)
        )
        .catch((err)=>{
            console.log('Error in ',err);
            setIsAuth(false)});
    },[])

    const handlesubmit= async(e)=>{
      e.preventDefault();
      try {
        const response = await axios.post(`/user/login`,{
          email:email,
          password:password,
        },{withCredentials: true});
        console.log(response);
        if (response.data.success) {
            // Redirect the user to "/home"
            navigate('/');
        } else {
            console.log('Login failed:', response.data.message);
        }
      } catch (error) {
        console.log('This is the error',error);
      }
    }

    if(isAuth){
      navigate('/');
    }
  return  (
    <div className=''>
        <form className='form' onSubmit={handlesubmit}>
            <p className='title'>WELCOME BACK</p>
                <input placeholder='Email' className='input' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder='Password' className='input' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='btn' type='submit'>Sign In</button>
            <p>New Here? <a onClick={()=>navigate('/signup')}>Register</a></p>
        </form>
    </div>
  )
}

export default Login