import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import {  signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from '../Button/Button'
const BASE_URL = 'http://127.0.0.1:4000';

function Navigation({active, setActive}) {
    const navigate = useNavigate()
    const handlelogout = async ()=>{
        try {
        const response = await axios.post(`/user/logout`,{}, { withCredentials: true }) //{}-->empty coz not sending any data
          if(response.data.success){
            navigate('/login');
          }
        } catch (error) {
          console.log(error);
        }
    }
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Saif</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                {/* <button className='btn' onClick={handlelogout}>
                    {signout} Sign Out
                </button> */}
                <Button 
                    onClick={handlelogout}
                    icon = {signout}
                    name={'Sign Out'}
                    bPad={'0.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        
        h2 {
            color: rgba(34, 34, 96, 1);
        }
        
        p {
            color: rgba(34, 34, 96, 0.6);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all 0.4s ease-in-out;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`

export default Navigation