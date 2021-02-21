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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

`

const Navbar = styled.div`
    margin: auto auto;
    font-size: 1.2em;
    color: orange;
`


export const Header = ():JSX.Element=>{

    return(
    <HeaderContainer>
        <LogoContainer>
            <Link to='/'><Logo src={logo}/></Link>
        </LogoContainer>
        <NavbarContainer>
        <Navbar><Link to ="/">Home</Link></Navbar>
        <Navbar><Link to ="">About</Link></Navbar>
        <Navbar><Link to ="/worship">Worship</Link></Navbar>
        <Navbar><Link to ="/connect">Connect</Link></Navbar>
        <Navbar><Link to ="/contact">Contact</Link></Navbar>
        </NavbarContainer>
    </HeaderContainer>
    )
}