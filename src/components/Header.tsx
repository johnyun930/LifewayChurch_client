import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
const HeaderContainer = styled.div`
    width: 100%;
    height: 12vh;
    display:grid;
    grid-template-columns: 1fr 1fr;
`;
const LogoContainer = styled.div`

`


const Logo = styled.img`
    padding: 1rem 1rem;
    width: 130px;
    height: 90px;
`

const NavbarContainer = styled.div`
    justify-self: center;
    vertical-align:middle;
    text-align:center;
    display: grid;
    column-gap: 20px;
    padding-bottom: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

`

const NavButton = styled.div`
    margin: auto auto;
    font-size: 1.2em;
    color: orange;
`
const LoginButton = styled.div`
     margin: auto auto;
     min-width: 96px;
     min-height: 30px;
     vertical-align:middle;
    font-size: 1.2em;
    color: white;
    line-height: 30px;
    background-color: #1a73e8;
    border: 1px solid transparent;
`


export const Header = ():JSX.Element=>{

    return(
    <HeaderContainer>
        <LogoContainer>
            <Link to='/'><Logo src={logo}/></Link>
        </LogoContainer>
        <NavbarContainer>
        <NavButton><Link to ="/">Home</Link></NavButton>
        <NavButton><Link to ="">About</Link></NavButton>
        <NavButton><Link to ="/worship">Worship</Link></NavButton>
        <NavButton><Link to ="/connect">Connect</Link></NavButton>
        <NavButton><Link to ="/contact">Contact</Link></NavButton>
        <LoginButton><Link to ="/login">Login</Link></LoginButton>
        </NavbarContainer>
    </HeaderContainer>
    )
}