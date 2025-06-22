import React, {useState, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard' 
import Transactions from './Components/Transactions/Transactions'
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses'
import { useGlobalContext } from './context/globalContext'
import axios from 'axios'

function App() {
    const [active, setActive] = useState(1)
    const [isAuth, setIsAuth] = useState(false);
    const global = useGlobalContext()

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

    const displayData = () => {
        switch(active) {
            case 1:
                return <Dashboard />
            case 2:
                return <Transactions />
            case 3:
                return <Income />
            case 4: 
                return <Expenses />
            default: 
                return <Dashboard />
        }
    }
    
    const orbMemo = useMemo(() => {
        return <Orb />
    }, [])
    
    console.log('isAuth', isAuth)
    if(isAuth){
        return (
            <AppStyled bg={bg} className="App">
                { orbMemo }
                <MainLayout> 
                    <Navigation active={active} setActive={setActive} />
                    <main>
                        {displayData()}
                    </main>
                </MainLayout>
            </AppStyled>
        )
    }
    return (
        <main>
            <h1>Please Login to continue</h1>
            <div style={{display:'flex',flexDirection:'row'}}>
                <p>Click on the Sign In button to proceed. </p>
                <a href='/login'>Click here</a>
            </div>
        </main>

    )
    
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
    
    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        
        &::-webkit-scrollbar {
            width: 0;
        }
    }
    `

export default App